<template>
    <div class="container mx-auto px-4 py-8">
      <h1 class="text-2xl font-bold text-purple-900 text-center mb-8">Добавить статью</h1>
      <form @submit.prevent="submitForm" class="space-y-6">
        <div>
          <label for="title" class="block text-lg font-medium text-gray-700">Заголовок</label>
          <input
            v-model="title"
            type="text"
            id="title"
            class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
            required
          />
        </div>
  
        <div>
          <label for="body" class="block text-lg font-medium text-gray-700">Содержимое</label>
          <textarea
            v-model="body"
            id="body"
            rows="5"
            class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
            required
          ></textarea>
        </div>
  
        <div>
          <label for="previewFile" class="block text-lg font-medium text-gray-700">Превью (опционально)</label>
          <input
            @change="handlePreviewFile"
            type="file"
            id="previewFile"
            class="mt-1 block w-full"
          />
        </div>
  
        <div>
          <label for="imageFile" class="block text-lg font-medium text-gray-700">Изображение (опционально)</label>
          <input
            @change="handleImageFile"
            type="file"
            id="imageFile"
            class="mt-1 block w-full"
          />
        </div>
  
        <button type="submit" class="btn bg-purple-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-purple-700">
          Добавить статью
        </button>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useArticlesStore } from '~/stores/articles';
  import { useRouter } from 'vue-router';
  
  const title = ref('');
  const body = ref('');
  const previewFile = ref(null);
  const imageFile = ref(null);
  const articlesStore = useArticlesStore();
  const router = useRouter();
  
  const handlePreviewFile = (event) => {
    previewFile.value = event.target.files[0];
  };
  
  const handleImageFile = (event) => {
    imageFile.value = event.target.files[0];
  };
  
  const submitForm = async () => {
    const newArticle = await articlesStore.addArticle(
      title.value,
      body.value,
      previewFile.value,
      imageFile.value
    );
  
    if (newArticle) {
      router.push('/admin/articles'); // Переход на страницу со статьями
    }
  };
  </script>
  
  <style>
    .btn {
      padding: 10px 20px;
      font-size: 16px;
      font-weight: 600;
      border-radius: 8px;
    }
  </style>
  