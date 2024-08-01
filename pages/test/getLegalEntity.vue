<template>
    <div>
      <input v-model="uuid" placeholder="Enter legal entity UUID" />
      <button @click="handleGetLegalEntity">Get Legal Entity</button>
      <div v-if="loading">Loading...</div>
      <div v-if="error">{{ error }}</div>
      <div v-if="legalEntity">
        <h2>Legal Entity Details</h2>
        <p>UUID: {{ legalEntity.uuid }}</p>
        <p>User UUID: {{ legalEntity.user_uuid }}</p>
        <p>Title: {{ legalEntity.title }}</p>
        <p>INN: {{ legalEntity.inn }}</p>
        <p>Contact Info: {{ legalEntity.contact_info }}</p>
        <p>Summary: {{ legalEntity.summary }}</p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useRoleStore } from '~/store/roles';
  
  const uuid = ref('');
  const legalEntity = ref(null);
  const { getLegalEntityByUuid, loading, error } = useRoleStore();
  
  async function handleGetLegalEntity() {
    if (uuid.value) {
      legalEntity.value = await getLegalEntityByUuid(uuid.value);
    }
  }
  </script>
  