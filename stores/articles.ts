import { defineStore } from "pinia";
import { ref } from "vue";
import { useApi } from "~/composables/api";
import { Article } from "~/api/articles";

export const useArticlesStore = defineStore('articles', () => {
    const articles = ref<Article[]>([]);
    const loading = ref(false);
    const error = ref<string | null>(null);

    async function addArticle(title: string, body: string, previewFile: File | null, imageFile: File | null) {
        loading.value = true;
        error.value = null;
        try {
            const api = useApi();
            const newArticle = await api.articles.storeArticle(title, body);
            
            if (previewFile) {
                const previewData = new FormData();
                previewData.append('image', previewFile);
                previewData.append('uuid', newArticle.uuid);
                const updatedArticleWithPreview = await api.articles.uploadArticlePreview(newArticle.uuid, previewData);
                newArticle.preview = updatedArticleWithPreview.preview;
            }
            
            if (imageFile) {
                const imageData = new FormData();
                imageData.append('image', imageFile);
                const updatedArticleWithImage = await api.articles.uploadArticleImage(newArticle.uuid, imageData);
                newArticle.preview = updatedArticleWithImage.preview;
            }
            
            articles.value.push(newArticle);
            
            return newArticle;
        } catch (err) {
            error.value = 'Failed to add article';
            console.error('Error adding article', err);
            return null;
        } finally {
            loading.value = false;
        }
    }

    async function updateArticle(articleUuid: string, title: string, body: string, previewFile: File | null, imageFile: File | null) {
        loading.value = true;
        error.value = null;
        try {
            const api = useApi();
            const updatedArticle = await api.articles.updateArticle(articleUuid, title, body);

            if (previewFile) {
                const previewData = new FormData();
                previewData.append('image', previewFile);
                previewData.append('uuid', updatedArticle.uuid);
                const updatedArticleWithPreview = await api.articles.uploadArticlePreview(updatedArticle.uuid, previewData);
                updatedArticle.preview = updatedArticleWithPreview.preview;
            }

            if (imageFile) {
                const imageData = new FormData();
                imageData.append('image', imageFile);
                const updatedArticleWithImage = await api.articles.uploadArticleImage(updatedArticle.uuid, imageData);
                updatedArticle.preview = updatedArticleWithImage.preview;
            }

            const index = articles.value.findIndex(article => article.uuid === articleUuid);
            if (index !== -1) {
                articles.value[index] = updatedArticle;
            }

            return updatedArticle;
        } catch (err) {
            error.value = 'Failed to update article';
            console.error('Error updating article', err);
            return null;
        } finally {
            loading.value = false;
        }
    }

    async function deleteArticle(articleUuid: string) {
        loading.value = true;
        error.value = null;
        try {
            const api = useApi();
            await api.articles.deleteArticle(articleUuid);

            const index = articles.value.findIndex(article => article.uuid === articleUuid);
            if (index !== -1) {
                articles.value.splice(index, 1);
            }
        } catch (err) {
            error.value = 'Failed to delete article';
            console.error('Error deleting article', err);
        } finally {
            loading.value = false;
        }
    }

    async function fetchArticles() {
        loading.value = true;
        error.value = null;
        try {
            const api = useApi();
            const fetchedArticles = await api.articles.fetchArticles();
            articles.value = fetchedArticles;
        } catch (err) {
            error.value = 'Failed to fetch articles';
            console.error('Error fetching articles', err);
        } finally {
            loading.value = false;
        }
    }

    async function getArticleByUuid(articleUuid: string): Promise<Article | undefined> {
       
            loading.value = true;
            error.value = null;
            try {
                const api = useApi();
                const fetchedArticle = await api.articles.getArticleByUuid(articleUuid);
                articles.value.push(fetchedArticle);
                return fetchedArticle;
            } catch (err) {
                error.value = 'Failed to fetch article';
                console.error('Error fetching article', err);
                return undefined;
            } finally {
                loading.value = false;
            }
        
    }


    return {
        articles,
        loading,
        error,
        addArticle,
        updateArticle,
        deleteArticle,
        fetchArticles,
        getArticleByUuid
    };
});
