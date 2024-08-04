import { AxiosInstance } from "axios";

export interface ProfessionalTrialCategory {
    uuid: string;
    title: string;
}

export default ($apiClient: AxiosInstance) => ({
    async getAllCategories(): Promise<ProfessionalTrialCategory[]> {
        const response = await $apiClient.get<ProfessionalTrialCategory[]>('/professional-trial-categories/all');
        return response.data;
    },

    async storeCategory(title: string): Promise<ProfessionalTrialCategory> {
        const response = await $apiClient.post<ProfessionalTrialCategory>('/professional-trial-categories/store', { title });
        return response.data;
    }
});
