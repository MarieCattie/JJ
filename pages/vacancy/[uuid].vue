<template>
    <div class="container mx-auto p-4">
      <v-card v-if="vacancy" class="mb-6">
        <v-img :src="`/storage/vacancies/${vacancy.image}`" height="400px" alt="vacancy image" />
        <v-card-title class="text-2xl font-bold">{{ vacancy.title }}</v-card-title>
        <v-card-subtitle class="text-gray-600 mb-4">
          {{ vacancy.place }} | {{ vacancy.time }}
        </v-card-subtitle>
        <v-card-text>
          <p class="mb-4 text-lg">{{ vacancy.description }}</p>
          <div class="text-sm text-gray-500">Требуемый опыт: {{ vacancy.required_experience ? 'Да' : 'Нет' }}</div>
          <div class="text-sm text-gray-500">Вакансия для нескольких соискателей: {{ vacancy.several_applicants ? 'Да' : 'Нет' }}</div>
          <div class="text-sm text-gray-500">Дата создания: {{ formatDate(vacancy.created_at) }}</div>
          <div v-if="vacancy.isClosedForResponse" class="text-red-500 text-lg mt-4">Отклики на вакансию закрыты</div>
        </v-card-text>
      </v-card>
  
      <div v-if="hasResponded">
        <p class="text-primary font-bold">Вы уже откликнулись на вакансию</p>
        <v-btn color="error" @click="deleteResponse">Отменить отклик</v-btn>
      </div>
      
      <div v-else>
        <v-btn color="primary" @click="applyToVacancy">Откликнуться на вакансию</v-btn>
      </div>
    </div>
  </template>
  
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  import { useVacanciesStore } from '~/stores/vacancies';
  import { useVacancyResponsesStore } from '~/stores/vacancy_responses';
  import { useUserStore } from '~/stores/user';
  
  const route = useRoute();
  const vacanciesStore = useVacanciesStore();
  const vacancyResponseStore = useVacancyResponsesStore();
  const userStore = useUserStore();
  const vacancy = ref(null);
  const hasResponded = ref(false);
  
  const fetchVacancy = async () => {
    const uuid = route.params.uuid as string;
    try {
      vacancy.value = await vacanciesStore.getVacancyById(uuid);
      if (userStore.currentUser?.uuid) {
        const applicantResponses = await vacancyResponseStore.getResponsesByApplicant(userStore.currentUser.uuid);
        hasResponded.value = applicantResponses.some(response => response.vacancy.uuid === uuid);
      }
    } catch (error) {
      console.error('Ошибка при получении вакансии:', error);
    }
  };
  
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('ru-RU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };
  
  const applyToVacancy = async () => {
    if (!vacancy.value) return;
  
    try {
      await vacancyResponseStore.createVacancyResponse({
        uuid: vacancy.value.uuid,
        message: 'Ваше сообщение к вакансии',
      });
      alert('Вы успешно откликнулись на вакансию');
      hasResponded.value = true;
    } catch (error) {
      console.error('Ошибка при отклике на вакансию:', error);
      alert('Произошла ошибка при отклике на вакансию');
    }
  };
  
  const deleteResponse = async () => {
    if (!vacancy.value) return;
  
    try {
      const response = await vacancyResponseStore.getResponsesByApplicant(userStore.currentUser.uuid);
      const responseToDelete = response.find(r => r.vacancy.uuid === vacancy.value.uuid);
      if (responseToDelete) {
        await vacancyResponseStore.deleteResponse(responseToDelete.uuid);
        alert('Ваш отклик был отменен');
        hasResponded.value = false;
      }
    } catch (error) {
      console.error('Ошибка при отмене отклика:', error);
      alert('Произошла ошибка при отмене отклика');
    }
  };
  
  onMounted(fetchVacancy);
  </script>
  
  
  <style scoped>
  .container {
    max-width: 800px;
  }
  </style>
  