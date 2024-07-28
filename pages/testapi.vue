<template>
  <div>
    <h1 style="font-size: 35px;font-weight:bold;">Authorization</h1>
    <div class="wrapper">
      <button @click="authStore.signIn('testtest@mail.ru', 'testtest')">Верная авторизация (/auth/local/signin)</button>
      <button @click="authStore.signUp('apitestuser@mail.ru', 'apitestuser', '74a7174b-19d1-41fd-a897-6d65853fd257')">Регистрация (/auth/local/signup)</button>
      <button @click="authStore.refresh()">Рефреш (auth/refresh)</button>
      <button @click="authStore.logout()">Выход (auth/logout)</button>
      <button @click="testMiddleware">Тестовое получение данных под авторизацией</button>
    </div>
    <h1 style="font-size: 35px;font-weight:bold;">Users</h1>
    <h2 style="font-size: 20px;font-weight:bold;">GET /users</h2>
    <div class="wrapper">
      <button @click="userStore.fetchUsers()">Получение пользователей без параметров</button>
      <button @click="userStore.fetchUsers({ page: 3 })">Получение пользователей с параметром page = 3</button>
      <button @click="userStore.fetchUsers({ page: 3, row: 27 })">Получение пользователей с параметром page = 3, row = 4</button>
      <button @click="userStore.fetchUsers({ sortByUpdatedAt: 'Up' })">Получение пользователей с параметром sortByUpdatedAt = Up</button>
      <button @click="userStore.fetchUsers({ sortByUpdatedAt: 'Down' })">Получение пользователей с параметром sortByUpdatedAt = Down</button>
    </div>
    <h2 style="font-size: 20px;font-weight:bold;">GET /users/my</h2>
    <div class="wrapper">
      <button @click="userStore.fetchCurrentUser()">FetchCurrentUser(/users/my)</button>
    </div>
    <h2 style="font-size: 20px;font-weight:bold;">GET /users/email/{email}</h2>
    <div class="wrapper">
      <button @click="userStore.getUserByEmail('testtest@mail.ru')">GetByEmail testtest@mail.ru</button>
    </div>
    <h2 style="font-size: 20px;font-weight:bold;">GET /users/{uuid}</h2>
    <div class="wrapper">
      <button @click="userStore.getUserById('78dce235-cc1a-48ca-89d7-0faf47e7d867')">GetById "78dce235-cc1a-48ca-89d7-0faf47e7d867"</button>
    </div>
    <h2 style="font-size: 20px;font-weight:bold;">POST /users/uploadImage</h2>
    <div class="wrapper">
      <input type="file" accept="image/*" @change="handleFileChange">
    </div>
    <h2 style="font-size: 20px;font-weight:bold;">POST /users/changePassword</h2>
    <div class="wrapper">
      <form @submit.prevent="handleChangePassword">
        <input type="password" v-model="previousPassword" placeholder="Current Password" required>
        <input type="password" v-model="newPassword" placeholder="New Password" required>
        <button type="submit">Change Password</button>
      </form>
    </div>
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

const previousPassword = ref('');
const newPassword = ref('');

onMounted(async () => {
  try {
    //Пример запроса из store
    // await authStore.refresh()

    //Пример запроса, где авторизация не нужна
    // const response = await $apiClient.get('/cities');

    //Пример запроса, для которого нужна авторизация
    // const response = await $apiClient.get('/roles/my');

    // userStore.fetchUsers()

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

function handleFileChange(event) {
  const file = event.target.files[0];
  if (file) {
    userStore.uploadUserImage(file);
  }
}

const handleChangePassword = async () => {
  try {
    await userStore.changePassword(previousPassword.value, newPassword.value);
    alert('Password changed successfully');
  } catch (error) {
    alert('Failed to change password');
    console.error(error);
  }
};

</script>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  gap: 30px;
  flex-wrap: wrap;
  button {
    color: #040209;
    padding: 5px 15px;
    border-radius: 8px;
    background: #e9dbff;
  }
}
</style>