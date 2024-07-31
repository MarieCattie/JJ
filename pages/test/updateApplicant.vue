<template>
    <div>
      <input v-model="uuid" placeholder="Enter applicant UUID" />
      <input v-model="name" placeholder="Enter name" />
      <input v-model="surname" placeholder="Enter surname" />
      <input v-model="birthday" type="date" placeholder="Enter birthday" />
      <input v-model="studyPlace" placeholder="Enter study place" />
      <input v-model="inn" placeholder="Enter INN" />
      <input v-model="competencies" placeholder="Enter competencies" />
      <textarea v-model="summary" placeholder="Enter summary"></textarea>
      <button @click="handleUpdateApplicant">Update Applicant</button>
      <div v-if="loading">Loading...</div>
      <div v-if="error">{{ error }}</div>
      <div v-if="updatedApplicant">
        <h2>Updated Applicant Details</h2>
        <p>UUID: {{ updatedApplicant.uuid }}</p>
        <p>User UUID: {{ updatedApplicant.user_uuid }}</p>
        <p>Name: {{ updatedApplicant.name }}</p>
        <p>Surname: {{ updatedApplicant.surname }}</p>
        <p>Birthday: {{ updatedApplicant.birthday }}</p>
        <p>Study Place: {{ updatedApplicant.study_place }}</p>
        <p>INN: {{ updatedApplicant.inn }}</p>
        <p>Competencies: {{ updatedApplicant.competencies }}</p>
        <p>Summary: {{ updatedApplicant.summary }}</p>
        <p>Created At: {{ updatedApplicant.created_at }}</p>
        <p>Updated At: {{ updatedApplicant.updated_at }}</p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useRoleStore } from '~/stores/roles';
  
  const roleStore = useRoleStore();
  const { updateApplicantByUuid, loading, error } = roleStore;
  const uuid = ref('');
  const name = ref('');
  const surname = ref('');
  const birthday = ref('');
  const studyPlace = ref('');
  const inn = ref('');
  const competencies = ref('');
  const summary = ref('');
  const updatedApplicant = ref(null);
  
  const handleUpdateApplicant = async () => {
    const payload = {
      name: name.value,
      surname: surname.value,
      birthday: birthday.value,
      study_place: studyPlace.value,
      inn: inn.value,
      competencies_titles: competencies.value.split(','),
      summary: summary.value,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
  
    updatedApplicant.value = await updateApplicantByUuid(uuid.value, payload);
  };
  </script>
  