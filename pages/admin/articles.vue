<template>
    <div class="p-5">
        <!-- Заголовок Статьи -->
        <h1 class="text-3xl font-bold text-[#3d337e] text-center mb-16">Статьи</h1>
    
        <!-- Кнопка Добавить статью -->
        <NuxtLink tag="button" to="/admin/add-article" class="btn btn-primary mb-7 inline-block">
          Добавить статью
        </NuxtLink>
    
        <!-- Список статей -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div v-for="article in articlesStore.articles" :key="article.uuid" class="article-card">
              <!-- Картинка статьи -->
              <img
                :src="storage.showArticleImage(article.preview) || 'https://via.placeholder.com/150'" 
                alt="Article Image"
                class="w-full h-40 object-cover rounded-t-lg"
              />
              <div class="p-4">
                <!-- Заголовок статьи -->
                <h2 class="text-xl font-semibold mb-2">
                    <NuxtLink :to="`/admin/article/${article.uuid}`">{{ article.title }}</NuxtLink>
                  </h2>
                <!-- Дата создания статьи -->
                <p class="text-sm text-gray-500">{{ formatter.formatDate(article.created_at) }}</p>
                <!-- Количество просмотров -->
                <p class="text-sm text-gray-500">Просмотры: {{ article.views }}</p>
              </div>
              <div class="flex justify-between p-4 pt-0">
                <!-- Кнопка Редактировать -->
                <NuxtLink :to="`/admin/article/edit/${article.uuid}`" class="btn bg-[#3d337e] text-white">
                  Редактировать
                </NuxtLink>
                <!-- Кнопка Удалить -->
                <button class="btn-delete" @click="articlesStore.deleteArticle(article.uuid)">
                  <TrashIcon class="h-6 w-6 text-white" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
      </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { TrashIcon } from '@heroicons/vue/24/outline'
import { useArticlesStore } from '~/stores/articles';
import useStorage from '~/composables/useStorage';
import useFormatter from '~/composables/useFormatter'

const articlesStore = useArticlesStore();
const storage = useStorage();
const formatter = useFormatter();

onMounted(async () => {
  await articlesStore.fetchArticles();
});
</script>

<style scoped>

</style>