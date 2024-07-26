<template>
  <div>
    <h1 style="font-size: 25px">Authorization</h1>
    <div class="wrapper">
      <button @click="authStore.signIn('testtest@mail.ru', 'testtest')">Верная авторизация (/auth/local/signin)</button>
      <button @click="authStore.signUp('apitestuser@mail.ru', 'apitestuser', '74a7174b-19d1-41fd-a897-6d65853fd257')">Регистрация (/auth/local/signup)</button>
      <button @click="authStore.refresh()">Рефреш (auth/refresh)</button>
      <button @click="authStore.logout()">Выход (auth/logout)</button>
      <button @click="testMiddleware">Тестовое получение данных под авторизацией</button>
    </div>
    <h1 style="font-size: 25px">Users</h1>
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

    userStore.fetchUsers()

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
.wrapper {
  display: flex;
  gap: 30px;
  flex-wrap: wrap;
  button {
    padding: 5px 15px;
    border-radius: 8px;
    background: #e9dbff;
  }
}
</style>