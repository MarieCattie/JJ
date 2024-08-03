import { defineStore } from "pinia";
import { ref } from "vue";
import { Category, CategoryTitle, UploadCategoryImageData  } from "~/api/categories";

export const useCategoriesStore = defineStore('categories', () => {
    const categories = ref<Category[]>([]);
    const loading = ref(false);
    const error = ref<string | null>(null);

    async function fetchCategories() {
        loading.value = true;
        error.value = null;
        try {
            const api = useApi();
            const data = await api.categories.getAllCategories();
            categories.value = data;
        } catch (err) {
            error.value = "Ошибка загрузки данных"
            console.error('Error fetching vacancies', err)
        } finally {
            loading.value = false;
        }
    }

    async function createCategory(categoryData: CategoryTitle, image: File) {
        loading.value = true;
        error.value = null;
        try {
            const api = useApi();
            const newCategory = await api.categories.createCategory(categoryData);
            if(image) {
                await api.categories.uploadCategoryImage({uuid: newCategory.uuid, image});
            }
            await fetchCategories();
            return newCategory;
        } catch (err) {
            error.value = 'Failed to create category';
            console.error('Error creating category', err);
            return null;
        } finally {
            loading.value = false;
        }
    }

    async function getCategoryById(uuid: string) {
        loading.value = true;
        error.value = null;
        try {
            const api = useApi();
            const data = await api.categories.getCategoryById(uuid);
            return data;
        } catch (err) {
            console.log(err)
        } finally {
            loading.value = false;
        }
    }

    return {
        categories,
        loading,
        error,
        fetchCategories,
        createCategory,
        getCategoryById
    };
}, {
    persist: true
})