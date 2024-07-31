<template>
    <div>
      <input v-model="uuid" placeholder="Enter applicant UUID" />
      <button @click="handleGetApplicant">Get Applicant</button>
      <div v-if="loading">Loading...</div>
      <div v-if="error">{{ error }}</div>
      <div v-if="applicant">
        <h2>Applicant Details</h2>
        <p>UUID: {{ applicant.uuid }}</p>
        <p>User UUID: {{ applicant.user_uuid }}</p>
        <p>Name: {{ applicant.name }}</p>
        <p>Surname: {{ applicant.surname }}</p>
        <p>Birthday: {{ applicant.birthday }}</p>
        <p>Study Place: {{ applicant.study_place }}</p>
        <p>INN: {{ applicant.inn }}</p>
        <p>Competencies: {{ applicant.competencies }}</p>
        <p>Summary: {{ applicant.summary }}</p>
        <p>Created At: {{ applicant.created_at }}</p>
        <p>Updated At: {{ applicant.updated_at }}</p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useRoleStore } from '~/stores/roles';
  
  const roleStore = useRoleStore();
  const { getApplicantByUuid, loading, error } = roleStore;
  const uuid = ref('');
  const applicant = ref(null);
  
  const handleGetApplicant = async () => {
    applicant.value = await getApplicantByUuid(uuid.value);
  };
  </script>
  