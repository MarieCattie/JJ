<template>
    <div v-if="category">
      <h1 class="text-3xl font-bold text-[#3d337e] mb-10 mt-6">{{ category.title }}</h1>
      <h2 class="text-xl font-medium text-[#3d337e] mb-5">Вакансии в категории:</h2>
  
      <div v-if="loading">
        <p>Загрузка вакансий...</p>
      </div>
  
      <div v-if="vacancies.length === 0 && !loading">
        <p>Вакансии не найдены</p>
      </div>
  
      <ul v-if="vacancies.length > 0 && !loading" class="space-y-4">
        <li v-for="vacancy in vacanciesByCategory" :key="vacancy.uuid" class="border border-gray-300 p-6 rounded-lg shadow-md w-full">
        <NuxtLink :to="`/vacancy/${vacancy.uuid}`" >
          <h3 class="text-black text-lg font-bold mb-2">{{ vacancy.title }}</h3>
          <p class="text-gray-700 mb-1">Адрес: {{ vacancy.place }}</p>
          <p class="text-gray-700 mb-3">Время: {{ vacancy.time }}</p>
          <div class="flex space-x-4">
            <button class="bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700">
              Откликнуться
            </button>
            <NuxtLink :to="`/user/${vacancy.employer.uuid}`" class="bg-purple-100 text-purple-600 py-2 px-4 rounded-lg hover:bg-purple-200">
              Профиль работодателя
            </NuxtLink>
          </div>
        </NuxtLink></li>
      </ul>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  import { useCategoriesStore } from '~/stores/categories';
  import { useVacanciesStore } from '~/stores/vacancies';
  
  // Получаем параметры маршрута
  const route = useRoute();
  const uuid = route.params.uuid;
  
  // Stores для категорий и вакансий
  const categoriesStore = useCategoriesStore();
  const vacanciesStore = useVacanciesStore();
  
  // Найдем категорию по uuid
  const category = ref(null);

  const vacanciesByCategory = ref(null);
  
  onMounted(async () => {
    // Загружаем категории
    await categoriesStore.fetchCategories();
    
    // Найдем нужную категорию по uuid
    category.value = categoriesStore.categories.find(cat => cat.uuid === uuid);
    
    if (category.value) {
      // Загружаем вакансии по категории
      vacanciesByCategory.value = await vacanciesStore.fetchVacanciesByCategory(category.value.uuid);
    }
  });
  
  // Получаем вакансии для категории
  const vacancies = vacanciesStore.vacancies;
  const loading = vacanciesStore.loading;
  </script>
  