<template>
    <div class="pb-2">
      <label :for="id" class="block text-sm font-medium leading-6 text-gray-900">
        {{ label }}
      </label>
      <div>
        <textarea
          v-model="inputValue"
          :id="id"
          :name="name"
          :required="required"
          :autocomplete="autocomplete"
          :placeholder="placeholder"
          class="block outline-none w-full rounded-lg border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#604D9E] sm:text-sm sm:leading-6 px-3 resize-y"
          :rows="rows"
          :maxlength="maxlength"
        ></textarea>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, watch } from 'vue';
  
  // Props
  interface Props {
    id: string;
    name: string;
    label: string;
    required?: boolean;
    autocomplete?: string;
    placeholder?: string;
    modelValue: string;
    rows?: number;
    maxlength?: number;
  }
  
  const props = defineProps<Props>();
  const emit = defineEmits(['update:modelValue']);
  
  const inputValue = ref(props.modelValue);
  
  // Emit the updated value to parent
  watch(inputValue, (newValue) => {
    emit('update:modelValue', newValue);
  });
  </script>
  
  <style scoped>
  textarea {
    /* Высота и ограничение на изменение размера */
    min-height: 100px; /* Минимальная высота */
    max-height: 300px; /* Максимальная высота */
    resize: vertical; /* Разрешить изменение высоты, но запретить изменение ширины */
  }
  </style>
  