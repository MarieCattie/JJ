<template>
    <div class="pb-2">
      <label :for="id" class="block text-sm font-medium leading-6 text-gray-900">
        {{ label }}
      </label>
      <div>
        <input
          v-model="inputValue"
          :id="id"
          :name="name"
          :type="inputType"
          :required="required"
          :autocomplete="autocomplete"
          :placeholder="placeholder"
          class="block outline-none w-full rounded-xl border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#604D9E] sm:text-sm sm:leading-6 px-3"
          @input="onInput"
        />
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, computed, watch } from 'vue';
  
  // Props
  interface Props {
    id: string;
    name: string;
    label: string;
    type: string;
    required?: boolean;
    autocomplete?: string;
    placeholder?: string;
    modelValue: string | number;
  }

  const emit = defineEmits(['update:modelValue']);
  
  const props = defineProps<Props>();
  
  const inputValue = ref(props.modelValue);
  
  // Dynamic input type based on prop type
  const inputType = computed(() => (props.type === 'phone' ? 'tel' : props.type));
  
  // Phone mask logic
  const onInput = (event: Event) => {
    if (props.type === 'phone') {
      let value = (event.target as HTMLInputElement).value;
      value = value
        .replace(/\D/g, '')
        .replace(/^(\d{1})(\d{3})(\d{3})(\d{2})(\d{2})$/, '+$1 ($2) $3-$4-$5');
      inputValue.value = value;
    } else {
      inputValue.value = (event.target as HTMLInputElement).value;
    }
  
    // Emit the update to the parent component
    emit('update:modelValue', inputValue.value);
  };
  
  // Emit when inputValue changes
  watch(inputValue, (newValue) => {
    emit('update:modelValue', newValue);
  });
  </script>
  
  <style scoped>
  /* Здесь можно добавить дополнительные стили для поля ввода, если необходимо */
  </style>
  