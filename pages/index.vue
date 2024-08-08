<template>
    <div>
      <button @click="authStore.signIn('testtest@mail.ru', 'testtest')">Верная авторизация (/auth/local/signIn)</button>
      <button @click="authStore.logout()">Выход (/logout)</button>
      <button @click="authStore.refresh()">Выход (/logout)</button>
      <button @click="testMiddleware">Тестовое получение данных под авторизацией</button>
      <v-btn>Sign Up</v-btn>
      <v-btn icon="$vuetify" variant="outlined">
        Button
      </v-btn>
    </div>
</template>

<script setup>
import { useCitiesStore } from '~/stores/city';
import { useAuthStore } from '~/stores/auth';
import { useUserStore } from '~/stores/user';
const { $apiClient } = useNuxtApp();

const cityStore = useCitiesStore();
const authStore = useAuthStore();
const userStore = useUserStore();

const data = ref(null);
const loading = ref(true);
const error = ref(null);

onMounted(async () => {
  try {
    //Пример запроса из store
    // await authStore.refresh()

    //Пример запроса, где авторизация не нужна
    // const response = await $apiClient.get('/cities');

    //Пример запроса, для которого нужна авторизация
    // const response = await $apiClient.get('/roles/my');


  } catch (err) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
});

const testMiddleware = async() => {
  const response = await $apiClient.get('/roles/my');
  console.log(response)
}


</script>

<style lang="scss" scoped>

</style>