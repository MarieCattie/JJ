<template>
  <div>
    <h1 style="font-size: 35px;font-weight:bold;">Authorization</h1>
    <div class="wrapper">
      <button @click="authStore.signIn('moder@bk.ru', '54321')">авторизация модера (/auth/local/signin)</button>
      <button @click="authStore.signIn('alina@mail.ru', 'alinaalina')">авторизация alina (/auth/local/signin)</button>
      <button @click="authStore.signIn('testtesttest@mail.ru', 'testtesttest')">Верная авторизация (/auth/local/signin)</button>
      <button @click="authStore.signIn('@mail.ru', '')">неВерная авторизация (/auth/local/signin)</button>
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
      <button @click="userStore.getUserByEmail('testapplicant@mail.ru')">GetByEmail testapplicant@mail.ru</button>
    </div>
    <h2 style="font-size: 20px;font-weight:bold;">GET /users/{uuid}</h2>
    <div class="wrapper">
      <button @click="userStore.getUserById('2c9f1aea-23d0-4587-ab1b-1f7da5fcd6e7')">GetById "2c9f1aea-23d0-4587-ab1b-1f7da5fcd6e7" </button>
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
    <h2 style="font-size: 20px;font-weight:bold;">POST /users/changeEmail</h2>
    <div class="wrapper">
      <form @submit.prevent="handleChangeEmail">
        <input type="email" v-model="newEmail" placeholder="New Email" required>
        <input type="password" v-model="password" placeholder="Current Password" required>
        <button type="submit">Change Email</button>
      </form>
    </div>
    <h2 style="font-size: 20px;font-weight:bold;">POST /users/ban</h2>
    <div class="wrapper">
     <button @click="handleBanUser">Ban </button>
     <button @click="handleUnBanUser">Unban </button>
     <button @click="handleDeleteUser">Delete </button>
    </div>
  </div>
  <h1 style="font-size: 35px;font-weight:bold;">Cities</h1>
  <h2 style="font-size: 20px;font-weight:bold;">GET /cities/all</h2>
  <div class="wrapper">
    <button @click="cityStore.fetchCities">Fetch All Cities </button>
    <button @click="cityStore.getCityByName('Смоленск')">Get City By Name</button>
    <button @click="cityStore.getCityByUuid('74a7174b-19d1-41fd-a897-6d65853fd257')">Get City By UUID</button>
  </div>
  <h1 style="font-size: 35px;font-weight:bold;">Roles</h1>
  <h2 style="font-size: 20px;font-weight:bold;">GET /roles/user/{uuid}</h2>
  <div class="wrapper">
    <button @click="roleStore.getRolesByUserUuid('027038ad-0222-48e9-b30e-80236528fd1b')">Get User Role By Uuid </button>
    <button @click="roleStore.fetchRolesForCurrentUser">Fetch roles authorized user (roles/my GET)</button>
    <button @click="roleStore.changeCurrentUserRole({ role: 'applicant' })">Change role</button>
  </div>
  <h1 style="font-size: 35px;font-weight:bold;">Competencies</h1>
  <h2 style="font-size: 20px;font-weight:bold;">GET all competencies</h2>
  <div class="wrapper">
    <button @click="competenciesStore.fetchCompetencies()">All competencies </button>
    <button @click="competenciesStore.getCompetencyByName('Python')">Get By Name 'Python'</button>
    <button @click="competenciesStore.storeCompetency('Программирование')">Создание</button>
    <button @click="competenciesStore.deleteCompetency('5f15f5ba-4111-46dc-8f92-77b2ac33846d')">Удаление по ид</button>
  </div>
  <h1 style="font-size: 35px;font-weight:bold;">Vacancies</h1>
  <h2 style="font-size: 20px;font-weight:bold;">GET my vacancies</h2>
  <div class="wrapper">
    <button @click="vacanciesStore.fetchCurrentUserVacancies()">Fetch My Vacancies</button>
  </div>
  <h1 style="font-size: 35px;font-weight:bold;">Categories</h1>
  <h2 style="font-size: 20px;font-weight:bold;">Fetch all categories</h2>
  <div class="wrapper">
    <button @click="categoriesStore.fetchCategories()">Fetch All Categories</button>
    <button @click="categoriesStore.getCategoryById(categoriesStore.categories[0].uuid)">Get First category by id</button>
  </div>
  <h1 style="font-size: 35px;font-weight:bold;">Professional Trials</h1>
  <h2 style="font-size: 20px;font-weight:bold;">Fetch all trials</h2>
  <div class="wrapper">
    <button @click="professionalTrialsStore.fetchProfessionalTrials()">Fetch All trials without params</button>
    <button @click="professionalTrialsStore.fetchProfessionalTrials(undefined, 6)">Fetch All trials with params</button>
  </div>
  <h1 style="font-size: 35px;font-weight:bold;">Professional Trials Categories</h1>
  <h2 style="font-size: 20px;font-weight:bold;">Fetch all categories</h2>
  <div class="wrapper">
    <button @click="professionalTrialCategoriesStore.fetchCategories()">Fetch All</button>

    <button @click="chatStore.fetchChats()">fetch chats</button>

    <h2 style="font-size: 20px;font-weight:bold;">Fetch all messages</h2>
    <button @click="chatStore.fetchAllMessages()">fetch all messages</button>
  </div>
</template>

<script setup>
import { useAuthStore } from '~/stores/auth';
import { useUserStore } from '~/stores/user';
import { useCitiesStore } from '~/stores/city';
import { useRoleStore } from '~/stores/roles';
import { useCompetenciesStore } from '~/stores/competencies';
import { useVacanciesStore } from '~/stores/vacancies';
import { useCategoriesStore } from '~/stores/categories';
import { useProfessionalTrialsStore } from '~/stores/professional_trials';
import { useChatStore } from '~/stores/chat';
import { useProfessionalTrialCategoriesStore } from '~/stores/professional_trial_categories';
const { $apiClient } = useNuxtApp();

const authStore = useAuthStore();
const userStore = useUserStore();
const cityStore = useCitiesStore();
const roleStore = useRoleStore();
const chatStore = useChatStore();
const competenciesStore = useCompetenciesStore();
const vacanciesStore = useVacanciesStore();
const categoriesStore = useCategoriesStore();
const professionalTrialsStore = useProfessionalTrialsStore();
const professionalTrialCategoriesStore = useProfessionalTrialCategoriesStore();

const data = ref(null);
const loading = ref(true);
const error = ref(null);

//Для метода смены пароля
const previousPassword = ref('');
const newPassword = ref('');

//Для метода смены e-mail
const newEmail = ref('');
const password = ref('');

//Для бана
const userUuid = ref('0af64411-ab92-4641-afcc-fcb40f8e9119');

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

const handleChangeEmail = async () => {
  try {
    await userStore.changeEmail(newEmail.value, password.value);
    alert('Email changed successfully');
  } catch (error) {
    alert('Failed to change email');
    console.error(error);
  }
};

const handleBanUser = async () => {
  try {
    await userStore.banUser(userUuid.value);
    alert('User banned successfully');
  } catch (error) {
    alert('Failed to ban user');
    console.error(error);
  }
};

const handleUnBanUser = async () => {
  try {
    await userStore.unbanUser(userUuid.value);
    alert('User unbanned successfully');
  } catch (error) {
    alert('Failed to ban user');
    console.error(error);
  }
};

const handleDeleteUser = async () => {
  try {
    await userStore.deleteUser(userUuid.value);
    alert('User deleted successfully');
  } catch (error) {
    alert('Failed to delete user');
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
    background: #00CA89;
  }
}
</style>