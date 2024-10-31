<template>
    <div class="vacancy-card bg-white rounded-lg shadow-md p-4 hover:shadow-purple-300 transition-shadow duration-300 cursor-pointer">
      <div class="flex items-center gap-3">
        <!-- Изображение вакансии -->
        <img
          v-if="vacancy?.image"
          :src="storage.showVacancyImage(vacancy?.image)"
          alt="Vacancy Image"
          class="w-20 h-20 rounded-full object-cover my-2"
        />
        <!-- Заголовок вакансии -->
        <h2 class="text-xl font-semibold text-black">{{ vacancy?.title }}</h2>
      </div>
  
      <!-- Дата создания вакансии -->
      <p class="text-gray-500 mb-2">Создано: {{ formatter.formatDate(vacancy?.created_at) }}</p>
  
      <!-- Количество откликнувшихся соискателей -->
      <p class="text-gray-700 mb-4">Откликнувшихся соискателей: {{ applicantCount }}</p>
  
      <!-- Кнопки "Редактировать" и "Удалить" -->
      <div class="flex space-x-4">
        <NuxtLink :to="`/vacancies/edit/${props.vacancy.uuid}`" class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600" @click="editVacancy">
          Редактировать
        </NuxtLink>
        <button class="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600" @click="showModal = true">
          Удалить
        </button>
        <VacancyDeleteModal v-if="showModal" @confirm="deleteVacancy" @cancel="showModal = false" />
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  import { useVacancyResponsesStore } from '~/stores/vacancy_responses';
  import useStorage from '~/composables/useStorage';
  import useFormatter from '~/composables/useFormatter';
import VacancyDeleteModal from '../Modal/VacancyDeleteModal.vue';
  
  const showModal = ref(false);
  const vacanciesStore = useVacanciesStore();
  const router = useRouter();
  const storage = useStorage();
  const formatter = useFormatter();
  const props = defineProps<{
    vacancy: {
      title: string;
      uuid: string;
      image: string | null;
      created_at: string;
    };
  }>();
  
  // Получение количества соискателей для вакансии
  const vacancyResponsesStore = useVacancyResponsesStore();
  const applicantCount = ref(0);
  
  const fetchApplicantCount = async () => {
    const responsesByVacancy = await vacancyResponsesStore.getResponsesByVacancy(props.vacancy?.uuid);
    applicantCount.value = responsesByVacancy.length;
  };
  
  onMounted(() => {
    fetchApplicantCount();
  });
  
  // Действия для редактирования и удаления вакансии
  const editVacancy = () => {
    console.log('Редактировать вакансию', props.vacancy?.uuid);
    // Здесь может быть логика для открытия формы редактирования вакансии
  };
  
  const deleteVacancy = async () => {
  await vacanciesStore.deleteVacancy(props.vacancy.uuid);
  showModal.value = true;
  router.push('/profile');
};
  </script>
  
  <style scoped>
  .vacancy-card {
    &:hover {
      box-shadow: 0 0 4px 1px rgba(170, 159, 239, 0.3);
    }
  }
  </style>
  