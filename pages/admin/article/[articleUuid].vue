<template>
    <div class="p-5">
      <!-- Заголовок статьи -->
      <h1 class="text-3xl font-bold text-[#3d337e] text-center mb-5">{{ article?.title }}</h1>
  
      <!-- Изображение статьи -->
      <img
        v-if="article?.preview"
        :src="storage.showArticleImage(article?.preview)"
        alt="Article Image"
        class="w-full h-60 object-cover mb-8"
      />
  
      <!-- Текст статьи -->
      <div class="article-body mb-8">
        <p v-for="(paragraph, index) in articleBody" :key="index" class="text-lg text-gray-700 mb-4 indent-8">
          {{ paragraph }}
        </p>
      </div>
  
      <!-- Подвал статьи -->
      <div class="flex justify-between items-center border-t pt-5 mt-5 text-gray-500">
        <span>{{ currentDate }}</span>
        <div class="flex items-center">
          <EyeIcon class="h-5 w-5 mr-1" />
          <span>{{ article?.views }}</span>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { useArticlesStore } from '~/stores/articles';
  import useStorage from '~/composables/useStorage';
  import { useRoute } from 'vue-router';
  import { EyeIcon } from '@heroicons/vue/24/outline';
  import useFormatter from '~/composables/useFormatter';
  
  const articlesStore = useArticlesStore();
  const storage = useStorage();
  const formatter = useFormatter();
  const route = useRoute();
  const articleUuid = route.params.articleUuid;
  const article = ref(null);
  const articleBody = ref<string[]>([]);
  const currentDate = ref();
  
  onMounted(async () => {
    const getArticles = await articlesStore.getArticleByUuid(articleUuid);
    article.value = getArticles[0];
    if (article.value?.body) {
      articleBody.value = article.value.body.split('\n'); // Splitting by newlines for paragraphs
    }
    currentDate.value = formatter.formatDate(article.value?.created_at)
  });
  </script>
  
  <style scoped>
  .article-body {
    line-height: 1.6;
  }
  
  .indent-8 {
    text-indent: 2rem;
  }
  </style>
  