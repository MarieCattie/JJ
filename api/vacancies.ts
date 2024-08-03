import { AxiosInstance } from "axios";

export interface Vacancy {
    uuid: string;
    employer: string;
    title: string;
    category: {
        uuid: string;
        title: string;
        image: string;
    };
    responseSelected: string;
    time: string;
    place: string;
    description: string;
    image: string;
    required_experience: boolean;
    several_applicants: boolean;
    deleted: boolean;
    banned: boolean;
    isClosedForResponse: boolean;
    created_at: string;
    updated_at: string;
}

export interface CreateVacancyData {
    title: string;
    category_uuid: string;
    time: string;
    place: string;
    description: string;
    required_experience: boolean;
    several_applicants: boolean;
}

export interface UpdateVacancyData extends CreateVacancyData {
    uuid: string;
}

export interface BanVacancyData {
    uuid: string;
}

export interface UploadVacancyImageData {
    uuid: string;
    image: File;
}

export default ($apiClient: AxiosInstance) => ({
    async createVacancy(vacancyData: CreateVacancyData): Promise<Vacancy> {
        const response = await $apiClient.post<Vacancy>('/vacancies/create', vacancyData);
        return response.data;
    },
    async updateVacancy(vacancyData: UpdateVacancyData): Promise<Vacancy> {
        const response = await $apiClient.put<Vacancy>('/vacancies/edit', vacancyData);
        return response.data;
    },
    async getAllVacancies(): Promise<Vacancy[]> {
        const response = await $apiClient.get<Vacancy[]>('/vacancies/all');
        return response.data;
    },
    async getCurrentUserVacancies(): Promise<Vacancy[]> {
        const response = await $apiClient.get<Vacancy[]>('/vacancies/my');
        return response.data;
    },
    async searchVacancies(params: {
        page?: number;
        row?: number;
        byDate?: string;
        sortByUpdatedAt?: string;
        sortByCreatedAt?: string;
        query?: string;
    }): Promise<Vacancy[]> {
        const response = await $apiClient.get<Vacancy[]>('/vacancies/search', { params });
        return response.data;
    },
    async getVacancyById(uuid: string): Promise<Vacancy> {
        const response = await $apiClient.get<Vacancy>(`/vacancies/${uuid}`);
        return response.data;
    },
    async banVacancy(banData: BanVacancyData): Promise<Vacancy> {
        const response = await $apiClient.post<Vacancy>('/vacancies/ban', banData);
        return response.data;
    },
    async unbanVacancy(banData: BanVacancyData): Promise<Vacancy> {
        const response = await $apiClient.post<Vacancy>('/vacancies/unban', banData);
        return response.data;
    },
    async uploadVacancyImage(data: UploadVacancyImageData): Promise<Vacancy> {
        const formData = new FormData();
        formData.append('uuid', data.uuid);
        formData.append('image', data.image);
        const response = await $apiClient.post<Vacancy>('/vacancies/uploadImage', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        return response.data;
    },
    async deleteVacancy(uuid: string): Promise<boolean> {
        const response = await $apiClient.delete<boolean>('/vacancies/delete', {
            data: { uuid },
        });
        return response.data;
    },
});
