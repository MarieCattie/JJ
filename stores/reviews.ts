import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useApi } from '~/composables/api';
import { Review } from '@/api/reviews';

export const useReviewsStore = defineStore('reviews', () => {
    const reviews = ref<Review[]>([]);
    const loading = ref(false);
    const error = ref<string | null>(null);

    async function getReviewsByApplicant (uuid: string) {
        const api = useApi();
        try {
            loading.value = true;
            error.value = null;
            const data = await api.reviews.getReviewsByApplicant(uuid);
            reviews.value = data;
        } catch (err) {
            error.value = 'Ошибка при получении отзывов о соискателе';
            console.error("Ошибка при получении отзывов о соискателе:", err);
            throw err;
        } finally {
            loading.value = false;
        }
    };

    return {
        reviews,
        getReviewsByApplicant,
        loading,
        error
    };
});
