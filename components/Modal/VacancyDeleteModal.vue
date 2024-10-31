<template>
    <div v-if="show" class="fixed inset-0 flex items-center justify-center" style="background-color: rgba(0, 0, 0, 0.5);z-index:10000;">
      <div class="bg-white rounded-lg shadow-lg p-8 w-80 text-center">
        <h2 class="text-lg font-semibold mb-4">Вы точно хотите удалить вакансию?</h2>
        <div class="flex justify-around">
          <button @click="confirm" class="bg-red-600 text-white px-4 py-2 rounded-lg">Да</button>
          <button @click="cancel" class="bg-gray-300 px-4 py-2 rounded-lg">Нет</button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { defineEmits, ref } from 'vue';
  import { defineProps } from 'vue';
  const show = ref(true);
  const emit = defineEmits(['confirm', 'cancel']);
  
  const confirm = () => {
    emit('confirm');
    show.value = false;
  };
  
  const cancel = () => {
    emit('cancel');
    show.value = false;
  };
  
  const props = defineProps({
  show: Boolean
});
  </script>
  
  <style scoped>
  /* Можете добавить дополнительные стили для модального окна */
  </style>
  