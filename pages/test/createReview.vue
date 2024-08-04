<template>
    <div>
      <h1>Оставить отзыв о соискателе</h1>
      <form @submit.prevent="submitReview">
        <div>
          <label for="mark">Оценка:</label>
          <input type="number" id="mark" v-model="mark" required />
        </div>
        <div>
          <label for="body">Комментарий:</label>
          <textarea id="body" v-model="body" required></textarea>
        </div>
        <button type="submit">Отправить</button>
      </form>
      <div v-if="loading">Отправка...</div>
      <div v-if="error" class="error">{{ error }}</div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { useRoute } from 'vue-router';
  import { useReviewsStore } from '@/store/reviews';
  
  export default defineComponent({
    setup() {
      const route = useRoute();
      const reviewsStore = useReviewsStore();
      const mark = ref<number>(0);
      const body = ref<string>('');
  
      const submitReview = async () => {
        try {
          const { uuid } = route.params;
          await reviewsStore.createReviewForApplicant(uuid as string, mark.value, body.value);
          mark.value = 0;
          body.value = '';
          alert('Отзыв успешно создан');
        } catch (err) {
          console.error('Ошибка при создании отзыва:', err);
        }
      };
  
      return {
        mark,
        body,
        submitReview,
        loading: reviewsStore.loading,
        error: reviewsStore.error
      };
    }
  });
  </script>
  
  <style scoped>
  .error {
    color: red;
  }
  </style>
  