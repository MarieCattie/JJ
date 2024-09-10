<template>
    <div v-if="isVisible" class="fixed inset-0 z-50 flex items-center justify-center overflow-hidden" style="background-color: rgba(0, 0, 0, 0.5);">
      <div class="relative bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <!-- Кнопка закрытия -->
        <button @click="closeModal" class="absolute top-3 right-3 text-gray-400 hover:text-gray-600">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        <!-- Заголовок -->
        <h3 class="text-xl font-bold text-center mb-4">Сообщение отправлено</h3>
        
        <!-- Текст под заголовком -->
        <p class="text-center text-gray-700">Вы можете <NuxtLink :to="`/chat?uuid=${companion}`" class="text-primary text-bold font-weight-bold">перейти в чат</NuxtLink>.</p>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  const props = defineProps({
    isVisible: Boolean,
    companion: String
  });
  
  const emit = defineEmits(['update:isVisible']);
  
  const closeModal = () => {
    emit('update:isVisible', false);
  };
  </script>
  