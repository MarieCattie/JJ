import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useApi } from '~/composables/api';
import { Review, MarkResponse } from '@/api/reviews';

export const useReviewsStore = defineStore('reviews', () => {
    const reviews = ref<Review[]>([]);
    const averageMark  = ref<number | null>(null);
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

    const createReviewForApplicant = async (uuid: string, mark: number, body: string) => {
        const api = useApi();
        try {
            loading.value = true;
            error.value = null;
            const review = await api.reviews.createReviewForApplicant(uuid, mark, body);
            reviews.value.push(review);
        } catch (err) {
            error.value = 'Ошибка при создании отзыва';
            console.error("Ошибка при создании отзыва:", err);
            throw err;
        } finally {
            loading.value = false;
        }
    };

    const getApplicantAverageMark = async (uuid: string) => {
        const api = useApi();
        try {
            loading.value = true;
            error.value = null;
            const { mark } = await api.reviews.getApplicantAverageMark(uuid);
            averageMark.value = mark;
        } catch (err) {
            error.value = 'Ошибка при получении средней оценки соискателя';
            console.error("Ошибка при получении средней оценки соискателя:", err);
            throw err;
        } finally {
            loading.value = false;
        }
    };

    return {
        reviews,
        averageMark,
        getReviewsByApplicant,
        createReviewForApplicant,
        loading,
        error
    };
});
