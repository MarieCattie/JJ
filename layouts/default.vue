<template>
  <v-app>
    <!-- Шапка приложения -->
    <v-app-bar :elevation="0" :class="{ 'white-header': isScrolled, 'transparent-header': !isScrolled }" fixed app
      id="main-header">
      <v-container class="d-flex align-center justify-space-between mb-4 mt-4">

        <!-- Логотип в левом углу -->
        <NuxtLink to="/" class="d-flex align-center">
          <v-img src="@/assets/images/logo.svg" contain width="187"></v-img></NuxtLink>
          <!-- Меню с отступом -->
          <div class="d-none d-md-flex ml-8">
            <template v-for="(item, i) in items">
              <v-btn variant="plain" color="primary"  v-if="(item.role === 'moderator' && userStore?.currentUser?.role?.current === 'moderator') || item.role === 'all'" :key="i" :to="item.to"
              class="header-link ml-4 custom-reset">
              <div class="d-flex gap-2" >
                <v-img v-if="item.icon" :src="item.icon" contain width="20"></v-img>
                <span :class="{ 'font-bold': item.role === 'moderator'}">{{ item.title }}</span>
              </div>
            </v-btn>
            </template>
           
          
          </div>
        

        <!-- Кнопки "Зарегистрироваться" и "Войти" в правом углу на десктопе -->
        <div class="d-none d-md-flex align-center ml-5">
          <template v-if="authStore.isAuthenticated">
            <div class="flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              <div class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <button type="button" :class="isScrolled ? 'bg-[#AAA2D8]' : 'bg-transparent'"
                  class="relative rounded-full bg-[#AAA2D8] p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                  <span class="absolute -inset-1.5" />
                  <span class="sr-only">View notifications</span>
                  <BellIcon :class="isScrolled ? 'icon-white' : 'icon-purple'" class="h-6 w-6" aria-hidden="true" />
                </button>

                <NuxtLink :class="isScrolled ? 'bg-[#AAA2D8]' : 'bg-transparent'" to="/chat" type="button"
                  class="ml-3 relative rounded-full  p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-purple">
                  <span class="absolute -inset-1.5" />
                  <span class="sr-only">View notifications</span>
                  <ChatBubbleOvalLeftIcon :class="isScrolled ? 'icon-white' : 'icon-purple'" class="h-6 w-6"
                    aria-hidden="true" />
                </NuxtLink>

                <!-- Profile dropdown -->
                <Menu as="div" class="relative ml-3">
                  <div>
                    <MenuButton
                      class="relative flex rounded-full bg-[#AAA2D8] text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span class="absolute -inset-1.5" />
                      <span class="sr-only">Open user menu</span>
                      <img class="h-8 w-8 rounded-full object-cover	"
                        :src="storage?.showUserImage(userStore?.currentUser?.image)" alt="" />
                    </MenuButton>
                  </div>
                  <transition enter-active-class="transition ease-out duration-100"
                    enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100"
                    leave-active-class="transition ease-in duration-75"
                    leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
                    <MenuItems
                      class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <MenuItem v-slot="{ active }">
                      <NuxtLink to="/profile"
                        :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700']">Профиль</NuxtLink>
                      </MenuItem>
                      <MenuItem v-slot="{ active }">
                      <a href="#"
                        :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700']">Настройки</a>
                      </MenuItem>
                      <MenuItem v-slot="{ active }">
                      <button @click.prevent="logout"
                        :class="[active ? 'bg-red-100' : '', 'block px-4 py-2 text-sm text-red-700 w-100 text-left']">Выйти</button>
                      </MenuItem>
                    </MenuItems>
                  </transition>
                </Menu>
              </div>
            </div>
          </template>

          <template v-else>
            <button class="btn btn-outline" @click="goToSignUp">Зарегистрироваться</button>
            <button class="btn btn-primary" @click="goToSignIn">Войти</button>
          </template>
        </div>

        <!-- Кнопка для открытия мобильного меню -->
        <!-- <v-btn icon color="white" style="background: #AAA2D8;" class="d-md-none" @click.stop="drawer = !drawer">
          <v-icon >{{ drawer ? 'mdi-close' : 'mdi-menu' }}</v-icon>
        </v-btn> -->

        <div class="d-flex align-items-center gap-3 d-md-none">
          <!-- Кнопка для открытия мобильного меню -->

          <template v-if="authStore.isAuthenticated">
            <v-btn icon color="white" class="sm:w-8 sm:h-8 sm:min-w-0" style="background: #AAA2D8;">
              <v-icon class="text-[16px] sm:text-[12px]">mdi-bell</v-icon>
            </v-btn>
            <v-btn to="/chat" icon color="white" class="sm:w-8 sm:h-8 sm:min-w-0" style="background: #AAA2D8;">
              <v-icon class="text-[16px] sm:text-[12px]">mdi-message-outline</v-icon>
            </v-btn>
          </template>
          <v-btn icon color="white" class="sm:w-8 sm:h-8 sm:min-w-0" style="background: #AAA2D8;"
            @click.stop="drawer = !drawer">
            <v-icon class="text-[16px] sm:text-[12px]">{{ drawer ? 'mdi-close' : 'mdi-menu' }}</v-icon>
          </v-btn>
        </div>


      </v-container>
    </v-app-bar>

    <!-- Мобильное меню -->
    <v-navigation-drawer v-model="drawer" temporary app class="d-md-none px-2">
      <v-list class="d-flex flex-column align-items-start justify-content-between">
        <v-list-item v-for="(item, i) in items" :key="i" :to="item.to" router exact>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <!-- Кнопки в мобильном меню -->
        <v-list-item @click="goToSignUp" v-if="!authStore.isAuthenticated">
          <v-list-item-content>
            <v-list-item-title>Зарегистрироваться</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item @click="goToSignIn" v-if="!authStore.isAuthenticated">
          <v-list-item-content>
            <v-list-item-title>Войти</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <button v-if="authStore.isAuthenticated" @click="logout" class=" w-[100%] btn btn-outline">Выйти</button>
    </v-navigation-drawer>

    <!-- Основной контент -->
    <v-main>
      <v-container>
        <NuxtPage />
      </v-container>
    </v-main>

    <!-- Футер -->
    <v-footer class="pt-10 pb-5 mt-7 flex-column custom-footer-styles" :absolute="true" app>
      <div class="container">
        <div class="custom-footer-styles__wrapper">
          <div class="custom-footer-styles__logo">
            <img src="@/assets/images/logo-white.svg" alt="">
          </div>
          <div class="d-flex gap-8 custom-footer-styles__info">
            <div>
              <a class="custom-footer-link" target="_blank" href="https://vk.com/ivanthe93">
                Руководитель проекта <br /> Чернявский Иван Дмитриевич: vk.com/ivanthe93
              </a>
              <p>АНО Центр развития молодёжного предпринимательства "Вектор"</p>
  
            </div>
            <div>
              <a target="_blank" style="cursor:pointer;" href="https://vk.com/junijob" class="flex items-center gap-2 mb-1"><div class="custom-footer-icon"><img src="@/assets/images/icons/vk.svg" alt=""></div><p class="custom-footer-link">Сообщество Вконтакте</p></a>
              <a style="cursor:pointer;" href="mailto:ivanplaying7@gmail.com" class="flex items-center gap-2"><div class="custom-footer-icon"><img src="@/assets/images/icons/mail.svg" alt=""></div><p class="custom-footer-link">ivanplaying7@gmail.com</p></a>
            </div>
          </div>
        </div>
      </div>
      


      <div class="text-left py-2 text-[#AAA2D8]">&copy; {{ new Date().getFullYear() }}</div>
    </v-footer>
  </v-app>
</template>

<script setup lang="ts">
import workIcon from '@/assets/images/icons/work.svg';
import badgeIcon from '@/assets/images/icons/badge.svg';
import noteIcon from '@/assets/images/icons/note.svg';
import settingsIcon from '@/assets/images/icons/settings.svg';
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { Bars3Icon, BellIcon, XMarkIcon, ChatBubbleOvalLeftIcon } from '@heroicons/vue/24/outline'
import useStorage from '~/composables/useStorage';

import { ref } from 'vue';
import { useRouter } from 'vue-router';

import { useAuthStore } from '~/stores/auth';
import { useUserStore } from '~/stores/user';

const drawer = ref(false);
const router = useRouter();
const isScrolled = ref(false);

const storage = useStorage();

const authStore = useAuthStore();
const userStore = useUserStore();

const items = [
  { title: 'Вакансии', to: '/vacancies', icon: workIcon, role: 'all' },
  { title: 'Профессиональные пробы', to: '/profession', icon: badgeIcon,role: 'all' },
  { title: 'Статьи', to: '/articles', icon: noteIcon,role: 'all' },
  { title: 'Панель управления', to: '/admin', icon: null,  role: 'moderator' },
];

const goToSignUp = () => router.push('/register');
const goToSignIn = () => router.push('/login');

const logout = () => {
  authStore.logout();
  router.push('/login')
}

onMounted(() => {
  window.addEventListener('scroll', () => {
    isScrolled.value = window.scrollY > 100;
  });
});
</script>

<style lang="scss" scoped>
/* Отступ между логотипом и меню */
.ml-8 {
  margin-left: 50px;
}

/* Отступы между пунктами меню */
.ml-4 {
  margin-left: 40px;
}

.custom-reset {
  all: unset;
  /* Сбрасывает все стили */
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

@media screen and (max-width: 960px) {
  .v-navigation-drawer {
    top: 0 !important;
    padding-top: 65px !important;
    height: 100% !important;
  }
}

.custom-footer-styles {
  background: #d8d4f1;

  &__wrapper {
    width: 100%;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    @media screen and (max-width: 960px) {
      flex-direction: column;
      align-items: center;
    }
  }
}
.custom-footer-link {
  color: #3d337e;
  font-size: 16px;
  font-weight: 600;
  &:hover {
    color: #4225ff;
  }
}

.custom-footer-icon {
  width: 24px;
  height: 24px;
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
}

.custom-footer-styles__logo {
  @media screen and (max-width: 960px) {
    margin-bottom: 40px;
  }
}

.custom-footer-styles__info {
  @media screen and (max-width: 520px) {
    flex-direction: column;
  }
}
</style>
