<template>
    <div>
      <h1>Vacancies</h1>
      
      <div v-if="loading">Loading...</div>
      <div v-if="error">{{ error }}</div>
  
      <ul v-if="!loading && !error">
        <li v-for="vacancy in vacancies" :key="vacancy.uuid">
          {{ vacancy.title }} - {{ vacancy.place }}
        </li>
      </ul>
  
      <form @submit.prevent="handleCreateVacancy">
        <h2>Create New Vacancy</h2>
        <div>
          <label for="title">Title:</label>
          <input type="text" id="title" v-model="newVacancy.title" required />
        </div>
        <div>
          <label for="category_uuid">Category UUID:</label>
          <input type="text" id="category_uuid" v-model="newVacancy.category_uuid" required />
        </div>
        <div>
          <label for="time">Time:</label>
          <input type="text" id="time" v-model="newVacancy.time" required />
        </div>
        <div>
          <label for="place">Place:</label>
          <input type="text" id="place" v-model="newVacancy.place" required />
        </div>
        <div>
          <label for="description">Description:</label>
          <textarea id="description" v-model="newVacancy.description" required></textarea>
        </div>
        <div>
          <label for="required_experience">Required Experience:</label>
          <input type="checkbox" id="required_experience" v-model="newVacancy.required_experience" />
        </div>
        <div>
          <label for="several_applicants">Several Applicants:</label>
          <input type="checkbox" id="several_applicants" v-model="newVacancy.several_applicants" />
        </div>
        <button type="submit">Create Vacancy</button>
      </form>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref, onMounted } from 'vue';
  import { useVacanciesStore } from '~/stores/vacancies';
  
  export default defineComponent({
    setup() {
      const store = useVacanciesStore();
      const newVacancy = ref({
        title: '',
        category_uuid: '',
        time: '',
        place: '',
        description: '',
        required_experience: false,
        several_applicants: false,
      });
  
      onMounted(async () => {
        await store.fetchVacancies();
      });
  
      const handleCreateVacancy = async () => {
        await store.createVacancy(newVacancy.value);
      };
  
      return {
        vacancies: store.vacancies,
        loading: store.loading,
        error: store.error,
        newVacancy,
        handleCreateVacancy
      };
    }
  });
  </script>
  
  <style scoped>
  /* Your styles here */
  </style>
  