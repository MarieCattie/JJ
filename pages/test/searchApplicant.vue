<template>
    <div>
      <input v-model="query" placeholder="Enter full name" />
      <button @click="handleSearch">Search Applicant</button>
      <div v-if="loading">Loading...</div>
      <div v-if="error">{{ error }}</div>
      <div v-if="searchResults.length">
        <h2>Search Results</h2>
        <ul>
          <li v-for="result in searchResults" :key="result.uuid">
            <p>UUID: {{ result.uuid }}</p>
            <p v-if="result.applicant">Applicant: {{ result.applicant.name }} {{ result.applicant.surname }}</p>
            <p v-if="result.individual">Individual: {{ result.individual.name }} {{ result.individual.surname }}</p>
            <p v-if="result.legal_entity">Legal Entity: {{ result.legal_entity.title }}</p>
            <p v-if="result.moderator">Moderator: {{ result.moderator.name }} {{ result.moderator.surname }}</p>
            <p>Current Role: {{ result.current }}</p>
          </li>
        </ul>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useRoleStore } from '~/stores/roles';
  
  const roleStore = useRoleStore();
  const { searchApplicantByFullName, loading, error } = roleStore;
  const query = ref('');
  const searchResults = ref([]);
  
  const handleSearch = async () => {
    const results = await searchApplicantByFullName(query.value);
    searchResults.value = results;
  };
  </script>
  