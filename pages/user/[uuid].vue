<template>
    <div class="container mx-auto p-6">
      <!-- Аватар и имя пользователя -->
      <div class="flex items-center space-x-4 mb-6">
        <img
          :src="`${storage.showUserImage(getUser?.image)}`"
          alt="Аватар пользователя"
          class="w-24 h-24 object-cover rounded-full border-purple-300 border-4 border-solid"
        />
        <div>
          <h1 class="text-3xl font-bold text-gray-900">{{ getUser?.title }}</h1>
          <p class="text-sm text-gray-500">{{ getUser?.city.title }}</p>
        </div>
      </div>
  
      <!-- Краткое описание -->
      <div class="mb-6">
        <h2 class="text-xl font-semibold text-gray-800">О компании</h2>
        <p class="text-gray-700">{{ getUser?.summary }}</p>
      </div>
  
      <!-- Контактные данные -->
      <div class="mb-6">
        <h2 class="text-xl font-semibold text-gray-800">Контактная информация</h2>
        <p class="text-gray-700">
          Email: <a href="mailto:{{ getUser.email }}" class="text-blue-500 hover:underline">{{ getUser?.email }}</a>
        </p>
        <p class="text-gray-700">
          Контакты для связи: <a href="https://{{ getUser.contact_info }}" target="_blank" class="text-blue-500 hover:underline">{{ getUser?.contact_info }}</a>
        </p>
      </div>
  
      <!-- Дополнительные данные -->
      <div class="mb-6">
        <h2 class="text-xl font-semibold text-gray-800">Информация о статусе</h2>
        <p class="text-gray-700">ИНН: {{ getUser?.inn }}</p>
      </div>
    </div>
  </template>
  

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useUserStore } from '~/stores/user';
import useStorage from '~/composables/useStorage';
const route = useRoute();
const userStore = useUserStore();
const getUser = ref(null);
const storage = useStorage();

onMounted(async () => {
  getUser.value = await userStore.getUserById(route.params.uuid);
});
</script>


<style lang="scss" scoped>

</style>