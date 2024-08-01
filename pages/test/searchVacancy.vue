<template>
    <div>
      <h1>Search Vacancies</h1>
  
      <form @submit.prevent="handleSearch">
        <div>
          <label for="query">Query:</label>
          <input type="text" id="query" v-model="searchParams.query" />
        </div>
        <div>
          <label for="page">Page:</label>
          <input type="number" id="page" v-model="searchParams.page" />
        </div>
        <div>
          <label for="row">Row:</label>
          <input type="number" id="row" v-model="searchParams.row" />
        </div>
        <div>
          <label for="byDate">By Date:</label>
          <input type="date" id="byDate" v-model="searchParams.byDate" />
        </div>
        <div>
          <label for="sortByUpdatedAt">Sort By Updated At:</label>
          <input type="text" id="sortByUpdatedAt" v-model="searchParams.sortByUpdatedAt" />
        </div>
        <div>
          <label for="sortByCreatedAt">Sort By Created At:</label>
          <input type="text" id="sortByCreatedAt" v-model="searchParams.sortByCreatedAt" />
        </div>
        <button type="submit">Search</button>
      </form>
  
      <div v-if="loading">Loading...</div>
      <div v-if="error">{{ error }}</div>
  
      <ul v-if="!loading && !error">
        <li v-for="vacancy in vacancies" :key="vacancy.uuid">
          {{ vacancy.title }} - {{ vacancy.place }}
        </li>
      </ul>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { useVacanciesStore } from '~/stores/vacancies';
  
  export default defineComponent({
    setup() {
      const store = useVacanciesStore();
      const searchParams = ref({
        query: '',
        page: 0,
        row: 30,
        byDate: '',
        sortByUpdatedAt: '',
        sortByCreatedAt: ''
      });
  
      const handleSearch = async () => {
        await store.searchVacancies(searchParams.value);
      };
  
      return {
        vacancies: store.vacancies,
        loading: store.loading,
        error: store.error,
        searchParams,
        handleSearch
      };
    }
  });
  </script>
  
  <style scoped>
  /* Your styles here */
  </style>
  