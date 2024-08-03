<template>
  <div>
    <h1>Отзывы о соискателе</h1>
    <div v-if="loading">Загрузка...</div>
    <div v-if="error" class="error">{{ error }}</div>
    <ul v-if="!loading && !error">
      <li v-for="review in reviews" :key="review.uuid">
        <p>Оценка: {{ review.rating }}</p>
        <p>Комментарий: {{ review.comment }}</p>
        <p>Рецензент: {{ review.reviewer }}</p>
        <p>Дата: {{ review.created_at }}</p>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useReviewsStore } from '@/store/reviews';

export default defineComponent({
  setup() {
    const route = useRoute();
    const reviewsStore = useReviewsStore();
    const { uuid } = route.params;

    onMounted(() => {
      reviewsStore.getReviewsByApplicant(uuid as string);
    });

    return {
      reviews: reviewsStore.reviews,
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
