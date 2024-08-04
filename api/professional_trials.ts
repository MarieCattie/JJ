import { AxiosInstance } from "axios";

export interface ProfessionalTrial {
    uuid: string;
    category: string;
    image: string;
    title: string;
    place: string;
    date: string;
    time: string;
    employer: string;
    created_at: string;
    updated_at: string;
}

export interface UpdateProfessionalTrialData {
    category_uuid: string,
    title: string,
    place: string,
    time: string,
    date: string
}

export default ($apiClient: AxiosInstance) => ({
    async getAllProfessionalTrials(query: string, row?: number, page?: number): Promise<ProfessionalTrial[]> {
        const params = { query, row, page };
        const response = await $apiClient.get<ProfessionalTrial[]>('/professional-trials/all', { params });
        return response.data;
    },
    async getCurrentUserTrials(): Promise<ProfessionalTrial[]> {
        const response = await $apiClient.get<ProfessionalTrial[]>('professional-trials/my');
        return response.data;
    },

    async getProfessionTrialById(uuid: string): Promise<ProfessionalTrial> {
        const response = await $apiClient.get<ProfessionalTrial>(`/professional-trials/${uuid}`);
        return response.data;
    },

    /** Получить всех пользователей по проф пробе (тут будет потом): GET
/professional-trials/users/{uuid} */

    async storeProfessionalTrial(data: { category_uuid: string; title: string; place: string; time: string; date: string }): Promise<ProfessionalTrial> {
        const response = await $apiClient.post<ProfessionalTrial>('/professional-trials/store', data);
        return response.data;
    },

    async uploadProfessionalTrialImage(data: { professional_trial_uuid: string; image: File }): Promise<void> {
        const formData = new FormData();
        formData.append('professional_trial_uuid', data.professional_trial_uuid);
        formData.append('image', data.image);
        await $apiClient.post('/professional-trials/uploadImage', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    },

    async updateProfessionalTrial(uuid: string, professionalTrialData: UpdateProfessionalTrialData): Promise<ProfessionalTrial> {
        const response = await $apiClient.put<ProfessionalTrial>(`/professional-trials/${uuid}`, professionalTrialData);
        return response.data;
    },

    async respondToProfessionalTrial(data: { professional_trial_uuid: string }): Promise<void> {
        await $apiClient.post('/professional-trials/respond', data);
    },

    async deleteProfessionalTrialResponse(data: { professional_trial_uuid: string }): Promise<void> {
        await $apiClient.delete('/professional-trials/respond', { data });
    },
    async deleteProfessionalTrial(data: { professional_trial_uuid: string }): Promise<void> {
        await $apiClient.delete('/professional-trials', { data });
    }

});
