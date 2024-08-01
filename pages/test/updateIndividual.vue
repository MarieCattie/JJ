<template>
    <div>
      <input v-model="uuid" placeholder="Enter individual UUID" />
      <input v-model="name" placeholder="Enter name" />
      <input v-model="surname" placeholder="Enter surname" />
      <input v-model="patronymic" placeholder="Enter patronymic" />
      <textarea v-model="summary" placeholder="Enter summary"></textarea>
      <button @click="handleUpdateIndividual">Update Individual</button>
      <div v-if="loading">Loading...</div>
      <div v-if="error">{{ error }}</div>
      <div v-if="individual">
        <h2>Updated Individual Details</h2>
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
  const { updateIndividualByUuid, loading, error } = roleStore;
  const uuid = ref('');
  const name = ref('');
  const surname = ref('');
  const patronymic = ref('');
  const summary = ref('');
  const individual = ref(null);
  
  const handleUpdateIndividual = async () => {
    const payload = {
      name: name.value,
      surname: surname.value,
      patronymic: patronymic.value,
      summary: summary.value,
    };
    individual.value = await updateIndividualByUuid(uuid.value, payload);
  };
  </script>
  