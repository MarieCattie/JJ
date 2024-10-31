<template>
    <div class="pb-2 relative">
      <label :for="id" class="block text-sm font-medium leading-6 text-gray-900">
        {{ label }}
      </label>
      <div class="mt-2 relative">
        <select
          v-model="selectedValue"
          :id="id"
          :name="name"
          :required="required"
          class="block outline-none w-full appearance-none rounded-xl border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#604D9E] sm:text-sm sm:leading-6 pl-3 pr-10"
        >
          <option value="" disabled hidden>
            {{ placeholder }}
          </option>
          <option
            v-for="option in options"
            :key="option.uuid"
            :value="option.uuid"
          >
            {{ option.title }}
          </option>
        </select>
        <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
          <!-- SVG иконка стрелки -->
          <svg class="h-4 w-4 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fill-rule="evenodd" d="M10 14a1 1 0 01-.7-.3l-4-4a1 1 0 111.4-1.4L10 11.58l3.3-3.29a1 1 0 011.4 1.42l-4 4A1 1 0 0110 14z" clip-rule="evenodd" />
          </svg>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, watch, onMounted } from 'vue';
  
  // Тип данных для параметра options
  interface Option {
    uuid: string;
    title: string;
  }
  
  // Props
  interface Props {
    id: string;
    name: string;
    label: string;
    required?: boolean;
    options: Option[];
    placeholder?: string;
    modelValue: string | null;
  }
  
  const props = defineProps<Props>();
  const emit = defineEmits(['update:modelValue']);
  
  const selectedValue = ref(props.modelValue || "");
  
  // Устанавливаем значение по умолчанию при монтировании компонента
  onMounted(() => {
    if (!props.modelValue && props.placeholder) {
      emit('update:modelValue', "");
    }
  });
  
  // Обновляем значение в родительском компоненте при изменении выбранного значения
  watch(selectedValue, (newValue) => {
    emit('update:modelValue', newValue);
  });

  watch(
  () => props.modelValue,
  (newValue) => {
    selectedValue.value = newValue;
  }
);
  </script>
  
  <style scoped>
  /* Дополнительные стили можно добавить здесь */
  </style>
  