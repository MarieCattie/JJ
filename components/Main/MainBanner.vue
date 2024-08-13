<template>
  <div class="relative isolate px-6 pt-14 lg:px-8">
      <div class="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          aria-hidden="true">
          <div class="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
              style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)" />
      </div>
      <div class="mx-auto max-w-6xl py-32 sm:py-30 lg:py-20">
          <div class="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
              <!-- Основной контент -->
              <div class="col-span-6">
                  <div class="text-left md:text-left">
                      <h1 class="text-5xl font-bold tracking-tight text-gray-900 sm:text-5xl">Хотите работать, но не знаете, куда устроиться?</h1>
                      <h2 class="text-4xl mt-6 font-semibold tracking-tight text-[#7152D7] sm:text-4xl">Мы поможем!</h2>
                      <p class="d-none mt-6 text-lg leading-8 text-gray-600">Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat fugiat aliqua.</p>

                      <!-- Форма поиска -->
                      <form @submit.prevent="handleSubmit" class="mt-6 flex max-w-full gap-x-4">
                          <label for="main-search" class="sr-only">Найти вакансию</label>
                          <input @input="formError = null" v-model="searchParams.query" id="main-search" name="search" type="text" class="min-w-0 flex-auto rounded-md bg-white/5 px-3.5 py-2 text-black shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6 outline-none border-solid border border-slate-300" placeholder="Вакансия, должность">
                          <button type="submit" class="flex-none rounded-md px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm bg-[#AAA2D8] hover:bg-indigo-400">Найти</button>
                      </form>

                      <!-- Сообщение об ошибке -->
                      <p v-if="formError" class="mt-2 text-sm text-red-600">{{ formError }}</p>

                      <div class="mt-5 flex justify-start gap-x-6">
                          <a href="#" class="text-sm font-semibold leading-6 text-[#755EFF]">Я ищу сотрудника<span aria-hidden="true">→</span></a>
                      </div>
                  </div>
              </div>
              <!-- Картинка -->
              <div class="col-span-6">
                  <div class="main-banner-picture">
                      <img src="@/assets/images/main-banner-picture.png" alt="Main Banner Picture" />
                  </div>
              </div>
          </div>
      </div>
      <div class="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
          aria-hidden="true">
          <div class="absolute top-[30px] left-[0px] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
              style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)" />
      </div>
      <div class="absolute top-0 right-0 -z-10 transform-gpu blur-3xl sm:top-0" aria-hidden="true">
          <div class="absolute top-0 right-0 aspect-[1155/678] w-[36.125rem] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:w-[72.1875rem]"
              style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)" />
      </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useVacanciesStore } from '~/stores/vacancies';
import { useRouter } from 'vue-router';

const store = useVacanciesStore();
const vacancies = ref([]);
const router = useRouter();

const localLoading = ref(false);
const localError = ref<string | null>(null);
const formError = ref<string | null>(null);

watch(() => store.loading, (newLoading) => {
localLoading.value = newLoading;
});

watch(() => store.error, (newError) => {
localError.value = newError;
});

watch(() => store.searchVacanciesArr, (vacancy) => {
vacancies.value = vacancy;
});

const searchParams = ref({
query: '',
page: 0,
row: 30,
});

const handleSubmit = async () => {
formError.value = null;

if (searchParams.value.query.trim() === '') {
  formError.value = 'Заполните поле';
  return;
}

await store.searchVacancies(searchParams.value);
router.push({
  path: '/search',
  query: {
    query: searchParams.value.query,
  }
});
};
</script>

<style scoped></style>
