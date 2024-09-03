<script setup lang="ts">
import { ref, computed, defineEmits, onMounted } from 'vue';

const props = defineProps({
  options: {
    type: Array as () => Array<{ uuid: string; title: string }>,
    required: true
  },
  modelValue: {
    type: Array as () => Array<string>,
    default: () => []
  },
  label: {
    type: String,
    default: 'Выберите опции'
  },
});

const emit = defineEmits(['update:modelValue']);
const selectedItems = ref([...props.modelValue]);
const isOpen = ref(false);

const toggleOption = (option: { uuid: string; title: string }) => {
  const index = selectedItems.value.findIndex(item => item === option.title);
  if (index !== -1) {
    selectedItems.value.splice(index, 1);
  } else {
    selectedItems.value.push(option.title);
  }
  emit('update:modelValue', [...selectedItems.value]);
};

const removeTag = (title: string) => {
  selectedItems.value = selectedItems.value.filter(item => item !== title);
  emit('update:modelValue', [...selectedItems.value]);
};

const isSelected = (option: { uuid: string; title: string }) => {
  return selectedItems.value.includes(option.title);
};

const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};



onMounted(() => {
// Закрывать выпадающий список при клике вне компонента
document.addEventListener('click', (event) => {
  const targetElement = event.target as HTMLElement;
  const isInside = targetElement.closest('.custom-multi-select');
  if (!isInside) {
    isOpen.value = false;
  }
});
})

const selectedOptions = computed(() => {
  return props.options.filter(option => selectedItems.value.includes(option.title));
});
</script>

<template>
  <div class="relative pb-3">
    <p class="block text-sm font-medium leading-6 text-gray-900">{{ label }}</p>
    <div @click.prevent.stop="toggleDropdown" class="field field--multi-select custom-multi-select-top relative flex items-center justify-between cursor-pointer block outline-none w-full appearance-none rounded-xl border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#604D9E] sm:text-sm sm:leading-6 px-3">
      <p class="block text-sm font-regular leading-6 text-gray-400">Нажмите, чтобы выбрать</p>
      <svg class="h-4 w-4 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
        <path fill-rule="evenodd" d="M10 14a1 1 0 01-.7-.3l-4-4a1 1 0 111.4-1.4L10 11.58l3.3-3.29a1 1 0 011.4 1.42l-4 4A1 1 0 0110 14z" clip-rule="evenodd" />
      </svg>
    </div>

    <div v-if="isOpen" class="custom-multi-select absolute w-full">
      <div class="select-container bg-white shadow-lg border border-gray-200 rounded-lg p-2">
        <div
          class="options__item p-2 hover:bg-gray-100 rounded-lg cursor-pointer"
          v-for="option in options"
          :key="option.uuid"
          @click="toggleOption(option)"
          :class="{ 'selected': isSelected(option) }"
        >
          {{ option.title }}
        </div>
      </div>
    </div>

    <div class="selected-tags mt-2">
      <div
        v-for="option in selectedOptions"
        :key="option.uuid"
        class="tag bg-purple-600 text-white rounded-full px-3 py-1 m-1 flex items-center"
      >
        {{ option.title }}
        <span @click="removeTag(option.title)" class="tag-remove cursor-pointer ml-2">×</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.custom-multi-select-top {
  z-index: 100;
  margin-bottom: 8px;
}

.custom-multi-select {
  width: 100%;
  z-index: 99;

  .select-container {
    position: relative;
    z-index: 100;
    border-radius: 15px;
  }

  .options__item {
    padding: 8px 10px;
    transition: background-color 0.3s;
  }

  .selected {
    font-weight: bold;
    color: #604D9E;
  }

  .tag-remove:hover {
    color: #ff0000;
  }
}

.selected-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
}

.tag {
  background-color: #604D9E;
  color: #ffffff;
  padding: 4px 8px;
  border-radius: 15px;
  display: flex;
  align-items: center;

  .tag-remove {
    margin-left: 4px;
    cursor: pointer;
  }
}
</style>
