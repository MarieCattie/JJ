<template>
    <div>
      <v-icon aria-label="My Account" role="img" aria-hidden="false">
        work
      </v-icon>
      <v-icon aria-label="My Account" role="img" aria-hidden="false">
        mdiWork
      </v-icon>
      <img :src="work" alt="">
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  import work from '@/assets/images/icons/work.svg';
  
  const drawer = ref(false)
  const router = useRouter()
  
  const goToSignUp = () => router.push('/signup')
  const goToSignIn = () => router.push('/signin')
  </script>
  
  <style scoped>
  /* Add any scoped styles here */
  </style>
  