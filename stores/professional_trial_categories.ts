import { defineStore } from "pinia";
import { ref } from "vue";
import { useApi } from "~/composables/api";
import { ProfessionalTrialCategory } from "~/api/professional_trial_categories";

export const useProfessionalTrialCategoriesStore = defineStore('professional_trial_categories', () => {
    const categories = ref<ProfessionalTrialCategory[]>([]);
    const loading = ref(false);
    const error = ref<string | null>(null);

    async function fetchCategories() {
        loading.value = true;
        error.value = null;
        try {
            const api = useApi();
            const data = await api.professional_trial_categories.getAllCategories();
            categories.value = data;
        } catch (err) {
            error.value = 'Failed to fetch categories';
            console.error('Error fetching categories', err);
        } finally {
            loading.value = false;
        }
    }

    async function addCategory(title: string) {
        loading.value = true;
        error.value = null;
        try {
            const api = useApi();
            const newCategory = await api.professional_trial_categories.storeCategory(title);
            await fetchCategories();
            return newCategory;
        } catch (err) {
            error.value = 'Failed to add category';
            console.error('Error adding category', err);
            return null;
        } finally {
            loading.value = false;
        }
    }

    return {
        categories,
        loading,
        error,
        fetchCategories,
        addCategory
    };
});
