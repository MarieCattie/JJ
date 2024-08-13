<template>
  <div>
    <!-- Поле поиска и кнопка -->
    <div class="mt-6 flex max-w-full gap-x-4">
      <label for="main-search" class="sr-only">Найти вакансию</label>
      <input 
        v-model="searchQuery" 
        id="main-search" 
        name="search" 
        type="text" 
        required
        class="min-w-0 flex-auto rounded-md bg-white/5 px-3.5 py-2 text-black shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6 outline-none border-solid border border-slate-300"
        placeholder="Вакансия, должность">
      <button 
        @click="handleSearch" 
        :disabled="searchQuery === ''" 
        class="flex-none rounded-md px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm" 
        :class="searchQuery === '' ? 'bg-[#cccccc]' : 'bg-[#AAA2D8] hover:bg-indigo-400'">
        Найти
      </button>
    </div>

    <h2 class="text-3xl mt-4">Вакансии</h2>
    <!-- Карточки вакансий -->
    <div v-if="vacancies.length" class="vacancies-list mt-4">
      <div v-for="vacancy in vacancies" :key="vacancy.uuid" class="vacancy-card">
        
        <img v-if="vacancy.image !== 'image.png'" :src="`/storage/vacancies/${vacancy.image}`" alt="vacancy image" class="vacancy-image" />
        <h3 class="vacancy-title">{{ vacancy.title }}</h3>

        <p class="vacancy-place">Место работы: {{ vacancy.place }}</p>
        <p class="vacancy-time">График: {{ vacancy.time }}</p>
       
        <!-- Дополнительная информация -->
        <div v-if="useAuthStore().isApplicant" class="pa-4 text-center">
          <v-btn-group
          >
            <v-btn
              class="pe-2"
              
            >
              <div class="btn btn-primary">
                Откликнуться
              </div>
      
              <v-dialog activator="parent" max-width="500">
                <template v-slot:default="{ isActive }">
                  <v-card rounded="lg">
                    <v-card-title class="d-flex justify-space-between align-center">
                      <div class="text-h5 text-medium-emphasis ps-2">
                        Откликнуться
                      </div>
      
                      <v-btn
                        icon="mdi-close"
                        variant="text"
                        @click="isActive.value = false"
                      ></v-btn>
                    </v-card-title>
      
                    <v-divider class="mb-4"></v-divider>
      
                    <v-card-text>
                      <div class="text-medium-emphasis mb-4">
                        Расскажите о ваших навыках и качествах, что вы умеете
                      </div>
      
                      <div class="mb-2">Сообщение:</div>
      
                      <v-textarea
                        :counter="300"
                        class="mb-2"
                        rows="2"
                        variant="outlined"
                        persistent-counter
                        required
                        v-model="vacancyText"
                      ></v-textarea>
      
                      <div class="d-none text-medium-emphasis mb-1">
                        Share with unlimited people and get more insights about your network. Try Premium Free for 30 days.
                      </div>
      
                      <v-btn
                        class="d-none text-none font-weight-bold ms-n4"
                        color="primary"
                        text="Retry Premium Free"
                        variant="text"
                      ></v-btn>
                    </v-card-text>
      
                    <v-divider class="mt-2"></v-divider>
      
                    <v-card-actions class="my-2 d-flex justify-end">
                      <v-btn
                        class="text-none"
                        rounded="xl"
                        text="Отмена"
                        @click="isActive.value = false; vacancyText.value = '';"
                      ></v-btn>
      
                      <v-btn
                        class="text-none"
                        color="primary"
                        rounded="xl"
                        text="Отправить"
                        variant="flat"
                        @click="isActive.value = false;applyToVacancy(vacancyText, vacancy.uuid)"
                      ></v-btn>
                    </v-card-actions>
                  </v-card>
                </template>
              </v-dialog>
            </v-btn>
      
          </v-btn-group>
        </div>
      </div>

      
    </div>

    <!-- Сообщение при отсутствии вакансий -->
    <div v-else class="no-vacancies">
      <p>По вашему запросу ничего не найдено.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useVacanciesStore } from '~/stores/vacancies';
import { useUserStore } from '~/stores/user';
import { useAuthStore } from '~/stores/auth';
import { useRoute, useRouter } from 'vue-router';
import { useApi } from "~/composables/api";
import { useVacancyResponsesStore } from '~/stores/vacancy_responses';

const store = useVacanciesStore();
const userStore = useUserStore();
const authStore = useUserStore();
const vacancyResponseStore = useVacancyResponsesStore();
const route = useRoute();
const router = useRouter();
const api = useApi();
const vacancyText = ref('');

const isApplicant = authStore?.isApplicant;

const vacancies = ref(store.searchVacanciesArr || []);
const searchQuery = ref(route.query.query || '');

watch(() => route.query.query, async (newQuery) => {
  if (newQuery) {
    searchQuery.value = newQuery;
    await store.searchVacancies({ query: newQuery, page: 0, row: 30 });
    vacancies.value = store.searchVacanciesArr;
  }
});

const handleSearch = async () => {
  if (route.query.query) {
    await router.push({ path: '/search', query: { query: searchQuery.value } });
  }
};

const applyToVacancy = async (text, uuid) => {
  alert(text)
  alert(uuid)
  await vacancyResponseStore.createVacancyResponse({uuid: uuid, message: text});
  await vacancyResponseStore.getResponsesByApplicant(userStore.currentUser.uuid)
}
</script>

<style scoped>
.vacancies-list {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.vacancy-card {
  border: 1px solid #ccc;
  padding: 15px;
  border-radius: 10px;
  width: 100%;
  max-width: 300px;
  background-color: #fff;
}

.vacancy-image {
  width: 100%;
  height: auto;
  border-radius: 8px;
}

.vacancy-title {
  font-size: 1.5rem;
  font-weight: bold;
  margin: 10px 0;
}

.vacancy-description, .vacancy-place, .vacancy-time {
  font-size: 1rem;
  margin: 5px 0;
}

.no-vacancies {
  margin-top: 20px;
  font-size: 1.2rem;
  color: #666;
}
</style>
