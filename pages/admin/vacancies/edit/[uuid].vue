<template>
    <div class="p-5">
      <h1 class="text-2xl font-bold mb-5">Редактировать вакансию</h1>
  
      <form @submit.prevent="submitForm">
        <!-- Поле заголовка вакансии -->
        <div class="mb-4">
          <label class="block mb-2 text-sm font-medium">Название вакансии</label>
          <input
            v-model="vacancyData.title"
            type="text"
            class="p-2 border border-gray-300 rounded-md w-full"
            required
          />
        </div>
  
        <!-- Поле описания вакансии -->
        <div class="mb-4">
          <label class="block mb-2 text-sm font-medium">Описание</label>
          <textarea
            v-model="vacancyData.description"
            class="p-2 border border-gray-300 rounded-md w-full"
            rows="5"
            required
          ></textarea>
        </div>
  
        <!-- Поле для загрузки изображения вакансии -->
        <div class="mb-4">
          <label class="block mb-2 text-sm font-medium">Изображение</label>
          <input type="file" @change="onImageChange" />
          <img v-if="vacancyData.imageUrl" :src="vacancyData.imageUrl" class="mt-3 w-64 h-40 object-cover" />
        </div>
  
        <!-- Поле для выбора места и времени -->
        <div class="mb-4">
          <label class="block mb-2 text-sm font-medium">Место</label>
          <input
            v-model="vacancyData.place"
            type="text"
            class="p-2 border border-gray-300 rounded-md w-full"
          />
        </div>
  
        <div class="mb-4">
          <label class="block mb-2 text-sm font-medium">Время</label>
          <input
            v-model="vacancyData.time"
            type="text"
            class="p-2 border border-gray-300 rounded-md w-full"
          />
        </div>
  
        <!-- Поле для выбора опций опыта и количества заявок -->
        <div class="mb-4">
          <label class="block mb-2 text-sm font-medium">Требуемый опыт</label>
          <select v-model="vacancyData.required_experience" class="p-2 border border-gray-300 rounded-md w-full">
            <option :value="true">Да</option>
            <option :value="false">Нет</option>
          </select>
        </div>
  
        <div class="mb-4">
          <label class="block mb-2 text-sm font-medium">Несколько заявок</label>
          <select v-model="vacancyData.several_applicants" class="p-2 border border-gray-300 rounded-md w-full">
            <option :value="true">Да</option>
            <option :value="false">Нет</option>
          </select>
        </div>
  
        <!-- Кнопка отправки формы -->
        <div class="flex justify-end">
          <button type="submit" class="px-4 py-2 bg-blue-500 text-white rounded">Сохранить изменения</button>
        </div>
      </form>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import { useVacanciesStore } from '~/stores/vacancies';
  import useStorage from '~/composables/useStorage';

  const storage = useStorage();
  const router = useRouter();
  const route = useRoute();
  const vacanciesStore = useVacanciesStore();
  
  const vacancyData = ref({
    uuid: '',
    title: '',
    description: '',
    place: '',
    time: '',
    required_experience: false,
    several_applicants: false,
    imageUrl: ''
  });
  
  const imageFile = ref<File | null>(null);
  
  // Функция для загрузки данных вакансии при монтировании страницы
  onMounted(async () => {
    const { uuid } = route.params;
    if (uuid) {
      const vacancy = await vacanciesStore.getVacancyById(uuid);
      if (vacancy) {
        vacancyData.value = {
          uuid: vacancy.uuid,
          title: vacancy.title,
          description: vacancy.description,
          place: vacancy.place,
          time: vacancy.time,
          required_experience: vacancy.required_experience,
          several_applicants: vacancy.several_applicants,
          imageUrl: storage.showVacancyImage(vacancy.image), // Отображение существующего изображения
          category: vacancy.category
        };
      }
    }
  });
  
  // Обработка загрузки нового изображения
  const onImageChange = (event: Event) => {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      imageFile.value = file;
      vacancyData.value.imageUrl = URL.createObjectURL(file); // Отображение превью изображения
    }
  };
  
  // Функция для сохранения изменений вакансии
  const submitForm = async () => {
    const updatedData = {
      uuid: vacancyData.value.uuid,
      title: vacancyData.value.title,
      description: vacancyData.value.description,
      place: vacancyData.value.place,
      time: vacancyData.value.time,
      required_experience: vacancyData.value.required_experience,
      several_applicants: vacancyData.value.several_applicants,
      category_uuid: vacancyData.value.category.uuid
    };
  
    await vacanciesStore.updateVacancy(updatedData, imageFile.value);
    router.push('/admin/vacancies');
  };
  </script>
  