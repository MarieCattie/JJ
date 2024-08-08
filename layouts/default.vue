<template>
  <v-app dark>
    <!-- Шапка приложения -->
    <v-app-bar :elevation="0" fixed app>
      <v-container class="d-flex align-center justify-space-between mb-4 mt-4">
        <!-- Логотип в левом углу -->
        <div class="d-flex align-center">
          <v-img src="@/assets/images/logo.svg" contain width="187"></v-img>
          <!-- Меню с отступом -->
          <div class="d-none d-md-flex ml-8">
            
            <v-btn variant="plain" color="primary" v-for="(item, i) in items" :key="i" :to="item.to"  class="header-link ml-4 custom-reset">
              <div class="d-flex gap-2">
                <v-img src="@/assets/images/icons/work.svg" contain width="20"></v-img>
                <span>{{ item.title }}</span>
              </div>
            </v-btn>
          </div>
        </div>
        
        <!-- Кнопки "Зарегистрироваться" и "Войти" в правом углу на десктопе -->
        <div class="d-none d-md-flex align-center ml-5">
          <v-btn text @click="goToSignUp">Зарегистрироваться</v-btn>
          <v-btn text @click="goToSignIn">Войти</v-btn>
        </div>

        <!-- Кнопка для открытия мобильного меню -->
        <v-btn icon class="d-md-none" @click.stop="drawer = !drawer">
          <v-icon>{{ drawer ? 'mdi-close' : 'mdi-menu' }}</v-icon>
        </v-btn>
      </v-container>
    </v-app-bar>

    <!-- Мобильное меню -->
    <v-navigation-drawer
      v-model="drawer"
      temporary
      app
      class="d-md-none"
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <!-- Кнопки в мобильном меню -->
        <v-list-item @click="goToSignUp">
          <v-list-item-content>
            <v-list-item-title>Зарегистрироваться</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item @click="goToSignIn">
          <v-list-item-content>
            <v-list-item-title>Войти</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <!-- Основной контент -->
    <v-main>
      <v-container>
        <NuxtPage />
      </v-container>
    </v-main>

    <!-- Футер -->
    <v-footer :absolute="true" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const drawer = ref(false);
const router = useRouter();

const items = [
  { title: 'Пункт 1', to: '/' },
  { title: 'Пункт 2', to: '/inspire' },
  { title: 'Пункт 3', to: '/about' },
  { title: 'Пункт 4', to: '/services' },
  { title: 'Пункт 5', to: '/contact' }
];

const goToSignUp = () => router.push('/signup');
const goToSignIn = () => router.push('/signin');
</script>

<style scoped>
/* Отступ между логотипом и меню */
.ml-8 {
  margin-left: 50px;
}

/* Отступы между пунктами меню */
.ml-4 {
  margin-left: 40px;
}

.custom-reset {
  all: unset; /* Сбрасывает все стили */
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

</style>
