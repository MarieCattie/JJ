<template>
  <div>
    <div v-if="loading"></div>
    <template v-else>
      <MainBanner />
    <h3 class="main-title-3 mb-4">
      Мы предлагаем вакансии в различных сферах деятельности: от работы в кафе и ресторанах до фриланса и удаленной работы
    </h3>
    <p class="mb-8">
      Вы можете выбрать удобный график и условия работы, которые подойдут именно вам
    </p>
    <MainCategories />
    <h2 class="main-title-2 mt-5 mb-3 sm:mt-15 sm:mb-12">Как найти работу на нашем сайте</h2>
    <MainAdvantages />
    <h2 class="main-title-2 mt-5 mb-3 sm:mt-15 sm:mb-6">Новые вакансии</h2>
    <MainVacancies class="mb-16" />
    </template>
    
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
.main-title-3 {
  max-width: 750px;
  color: #2C1B47;
  font-size: 28px;
  font-weight: 600;
  font-family: 'Montserrat', sans-serif;
  line-height: 122%;
  @media screen and (max-width: 960px) {
    font-size: 24px;
  }
  @media screen and (max-width: 400px) {
    font-size: 16px;
  }
}

.main-title-2 {
  font-family: 'Montserrat', sans-serif;
  font-weight: 600;
  font-size: 40px;
  color: #000;
  @media screen and (max-width: 960px) {
    font-size: 24px;
  }
}
</style>