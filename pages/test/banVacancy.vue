<template>
    <div>
      <h1>Ban Vacancy</h1>
  
      <form @submit.prevent="handleBan">
        <div>
          <label for="uuid">Vacancy UUID:</label>
          <input type="text" id="uuid" v-model="uuid" />
        </div>
        <button type="submit">Ban Vacancy</button>
      </form>

      <form @submit.prevent="handleUnBan">
        <div>
          <label for="uuid">Vacancy UUID:</label>
          <input type="text" id="uuid" v-model="uuid" />
        </div>
        <button type="submit">Ban Vacancy</button>
      </form>
  
      <div v-if="loading">Banning...</div>
      <div v-if="error">{{ error }}</div>
  
      <div v-if="bannedVacancy">
        <h2>Banned Vacancy:</h2>
        <p>{{ bannedVacancy.title }} - {{ bannedVacancy.place }}</p>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { useVacanciesStore } from '~/stores/vacancies';
  import { BanVacancyData, Vacancy } from '~/api/vacancies';
  
  export default defineComponent({
    setup() {
      const store = useVacanciesStore();
      const uuid = ref<string>('');
      const loading = ref(false);
      const error = ref<string | null>(null);
      const bannedVacancy = ref<Vacancy | null>(null);
  
      const handleBan = async () => {
        loading.value = true;
        error.value = null;
        try {
          const banData: BanVacancyData = { uuid: uuid.value };
          bannedVacancy.value = await store.banVacancy(banData);
        } catch (err: any) {
          if (err.response && err.response.status === 401) {
            error.value = 'Unauthorized: You do not have permission to ban this vacancy';
          } else {
            error.value = 'Failed to ban vacancy';
          }
          console.error('Error banning vacancy', err);
        } finally {
          loading.value = false;
        }
      };

      const handleUnBan = async () => {
        loading.value = true;
        error.value = null;
        try {
          const banData: BanVacancyData = { uuid: uuid.value };
          bannedVacancy.value = await store.unbanVacancy(banData);
        } catch (err: any) {
          if (err.response && err.response.status === 401) {
            error.value = 'Unauthorized: You do not have permission to ban this vacancy';
          } else {
            error.value = 'Failed to ban vacancy';
          }
          console.error('Error banning vacancy', err);
        } finally {
          loading.value = false;
        }
      };
  
      return {
        uuid,
        loading,
        error,
        bannedVacancy,
        handleBan
      };
    }
  });
  </script>
  