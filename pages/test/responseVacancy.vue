<template>
    <div>
      <form @submit.prevent="submitResponse">
        <input v-model="message" type="text" placeholder="Ваше сообщение" required />
        <button type="submit" :disabled="loading">Отправить отклик</button>
      </form>
      <p v-if="error" class="error">{{ error }}</p>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { useVacancyResponsesStore } from '@/store/vacancy_responses';
  import { useUserStore } from '@/store/user';
  
  export default defineComponent({
    setup() {
      const message = ref('');
      const vacancyResponsesStore = useVacancyResponsesStore();
      const userStore = useUserStore();
      const vacancyUuid = 'uuid-вакансии'; // Получите это значение из параметров или состояния компонента
  
      const submitResponse = async () => {
        try {
          await vacancyResponsesStore.createVacancyResponse({
            uuid: vacancyUuid,
            message: message.value
          });
          message.value = '';
          alert('Отклик успешно отправлен');
        } catch (error) {
          alert('Ошибка при отправке отклика: ' + error.message);
        }
      };
  
      return {
        message,
        submitResponse,
        loading: vacancyResponsesStore.loading,
        error: vacancyResponsesStore.error
      };
    },
    mounted() {
      const userStore = useUserStore();
      userStore.fetchCurrentUser();
    }
  });
  </script>
  
  <style scoped>
  .error {
    color: red;
  }
  </style>
  