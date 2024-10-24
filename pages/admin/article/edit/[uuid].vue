<template>
    <div class="p-5">
      <h1 class="text-3xl font-bold text-[#3d337e] text-center mb-8">
        {{ isEdit ? 'Редактировать статью' : 'Добавить статью' }}
      </h1>
  
      <form @submit.prevent="saveArticle">
        <!-- Заголовок статьи -->
        <div class="mb-4">
            <template v-if="articleData?.title !== null && articleData?.title !== ''">
                <AppInput
                class="w-full"
                id="title"
                label="Заголовок"
                type="text"
                v-model="articleData.title"
                required
                placeholder="Заголовок" 
              />
            </template>
          
        </div>
  
        <!-- Текст статьи -->
        <div class="mb-4">
            <template v-if="articleData.body !== null && articleData.body !== ''">
                <AppTextarea
                required
                id="body"
                v-model="articleData.body"
                class="w-full"
                rows="5"
                placeholder="Текст статьи"
                label="Текст статьи"
              />
            </template>
           
          
        </div>
  
        <!-- Превью статьи -->
        <div class="mb-4">
          <label class="block mb-2 text-sm font-medium text-gray-700">Превью</label>
          <input type="file" @change="onPreviewChange" />
          <img
            v-if="articleData.previewUrl"
            :src="articleData.previewUrl || 'https://via.placeholder.com/150'"
            alt="Article Preview"
            class="mt-3 w-64 h-40 object-cover"
          />
        </div>
  
        <!-- Детальное изображение статьи -->
        <div class="mb-4">
          <label class="block mb-2 text-sm font-medium text-gray-700">Изображение статьи</label>
          <input type="file" @change="onImageChange" />
          <img
            v-if="articleData.imageUrl"
            :src="articleData.imageUrl || 'https://via.placeholder.com/150'"
            alt="Article Image"
            class="mt-3 w-64 h-40 object-cover"
          />
        </div>
  
        <div class="flex justify-end">
          <button type="submit" class="btn bg-[#3d337e] text-white">
            {{ isEdit ? 'Обновить статью' : 'Добавить статью' }}
          </button>
        </div>
      </form>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useArticlesStore } from '~/stores/articles';
import useStorage from '~/composables/useStorage';

const route = useRoute(); // Получаем параметры роута
const router = useRouter();
const articlesStore = useArticlesStore(); // Используем store для работы с данными статей
const storage = useStorage(); // Используем для обработки изображений

const isEdit = ref(false); // Режим редактирования (если редактируем статью)
const articleData = ref({
  uuid: '',
  title: '',
  body: '',
  previewUrl: '',
  imageUrl: ''
});

const previewFile = ref<File | null>(null); // Файл для превью
const imageFile = ref<File | null>(null); // Файл для основного изображения

// Получаем статью при монтировании компонента
onMounted(async () => {
  const uuid = route.params.uuid; // Получаем UUID статьи из роута
  if (uuid) {
    isEdit.value = true; // Если uuid присутствует, это режим редактирования
    try {
      const article = await articlesStore.getArticleByUuid(uuid); // Получаем статью через store



      // Если статья найдена, инициализируем поля articleData
      if (article && article.length > 0) {
        const fetchedArticle = article[0];
        articleData.value = {
          uuid: fetchedArticle.uuid || '',
          title: fetchedArticle.title || '',
          body: fetchedArticle.body || '',
          previewUrl: storage.showArticleImage(fetchedArticle.preview) || '',
          imageUrl: storage.showArticleImage(fetchedArticle.imageUrl) || ''
        };
      }
    } catch (error) {
      console.error('Ошибка при получении статьи:', error);
    }
  }
});

// Функция для обновления превью при выборе файла
const onPreviewChange = (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (file) {
    articleData.value.previewUrl = URL.createObjectURL(file);
    previewFile.value = file;
  }
};

// Функция для обновления изображения при выборе файла
const onImageChange = (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (file) {
    articleData.value.imageUrl = URL.createObjectURL(file);
    imageFile.value = file;
  }
};

// Функция сохранения статьи (обновление или создание новой)
const saveArticle = async () => {
  if (isEdit.value) {
    // Обновляем существующую статью
    await articlesStore.updateArticle(
      articleData.value.uuid,
      articleData.value.title,
      articleData.value.body,
      previewFile.value,
      imageFile.value
    );
  } else {
    // Создаем новую статью
    await articlesStore.addArticle(
      articleData.value.title,
      articleData.value.body,
      previewFile.value,
      imageFile.value
    );
  }
  router.push('/admin/articles'); // Переход к списку статей после сохранения
};
</script>
