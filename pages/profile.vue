<template>
    <div class="flex flex-col lg:flex-row gap-4 px-4 lg:px-16 py-8 my-10">
      <!-- Левая колонка (40% ширины) -->
      <div class="w-full lg:w-2/5 p-8 flex flex-col items-center shadow-md rounded-lg bg-white">
        <v-avatar size="112" class="border border-primary">
          <img :src="storage?.showUserImage(userStore?.currentUser?.image)" alt="User Avatar">
        </v-avatar>
        <div class="mt-4 text-center">
          <h2 class="text-2xl font-bold text-gray-900">Имя Пользователя</h2>
          <p class="text-gray-500 text-sm">Роль пользователя</p>
        </div>
        
        <div class="mt-8 w-full">
          <h3 class="text-lg font-semibold mb-4 text-gray-700">Контакты</h3>
          <p class="text-gray-800"><strong>Email:</strong> user@example.com</p>
          <p class="text-gray-800"><strong>Город:</strong> Москва</p>
        </div>
  
        <div class="mt-8 w-full">
          <h3 class="text-lg font-semibold mb-4 text-gray-700">Навыки</h3>
          <div class="flex flex-wrap gap-2">
            <v-chip class="bg-gray-200 text-gray-700">Программирование</v-chip>
            <v-chip class="bg-gray-200 text-gray-700">Писательство</v-chip>
            <v-chip class="bg-gray-200 text-gray-700">Рисование</v-chip>
          </div>
        </div>
    </div>
  
      <!-- Правая колонка (60% ширины) -->
      <div class="w-full lg:w-3/5 p-8 shadow-md rounded-lg bg-white pt-0">
        <!-- Вкладки -->
        <div class="border-b border-gray-200 dark:border-gray-700">
          <ul class="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400">
            <li class="me-2">
              <a href="#" @click="setActiveTab('profile')" :class="activeTab === 'profile' ? activeTabClass : defaultTabClass" class="group">
                <svg class="w-4 h-4 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z"/>
                </svg>Profile
              </a>
            </li>
            <li class="me-2">
              <a href="#" @click="setActiveTab('dashboard')" :class="activeTab === 'dashboard' ? activeTabClass : defaultTabClass" class="group">
                <svg class="w-4 h-4 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 18">
                  <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z"/>
                </svg>Dashboard
              </a>
            </li>
            <li class="me-2">
              <a href="#" @click="setActiveTab('settings')" :class="activeTab === 'settings' ? activeTabClass : defaultTabClass" class="group">
                <svg class="w-4 h-4 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M5 11.424V1a1 1 0 1 0-2 0v10.424a3.228 3.228 0 0 0 0 6.152V19a1 1 0 1 0 2 0v-1.424a3.228 3.228 0 0 0 0-6.152ZM19.25 14.5A3.243 3.243 0 0 0 17 11.424V1a1 1 0 0 0-2 0v10.424a3.227 3.227 0 0 0 0 6.152V19a1 1 0 1 0 2 0v-1.424a3.243 3.243 0 0 0 2.25-3.076Zm-6-9A3.243 3.243 0 0 0 11 2.424V1a1 1 0 0 0-2 0v1.424a3.228 3.228 0 0 0 0 6.152V19a1 1 0 1 0 2 0V8.576A3.243 3.243 0 0 0 13.25 5.5Z"/>
                </svg>Settings
              </a>
            </li>
          </ul>
        </div>
  
        <!-- Контент вкладок -->
        <div class="p-4 text-gray-800">
          <div v-if="activeTab === 'profile'">
            <p>Текст-рыба для основной информации пользователя. Здесь может находиться биография, дополнительная информация о навыках, работе и т.д.</p>
            {{ userStore.currentUser }}
          </div>
          <div v-if="activeTab === 'dashboard'">
            <p>Текст-рыба для дашборда пользователя.</p>
          </div>
          <div v-if="activeTab === 'settings'">
            <p>Текст-рыба для настроек пользователя. Здесь может находиться информация об изменении пароля, предпочтениях уведомлений и прочем.</p>
          </div>
        </div>
    </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useUserStore } from '~/stores/user';
  import useStorage from '~/composables/useStorage';

  const storage = useStorage();

  const activeTab = ref('profile');

  const userStore = useUserStore();
  
  // Классы для активных и неактивных вкладок
  const activeTabClass = 'inline-flex items-center justify-center p-4 text-secondary border-b-2 border-secondary rounded-t-lg active dark:text-secondary dark:border-secondary group';
  const defaultTabClass = 'inline-flex items-center justify-center p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 group';
  
  const setActiveTab = (tab) => {
    activeTab.value = tab;
  };
  </script>
  
  <style scoped>
  .me-2 {
    margin-right: 0.5rem;
  }
  </style>
  