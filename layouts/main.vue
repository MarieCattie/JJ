<template>
    <v-app dark>
      <header class="absolute inset-x-0 top-0 z-50">
        <nav class="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
          <div class="flex lg:flex-1">
            <a href="/" class="-m-1.5 p-1.5">
                <v-img src="@/assets/images/logo.svg" contain width="187"></v-img>
            </a>
          </div>
          <div class="flex lg:hidden">
            <button type="button" class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700" @click="mobileMenuOpen = true">
              <span class="sr-only">Open main menu</span>
              <v-icon>{{ drawer ? 'mdi-close' : 'mdi-menu' }}</v-icon>
            </button>
          </div>
          <div class="hidden lg:flex lg:gap-x-12">
            <a v-for="item in items" :key="item.name" :href="item.to" class="d-flex items-center gap-2 text-sm font-semibold leading-6 text-gray-900"><v-img :src="item.icon" contain width="20"></v-img> <span>{{ item.title }}</span></a>
          </div>
          <div class="hidden lg:flex lg:flex-1 lg:justify-end">
            <button class="btn btn-outline" @click="goToSignUp">Зарегистрироваться</button>
            <button class="btn btn-primary" @click="goToSignIn">Войти</button>
          </div>
        </nav>
        <Dialog class="lg:hidden" @close="mobileMenuOpen = false" :open="mobileMenuOpen">
          <div class="fixed inset-0 z-50" />
          <DialogPanel class="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div class="flex items-center justify-between">
              <a href="#" class="-m-1.5 p-1.5">
                <span class="sr-only">Your Company</span>
                <img class="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="" />
              </a>
              <button type="button" class="-m-2.5 rounded-md p-2.5 text-gray-700" @click="mobileMenuOpen = false">
                <span class="sr-only">Close menu</span>
                <v-icon>{{ drawer ? 'mdi-window-close' : 'mdi-window-close' }}</v-icon>
              </button>
            </div>
            <div class="mt-6 flow-root">
              <div class="-my-6 divide-y divide-gray-500/10">
                <div class="space-y-2 py-6">
                  <a v-for="item in navigation" :key="item.name" :href="item.href" class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">{{ item.name }}</a>
                </div>
                <div class="py-6">
                    <button class="btn btn-outline" @click="goToSignUp">Зарегистрироваться</button>
                </div>
              </div>
            </div>
          </DialogPanel>
        </Dialog>
      </header>
      <v-main>
        <v-container>
          <NuxtPage />
        </v-container>
      </v-main>
      <v-footer :absolute="true" app>
        <span>&copy; {{ new Date().getFullYear() }}</span>
      </v-footer>
    </v-app>
  </template>
  
  <script lang="ts" setup>
    import { ref } from 'vue'
    import { Dialog, DialogPanel } from '@headlessui/vue'

    import workIcon from '@/assets/images/icons/work.svg';
    import badgeIcon from '@/assets/images/icons/badge.svg';
    import noteIcon from '@/assets/images/icons/note.svg';
    import settingsIcon from '@/assets/images/icons/settings.svg';
  
    const items = [
  { title: 'Вакансии', to: '/vacancies', icon: workIcon },
  { title: 'Профессиональные пробы', to: '/profession', icon: badgeIcon },
  { title: 'Статьи', to: '/articles', icon: noteIcon },
  { title: 'Настройки', to: '/settings', icon: settingsIcon }
];

const goToSignUp = () => router.push('/signup');
const goToSignIn = () => router.push('/signin');
  
  const mobileMenuOpen = ref(false)
  </script>