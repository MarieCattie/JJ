<template>
  <v-app dark>
    <!-- Шапка приложения -->
    <v-app-bar :elevation="0" :class="{'white-header': isScrolled, 'transparent-header': !isScrolled}"  fixed app id="main-header">
      <v-container class="d-flex align-center justify-space-between mb-4 mt-4">
        
        <!-- Логотип в левом углу -->
        <a href="/" class="d-flex align-center">
          <v-img src="@/assets/images/logo.svg" contain width="187"></v-img>
          <!-- Меню с отступом -->
          <div class="d-none d-md-flex ml-8">
            
            <v-btn variant="plain" color="primary" v-for="(item, i) in items" :key="i" :to="item.to"  class="header-link ml-4 custom-reset">
              <div class="d-flex gap-2">
                <v-img :src="item.icon" contain width="20"></v-img>
                <span>{{ item.title }}</span>
              </div>
            </v-btn>
          </div>
        </a>
        
        <!-- Кнопки "Зарегистрироваться" и "Войти" в правом углу на десктопе -->
        <div class="d-none d-md-flex align-center ml-5">
          <button class="btn btn-outline" @click="goToSignUp">Зарегистрироваться</button>
          <button class="btn btn-primary" @click="goToSignIn">Войти</button>
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
import workIcon from '@/assets/images/icons/work.svg';
import badgeIcon from '@/assets/images/icons/badge.svg';
import noteIcon from '@/assets/images/icons/note.svg';
import settingsIcon from '@/assets/images/icons/settings.svg';

import { ref } from 'vue';
import { useRouter } from 'vue-router';

const drawer = ref(false);
const router = useRouter();
const isScrolled = ref(false);

const items = [
  { title: 'Вакансии', to: '/vacancies', icon: workIcon },
  { title: 'Профессиональные пробы', to: '/profession', icon: badgeIcon },
  { title: 'Статьи', to: '/articles', icon: noteIcon },
  { title: 'Настройки', to: '/settings', icon: settingsIcon }
];

const goToSignUp = () => router.push('/signup');
const goToSignIn = () => router.push('/signin');

onMounted(() => {
  window.addEventListener('scroll', () => {
    isScrolled.value = window.scrollY > 100;
  });
});
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

.white-header {
  background-color: white !important;
  color: black !important;
  box-shadow: 0 3px 10px rgb(77, 7, 98, 0.12) !important;
}

.transparent-header {
  background-color: transparent !important;
  color: white !important;
}

#main-header {
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
}

.v-app-bar--flat {
  box-shadow: none !important;
}

</style>
