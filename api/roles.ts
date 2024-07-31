import { AxiosInstance } from "axios";

export interface Applicant {
    uuid: string;
    user_uuid: string;
    name: string;
    surname: string;
    birthday: string;
    study_place: string;
    inn: string;
    competencies: any[];
    summary: string;
    created_at: string;
    updated_at: string;
}

export interface UpdateApplicantPayload {
    name: string;
    surname: string;
    birthday: string;
    study_place: string;
    inn: string;
    competencies_titles: string[];
    summary: string;
    created_at: string;
    updated_at: string;
}

export interface Role {
    uuid: string;
    applicant?: {
        uuid: string;
        user_uuid: string;
        name: string;
        surname: string;
        birthday: string;
        study_place: string;
        inn: string;
        competencies: any[];
        summary: string;
        created_at: string;
        updated_at: string;
    };
    individual?: {
        uuid: string;
        user_uuid: string;
        name: string;
        surname: string;
        patronymic: string;
        summary: string;
    };
    legal_entity?: {
        uuid: string;
        user_uuid: string;
        title: string;
        inn: string;
        contact_info: string;
        summary: string;
    };
    moderator?: {
        uuid: string;
        user_uuid: string;
        name: string;
        surname: string;
    };
    current: string;
}

export default ($apiClient: AxiosInstance) => ({
    async getRoleByUserUuid(uuid: string): Promise<Role> {
        const response = await $apiClient.get<Role>(`/roles/user/${uuid}`);
        return response.data;
    },
    async getRolesForCurrentUser(): Promise<Role[]> {
        const response = await $apiClient.get<Role[]>('/roles/my');
        return response.data;
    },
    async searchApplicantByFullName(query: string): Promise<Role[]> {
        const response = await $apiClient.get<Role[]>(`/roles/applicant/search`, {
          params: {
            query
          }
        });
        return response.data;
    },
    async getApplicantByUuid(uuid: string): Promise<Applicant> {
        const response = await $apiClient.get<Applicant>(`/roles/applicant/${uuid}`);
        return response.data;
    },
    async updateApplicantByUuid(uuid: string, payload: UpdateApplicantPayload): Promise<Applicant> {
        const response = await $apiClient.put<Applicant>(`/roles/applicant/${uuid}`, payload);
        return response.data;
      }
    
});