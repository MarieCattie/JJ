<template>
  <div v-if="category">
    <h1 class="text-3xl font-bold text-[#000] mb-1 mt-6 sm:mb-1 sm:mt-5">{{ category.title }}</h1>
    <h2 class="text-xl font-medium text-[#3d337e] mb-5">Вакансии в категории:</h2>

    <div v-if="loading">
      <p>Загрузка вакансий...</p>
    </div>

    <div v-if="vacancies.length === 0 && !loading">
      <p>Вакансии не найдены</p>
    </div>

    <ul v-if="vacancies.length > 0 && !loading" class="space-y-4">
      <li v-for="vacancy in vacanciesByCategory" :key="vacancy.uuid" class="border border-gray-300 p-6 rounded-lg shadow-md w-full">
        <NuxtLink :to="`/vacancy/${vacancy.uuid}`">
          <h3 class="text-black text-lg font-bold mb-2">{{ vacancy.title }}</h3>
          <p class="text-gray-700 mb-1">Адрес: {{ vacancy.place }}</p>
          <p class="text-gray-700 mb-3">Время: {{ vacancy.time }}</p>
        </NuxtLink>
        <div class="flex space-x-4">
          <button
            v-if="!hasResponded[vacancy.uuid]"
            @click="openResponceModal(vacancy)"
            class="bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700"
          >
            Откликнуться
          </button>
          <button
            v-else
            @click="deleteResponse(vacancy.uuid)"
            class="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700"
          >
            Отменить отклик
          </button>
          <NuxtLink :to="`/user/${vacancy.employer.uuid}`" class="bg-purple-100 text-purple-600 py-2 px-4 rounded-lg hover:bg-purple-200">
            Профиль работодателя
          </NuxtLink>
        </div>
      </li>
    </ul>

    <!-- Модальное окно для отклика -->
    <ModalResponce
      :isVisible="isModalResponseVisible"
      :vacancy="selectedVacancy"
      @update:isVisible="isModalResponseVisible = $event"
      @sendMessage="handleSendResponse"
    />
    <ModalResponceSuccess
      :isVisible="isModalResponceSuccessVisible"
      @update:isVisible="isModalResponceSuccessVisible = $event"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useCategoriesStore } from '~/stores/categories';
import { useVacanciesStore } from '~/stores/vacancies';
import { useVacancyResponsesStore } from '~/stores/vacancy_responses';
import { useUserStore } from '~/stores/user';

const route = useRoute();
const uuid = route.params.uuid;

const categoriesStore = useCategoriesStore();
const vacanciesStore = useVacanciesStore();
const vacancyResponseStore = useVacancyResponsesStore();
const userStore = useUserStore();

const category = ref(null);
const vacanciesByCategory = ref([]);
const hasResponded = ref({});

const isModalResponseVisible = ref(false);
const isModalResponceSuccessVisible = ref(false);
const selectedVacancy = ref(null);

const openResponceModal = (vacancy) => {
  selectedVacancy.value = vacancy;
  isModalResponseVisible.value = true;
};

const handleSendResponse = async (data) => {
  let vacancyUuid = selectedVacancy.value.uuid;
  let message = data.message;

  try {
    await vacancyResponseStore.createVacancyResponse({
      uuid: vacancyUuid,
      message: message,
    });
    isModalResponceSuccessVisible.value = true;
    hasResponded.value[vacancyUuid] = true;
  } catch (error) {
    console.error('Ошибка при отклике на вакансию:', error);
    alert(error);
  } finally {
    isModalResponseVisible.value = false;
  }
};

const deleteResponse = async (uuid: string) => {
  try {
    const responses = await vacancyResponseStore.fetchResponsesByApplicant(userStore.currentUser.user_uuid);
    const responseToDelete = responses.find(r => r.vacancy.uuid === uuid);
    
    if (responseToDelete) {
      // Удалить отклик с сервера
      await vacancyResponseStore.deleteResponse(responseToDelete.uuid);
      
      // Удалить отклик из store
      vacancyResponseStore.applicantResponses = vacancyResponseStore.applicantResponses.filter(r => r.uuid !== responseToDelete.uuid);

      // Обновить локальную переменную responses
      const index = responses.findIndex(r => r.uuid === responseToDelete.uuid);
      if (index !== -1) {
        responses.splice(index, 1);  // Удаление из локального состояния
      }

      alert('Ваш отклик был отменен');
      hasResponded.value[responseToDelete.vacancy.uuid] = false;  // Обновить состояние
    }
  } catch (error) {
    console.error('Ошибка при отмене отклика:', error);
    alert('Произошла ошибка при отмене отклика');
  }
};

onMounted(async () => {
  await categoriesStore.fetchCategories();
  category.value = categoriesStore.categories.find(cat => cat.uuid === uuid);

  if (category.value) {
    vacanciesByCategory.value = await vacanciesStore.fetchVacanciesByCategory(category.value.uuid);

    if (userStore.currentUser?.uuid) {
      const responses = await vacancyResponseStore.fetchResponsesByApplicant(userStore.currentUser.user_uuid);
      responses.forEach(response => {
        hasResponded.value[response.vacancy.uuid] = true;
      });
    }
  }
});

const vacancies = vacanciesStore.vacancies;
const loading = vacanciesStore.loading;
</script>
