<template>
    <div class="switcher">
      <input 
        type="radio" 
        class="switcher__radio" 
        :name="name" 
        :id="`${name}1`" 
        :value="firstValue" 
        v-model="selectedValue"
        @change="update" 
      />
      <label :for="`${name}1`" class="switcher__item">
        <p>{{ firstLabel }}</p>
      </label>
  
      <input 
        type="radio" 
        class="switcher__radio" 
        :name="name" 
        :id="`${name}2`" 
        :value="secondValue" 
        v-model="selectedValue"
        @change="update" 
      />
      <label :for="`${name}2`" class="switcher__item">
        <p>{{ secondLabel }}</p>
      </label>
  
      <div class="switcher__toggle"></div>
    </div>
  </template>
  
  <script setup>
  import { ref, defineProps, defineEmits, watch } from 'vue';
  
  const props = defineProps({
    name: {
      type: String,
      required: true
    },
    firstValue: {
      type: String,
      required: true
    },
    secondValue: {
      type: String,
      required: true
    },
    firstLabel: {
      type: String,
      required: true
    },
    secondLabel: {
      type: String,
      required: true
    },
    modelValue: {
      type: String,
      default: ''
    }
  });
  
  const selectedValue = ref(props.modelValue || props.firstValue);
  
  const emit = defineEmits(['update:modelValue']);
  
  const update = () => {
    emit('update:modelValue', selectedValue.value);
  };
  
  watch(() => props.modelValue, (newValue) => {
    selectedValue.value = newValue;
  });
  </script>
  
  <style lang="scss" scoped>
  .switcher {
    position: relative;
    width: 311px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #AAA2D8;
    border-radius: 18px;
  
    &__item {
      z-index: 5;
      position: relative;
      flex: 1 0 auto;
      padding: 12px;
      color: aliceblue;
      display: flex;
      justify-content: center;
      align-items: center;
      user-select: none;
      cursor: pointer;
    }
  
    &__toggle {
      position: absolute;
      width: calc(50% - 4px);
      height: calc(100% - 8px);
      background-color: #fff;
      margin-left: 4px;
      margin-right: 4px;
      border-radius: 15px;
      transition: 0.5s;
    }
  
    &__radio {
      position: absolute;
      width: 1px;
      height: 1px;
      appearance: none;
      opacity: 0;
  
      &:checked + label.switcher__item {
        color: #AAA2D8;
      }
  
      &:checked + label.switcher__item + .switcher__toggle {
        transform: translateX(100%);
      }
    }
  }
  </style>
  