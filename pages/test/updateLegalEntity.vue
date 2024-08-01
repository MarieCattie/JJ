<template>
    <div>
      <input v-model="uuid" placeholder="Enter UUID" />
      <input v-model="title" placeholder="Enter Title" />
      <input v-model="inn" placeholder="Enter INN" />
      <input v-model="contactInfo" placeholder="Enter Contact Info" />
      <textarea v-model="summary" placeholder="Enter Summary"></textarea>
      <button @click="handleUpdateLegalEntity">Update Legal Entity</button>
      <div v-if="updatedLegalEntity">
        <h3>Updated Legal Entity</h3>
        <p>{{ updatedLegalEntity }}</p>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  import { useRoleStore } from '~/store/roles';
  
  const uuid = ref('');
  const title = ref('');
  const inn = ref('');
  const contactInfo = ref('');
  const summary = ref('');
  const updatedLegalEntity = ref(null);
  const { updateLegalEntityByUuid, loading, error } = useRoleStore();
  
  async function handleUpdateLegalEntity() {
    if (uuid.value && title.value && inn.value && contactInfo.value && summary.value) {
      const payload = {
        title: title.value,
        inn: inn.value,
        contact_info: contactInfo.value,
        summary: summary.value
      };
      updatedLegalEntity.value = await updateLegalEntityByUuid(uuid.value, payload);
    }
  }
  </script>
  