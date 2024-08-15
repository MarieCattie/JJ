<template>
    <div class="latest-vacancies">
      <div 
        v-for="vacancy in latestVacancies" 
        :key="vacancy.uuid" 
        class="vacancy-card"
      >
        <h3 class="vacancy-title">{{ vacancy.title }}</h3>
        <p class="vacancy-category">Категория: {{ vacancy.category.title }}</p>
        <p class="vacancy-time">Время: {{ vacancy.time }}</p>
        <p class="vacancy-place">Место: {{ vacancy.place }}</p>
        <p class="vacancy-date">Вакансия создана: {{ formatter.formatDate(vacancy.created_at) }}</p>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { onMounted, computed } from 'vue';
  import { useVacanciesStore } from '~/stores/vacancies';
  import useFormatter from '~/composables/useFormatter';
  
  const vacanciesStore = useVacanciesStore();
  const formatter = useFormatter();
  
  // Загрузка вакансий при монтировании компонента
  onMounted(() => {
    vacanciesStore.fetchVacancies();
  });
  
  // Компьютед для получения и сортировки самых новых вакансий
  const latestVacancies = computed(() => {
    return vacanciesStore.vacancies
      .slice()
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
      .slice(0, 6);
  });
  </script>
  
  <style lang="scss" scoped>
  .latest-vacancies {
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
  }
  
  .vacancy-card {
    width: calc(33.333% - 16px);
    padding: 20px;
    border: 1px solid #e6e0ff;
    border-radius: 10px;
    box-shadow: 0 4px 20px rgba(96, 77, 158, 0.08);
    background: #fff;
    transition: 0.3s;
    @media screen and (max-width: 960px) {
        width: 100%;
      }
  }
  
  .vacancy-card:hover {
    cursor: pointer;
    box-shadow: 0 4px 20px rgba(57, 5, 134, 0.286);
    .vacancy-title {
        color: #6a41f3;
    }
  }
  
  .vacancy-title {
    font-size: 18px;
    margin-bottom: 8px;
  }
  
  .vacancy-category,
  .vacancy-time,
  .vacancy-place,
  .vacancy-date {
    font-size: 14px;
    color: #666;
    margin-bottom: 4px;
  }
  </style>
  