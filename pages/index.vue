<template>
  <div>
    <MainBanner />
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

definePageMeta({
  layout: 'default'
})

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