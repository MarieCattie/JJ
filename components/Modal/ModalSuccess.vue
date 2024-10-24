<template>
    <div v-if="isVisible" class="fixed inset-0 z-50 flex items-center justify-center bg-[#00000030] overflow-hidden">
      <div class="relative bg-white rounded-lg shadow-lg p-6 w-full max-w-sm">
        <!-- Крестик для закрытия в правом верхнем углу -->
        <button @click="closeModal" class="absolute top-3 right-3 text-gray-400 hover:text-gray-600">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
  
        <!-- Иконка успеха по центру -->
        <div class="flex justify-center mb-4">
         
          
          <CheckCircleIcon class="h-10 w-10 text-green"
                    aria-hidden="true" />
        </div>
  
        <!-- Текст сообщения -->
        <h4 class="font-bold text-black text-center text-lg mb-4">{{ message }}</h4>
  
        <!-- Кнопка Закрыть внизу по центру -->
        <div class="flex justify-center">
          <button @click="closeModal" class="bg-primary hover:bg-primary-dark text-white font-semibold py-2 px-4 rounded-lg">
            Закрыть
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { defineProps, defineEmits } from 'vue';
  import { CheckCircleIcon } from '@heroicons/vue/24/outline'
  
  const props = defineProps({
    isVisible: Boolean,
    message: String,
  });
  
  const emit = defineEmits(['update:isVisible']);
  
  const closeModal = () => {
    emit('update:isVisible', false);
  };
  </script>
  