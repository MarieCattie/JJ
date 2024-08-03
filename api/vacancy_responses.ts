import { AxiosInstance } from "axios";

export interface CreateVacancyResponseData {
    uuid: string;
    message: string;
}

export interface VacancyResponse {
    uuid: string;
    vacancy: string;
    applicant: string;
    message: string;
    created_at: string;
    updated_at: string;
    deleted: boolean;
}

export default ($apiClient: AxiosInstance) => ({
    async createVacancyResponse(responseData: CreateVacancyResponseData): Promise<VacancyResponse> {
        const response = await $apiClient.post<VacancyResponse>('/vacancies/response/create', responseData);
        return response.data;
    },

    /** 
     * GET /vacancies/response/applicant/{uuid}
     * Этот маршрут возвращает все отклики на вакансии, сделанные соискателем с указанным UUID
     * Параметр uuid в пути — это идентификатор пользователя (соискателя), для которого требуется получить все отклики
     */
    async getResponsesByApplicant(uuid: string): Promise<VacancyResponse[]> {
        const response = await $apiClient.get<VacancyResponse[]>(`/vacancies/response/applicant/${uuid}`);
        return response.data;
    },


    /**
     * GET /vacancies/response/employer/{uuid}
     * Этот маршрут возвращает все отклики на вакансии, размещенные работодателем с указанным UUID.
     * Параметр uuid в пути — это идентификатор пользователя (работодателя), для которого требуется получить все отклики.
     */
    async getResponsesByEmployer(uuid: string): Promise<VacancyResponse[]> {
        const response = await $apiClient.get<VacancyResponse[]>(`/vacancies/response/employer/${uuid}`);
        return response.data;
    },

    /**
     * GET /vacancies/response/vacancy/{uuid}
     * Этот маршрут возвращает все отклики на конкретную вакансию, указанную по её UUID
     * Параметр uuid в пути — это идентификатор вакансии, для которой нужно получить все отклики.
     */
    async getResponsesByVacancy(uuid: string): Promise<VacancyResponse[]> {
        const response = await $apiClient.get<VacancyResponse[]>(`/vacancies/response/vacancy/${uuid}`);
        return response.data;
    },

    /** Получение отклика по его UUID */
    async getResponseByUuid(uuid: string): Promise<VacancyResponse> {
        const response = await $apiClient.get<VacancyResponse>(`/vacancies/response/${uuid}`);
        return response.data;
    },

    async deleteResponse(uuid: string): Promise<VacancyResponse> {
        const response = await $apiClient.delete<VacancyResponse>(`/vacancies/response/${uuid}`);
        return response.data;
    },

    async selectResponse(responseData: { uuid: string; vacancyUuid: string }): Promise<void> {
        await $apiClient.post('/vacancies/selectResponse', responseData);
    }
});