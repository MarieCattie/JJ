<template>
  <div>
    <h1>Поиск вакансий</h1>

    <form @submit.prevent="handleSearch">
      <div>
        <label for="query">Запрос:</label>
        <input type="text" id="query" v-model="searchParams.query" />
      </div>
      <button type="submit">Поиск</button>
    </form>

    <div v-if="localLoading">Загрузка...</div>
    <div v-if="localError">{{ localError }}</div>

    <ul >
      <li v-for="vacancy in vacancies" :key="vacancy.uuid">
        {{ vacancy.title }} - {{ vacancy.place }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useVacanciesStore } from '~/stores/vacancies';

// Используем хранилище вакансий
const store = useVacanciesStore();

// Реактивные параметры поиска
const searchParams = ref({
  query: '',
  page: 0,
  row: 30,
});

// Локальные реактивные свойства для loading и error
const localLoading = ref(false);
const localError = ref<string | null>(null);

// Watchers для обновления локальных свойств при изменении значений в store
watch(() => store.loading, (newLoading) => {
  localLoading.value = newLoading;
});

watch(() => store.error, (newError) => {
  localError.value = newError;
});

// Функция для обработки поиска
const handleSearch = async () => {
  await store.searchVacancies(searchParams.value);
};

// Вычисляемое свойство для получения списка вакансий из хранилища
const vacancies = ref([]);
watch(() => store.searchVacanciesArr, (vacancy) => {
  vacancies.value = vacancy;
});
</script>

<style scoped>
/* Ваши стили здесь */
</style>
