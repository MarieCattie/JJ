<template>
    <div>
      <h1>Edit Vacancy</h1>
  
      <form @submit.prevent="handleUpdate">
        <div>
          <label for="uuid">UUID:</label>
          <input type="text" id="uuid" v-model="vacancy.uuid" readonly />
        </div>
        <div>
          <label for="title">Title:</label>
          <input type="text" id="title" v-model="vacancy.title" />
        </div>
        <div>
          <label for="category_uuid">Category UUID:</label>
          <input type="text" id="category_uuid" v-model="vacancy.category_uuid" />
        </div>
        <div>
          <label for="time">Time:</label>
          <input type="text" id="time" v-model="vacancy.time" />
        </div>
        <div>
          <label for="place">Place:</label>
          <input type="text" id="place" v-model="vacancy.place" />
        </div>
        <div>
          <label for="description">Description:</label>
          <textarea id="description" v-model="vacancy.description"></textarea>
        </div>
        <div>
          <label for="required_experience">Required Experience:</label>
          <input type="checkbox" id="required_experience" v-model="vacancy.required_experience" />
        </div>
        <div>
          <label for="several_applicants">Several Applicants:</label>
          <input type="checkbox" id="several_applicants" v-model="vacancy.several_applicants" />
        </div>
        <button type="submit">Update</button>
      </form>
  
      <div v-if="loading">Updating...</div>
      <div v-if="error">{{ error }}</div>
  
      <div v-if="updatedVacancy">
        <h2>Updated Vacancy:</h2>
        <p>{{ updatedVacancy.title }} - {{ updatedVacancy.place }}</p>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref, onMounted } from 'vue';
  import { useVacanciesStore } from '~/stores/vacancies';
  import { Vacancy, UpdateVacancyData } from '~/api/vacancies';
  
  export default defineComponent({
    props: {
      uuid: {
        type: String,
        required: true
      }
    },
    setup(props) {
      const store = useVacanciesStore();
      const vacancy = ref<UpdateVacancyData>({
        uuid: props.uuid,
        title: '',
        category_uuid: '',
        time: '',
        place: '',
        description: '',
        required_experience: false,
        several_applicants: false
      });
      const loading = ref(false);
      const error = ref<string | null>(null);
      const updatedVacancy = ref<Vacancy | null>(null);
  
      onMounted(async () => {
        try {
          const vacancies = await store.fetchVacancies();
          const existingVacancy = vacancies.find(v => v.uuid === props.uuid);
          if (existingVacancy) {
            Object.assign(vacancy.value, {
              uuid: existingVacancy.uuid,
              title: existingVacancy.title,
              category_uuid: existingVacancy.category.uuid,
              time: existingVacancy.time,
              place: existingVacancy.place,
              description: existingVacancy.description,
              required_experience: existingVacancy.required_experience,
              several_applicants: existingVacancy.several_applicants
            });
          }
        } catch (err) {
          console.error('Error fetching vacancy details', err);
        }
      });
  
      const handleUpdate = async () => {
        loading.value = true;
        error.value = null;
        try {
          updatedVacancy.value = await store.updateVacancy(vacancy.value);
        } catch (err: any) {
          if (err.response && err.response.status === 401) {
            error.value = 'Unauthorized: You do not have permission to update this vacancy';
          } else {
            error.value = 'Failed to update vacancy';
          }
          console.error('Error updating vacancy', err);
        } finally {
          loading.value = false;
        }
      };
  
      return {
        vacancy,
        loading,
        error,
        updatedVacancy,
        handleUpdate
      };
    }
  });
  </script>
  