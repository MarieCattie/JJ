<template>
    <div>
      <form @submit.prevent="handleSubmit">
        <input v-model="formData.title" placeholder="Title" required />
        <input v-model="formData.category_uuid" placeholder="Category UUID" required />
        <input v-model="formData.time" placeholder="Time" required />
        <input v-model="formData.place" placeholder="Place" required />
        <textarea v-model="formData.description" placeholder="Description" required></textarea>
        <input type="checkbox" v-model="formData.required_experience" /> Required Experience
        <input type="checkbox" v-model="formData.several_applicants" /> Several Applicants
        <input type="file" @change="handleFileUpload" />
        <button type="submit">Submit</button>
      </form>
      <button @click="handleBan(vacancyUuid)">Ban Vacancy</button>
      <button @click="handleDelete(vacancyUuid)">Delete Vacancy</button>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useVacanciesStore } from '~/stores/vacancies';
  
  const vacanciesStore = useVacanciesStore();
  const formData = ref({
    title: '',
    category_uuid: '',
    time: '',
    place: '',
    description: '',
    required_experience: false,
    several_applicants: false,
  });
  const image = ref<File | null>(null);
  const vacancyUuid = ref(''); // set this to the uuid of the vacancy to be banned or deleted
  
  function handleFileUpload(event) {
    const files = event.target.files;
    if (files && files.length > 0) {
      image.value = files[0];
    }
  }
  
  async function handleSubmit() {
    try {
      await vacanciesStore.createVacancy(formData.value, image.value);
    } catch (err) {
      console.error('Error submitting form', err);
    }
  }
  
  async function handleBan(uuid) {
    try {
      await vacanciesStore.banVacancy(uuid);
    } catch (err) {
      console.error('Error banning vacancy', err);
    }
  }
  
  async function handleDelete(uuid) {
    try {
      await vacanciesStore.deleteVacancy(uuid);
    } catch (err) {
      console.error('Error deleting vacancy', err);
    }
  }
  </script>
  