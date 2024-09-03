<template>
  <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <h2 class="text-[#2C1B47] text-center text-2xl font-bold leading-9 tracking-tight">Вход в личный кабинет</h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form class="space-y-6" @submit.prevent="handleSignIn">
        <div>
          <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email</label>
          <div class="mt-2">
            <input v-model="email" id="email" name="email" type="email" autocomplete="email" required
              class="block outline-none w-full rounded-xl border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#604D9E] sm:text-sm sm:leading-6 pl-3" />
          </div>
        </div>

        <div>
          <div class="flex items-center justify-between">
            <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Пароль</label>
            <div class="text-sm">
              <a href="#" class="d-none font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</a>
            </div>
          </div>
          <div class="mt-2">
            <input v-model="password" id="password" name="password" type="password" autocomplete="current-password"
              required=""
              class="block outline-none w-full rounded-xl border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#604D9E] sm:text-sm sm:leading-6 pl-3" />
          </div>
        </div>
         <!-- Отображение ошибки -->
         <div v-if="authStore.errorMessage" class="text-red-500 text-sm">
          {{ authStore.errorMessage }}
        </div>
        <div>
          <button type="submit"
            class="flex w-full justify-center rounded-xl bg-[#AAA2D8] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#9A8CEA] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9A8CEA]">Войти</button>
        </div>
      </form>

      <p class="mt-10 text-center text-sm text-gray-500">
        Нет аккаунта?
        {{ ' ' }}
        <NuxtLink to="/register" class="font-semibold leading-6 text-[#9A8CEA] hover:text-[#3d337e]">Зарегистрироваться</NuxtLink>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useAuthStore } from '~/stores/auth';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();
const email = ref('');
const password = ref('');

const handleSignIn = async () => {
  await authStore.signIn(email.value, password.value);
  if (!authStore.errorMessage) { // Проверка, что ошибки нет
    router.push('/profile'); // Переход на страницу профиля
  }
};

onMounted(() => {
  authStore.errorMessage = null;
})
</script>

<style scoped></style>