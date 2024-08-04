import { AxiosInstance } from "axios";

export interface Article {
    uuid: string;
    preview: string;
    title: string;
    body: string;
    views: number;
    deleted: boolean;
    created_at: string;
    updated_at: string;
}

export default ($apiClient: AxiosInstance) => ({
    async fetchArticles(): Promise<Article[]> {
        const response = await $apiClient.get<Article[]>('/articles/all');
        return response.data;
    },

    async getArticleByUuid(articleUuid: string): Promise<Article> {
        const response = await $apiClient.get<Article>(`/articles/${articleUuid}`);
        return response.data;
    },
    
    async storeArticle(title: string, body: string): Promise<Article> {
        const response = await $apiClient.post<Article>('/articles/store', { title, body });
        return response.data;
    },

    async uploadArticlePreview(articleUuid: string, imageData: FormData): Promise<Article> {
        const response = await $apiClient.post<Article>('/articles/uploadPreview', imageData, {
            headers: { 'Content-Type': 'multipart/form-data' },
            params: { uuid: articleUuid }
        });
        return response.data;
    },

    async uploadArticleImage(articleUuid: string, imageData: FormData): Promise<Article> {
        const response = await $apiClient.post<Article>('/articles/uploadImage', imageData, {
            headers: { 'Content-Type': 'multipart/form-data' },
            params: { uuid: articleUuid }
        });
        return response.data;
    },

    async updateArticle(articleUuid: string, title: string, body: string): Promise<Article> {
        const response = await $apiClient.put<Article>(`/articles/${articleUuid}`, { title, body });
        return response.data;
    },

    async deleteArticle(articleUuid: string): Promise<void> {
        await $apiClient.delete(`/articles/${articleUuid}`);
    }
});
