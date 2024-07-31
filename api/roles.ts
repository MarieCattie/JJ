import { AxiosInstance } from "axios";

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
    
});