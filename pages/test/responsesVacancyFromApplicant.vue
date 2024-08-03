<template>
    <div>
      <h1>Отклики соискателя</h1>
      <div v-if="loading">Загрузка...</div>
      <ul v-else>
        <li v-for="response in vacancyResponses" :key="response.uuid">
          {{ response.message }}
        </li>
      </ul>
      <p v-if="error" class="error">{{ error }}</p>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, onMounted } from 'vue';
  import { useVacancyResponsesStore } from '@/store/vacancy_responses';
  import { useUserStore } from '@/store/user';
  
  export default defineComponent({
    setup() {
      const vacancyResponsesStore = useVacancyResponsesStore();
      const userStore = useUserStore();
  
      onMounted(() => {
        if (userStore.currentUser && userStore.currentUser.role.applicant) {
          vacancyResponsesStore.getResponsesByApplicant(userStore.currentUser.uuid);
        }
      });
  
      return {
        vacancyResponses: vacancyResponsesStore.vacancyResponses,
        loading: vacancyResponsesStore.loading,
        error: vacancyResponsesStore.error
      };
    }
  });
  </script>
  
  <style scoped>
  .error {
    color: red;
  }
  </style>
  