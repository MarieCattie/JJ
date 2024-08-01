import { AxiosInstance } from "axios";

export interface Competency {
    uuid: string;
    title: string;
}

export default ($apiClient: AxiosInstance) => ({
    async getAllCompetencies(): Promise<Competency[]> {
        const response = await $apiClient.get<Competency[]>('/competencies/all');
        return response.data;
    },
    async getCompetencyByName(title: string): Promise<Competency> {
        const response = await $apiClient.get<Competency>(`/competencies/byTitle/${title}`);
        return response.data;
    },
    async getCompetencyById(uuid: string): Promise<Competency> {
        const response = await $apiClient.get<Competency>(`/competencies/${uuid}`);
        return response.data;
    },
    async deleteCompetency(uuid: string): Promise<void> {
        await $apiClient.delete<void>(`/competencies/${uuid}`);
    },
    async storeCompetency(title: string): Promise<Competency> {
       const response = await $apiClient.post<Competency>(`/competencies/store`, {
        title: title
       });
       return response.data;
    }
})