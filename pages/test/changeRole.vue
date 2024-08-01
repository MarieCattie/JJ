<script setup>
import { ref } from 'vue';
import { useRoleStore } from '@/store/roles';

const roleStore = useRoleStore();
const newRole = ref('applicant'); // Пример новой роли

const changeRole = async () => {
  try {
    const response = await roleStore.changeUserRole({ role: newRole.value });
    console.log('Role changed successfully', response);
  } catch (error) {
    console.error('Error changing role', error);
  }
};
</script>

<template>
  <button @click="changeRole">Change Role</button>
</template>
