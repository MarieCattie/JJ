<template>
    <div>
      <input v-model="uuid" placeholder="Enter individual UUID" />
      <button @click="handleGetIndividual">Get Individual</button>
      <div v-if="loading">Loading...</div>
      <div v-if="error">{{ error }}</div>
      <div v-if="individual">
        <h2>Individual Details</h2>
        <p>UUID: {{ individual.uuid }}</p>
        <p>User UUID: {{ individual.user_uuid }}</p>
        <p>Name: {{ individual.name }}</p>
        <p>Surname: {{ individual.surname }}</p>
        <p>Patronymic: {{ individual.patronymic }}</p>
        <p>Summary: {{ individual.summary }}</p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useRoleStore } from '~/stores/roles';
  
  const roleStore = useRoleStore();
  const { getIndividualByUuid, loading, error } = roleStore;
  const uuid = ref('');
  const individual = ref(null);
  
  const handleGetIndividual = async () => {
    individual.value = await getIndividualByUuid(uuid.value);
  };
  </script>
  