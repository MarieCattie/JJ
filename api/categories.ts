import { AxiosInstance } from "axios";

export interface Category {
    uuid: string,
    title: string,
    image: string
}

export interface CategoryTitle {
    title: string
}

export interface UploadCategoryImageData {
    uuid: string;
    image: File;
}

export default ($apiClient: AxiosInstance) => ({
    async getAllCategories(): Promise<Category[]> {
        const response = await $apiClient.get<Category[]>('/vacancies/category/all');
        return response.data;
    },
    async createCategory(categoryData: CategoryTitle): Promise<Category> {
        const response = await $apiClient.post<Category>('/vacancies/category/store', categoryData);
        return response.data;
    },
    async uploadCategoryImage(data: UploadCategoryImageData): Promise<void> {
        const formData = new FormData();
        formData.append('uuid', data.uuid);
        formData.append('image', data.image);
        const response = await $apiClient.post<void>('/vacancies/category/uploadImage', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        return response.data;
    },
    async getCategoryById(uuid: string): Promise<Category> {
        const response = await $apiClient.get<Category>(`/vacancies/category/${uuid}`);
        return response.data;
    }
});