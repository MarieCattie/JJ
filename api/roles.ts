import { AxiosInstance } from "axios";

export interface LegalEntity {
    uuid: string;
    user_uuid: string;
    title: string;
    inn: string;
    contact_info: string;
    summary: string;
}

export interface UpdateLegalEntityPayload {
    title: string;
    inn: string;
    contact_info: string;
    summary: string;
  }

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

export interface Individual {
    uuid: string;
    user_uuid: string;
    name: string;
    surname: string;
    patronymic: string;
    summary: string;
  }

export interface UpdateApplicantPayload {
    name: string;
    surname: string;
    patronymic: string;
    birthday: string;
    study_place: string;
    inn: string;
    competencies_titles: string[];
    summary: string;
    created_at?: string;
    updated_at?: string;
}

export interface UpdateIndividualPayload {
    name: string;
    surname: string;
    patronymic: string;
    summary: string;
} 

export interface Moderator {
    uuid: string;
    user_uuid: string;
    name: string;
    surname: string;
}

export interface UpdateModeratorPayload {
    name: string;
    surname: string;
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

export interface ChangeUserRolePayload {
    role: 'applicant' | 'individual' | 'legal_entity' | 'moderator';
}

export interface UserRoleResponse {
    uuid: string;
    current: 'applicant' | 'individual' | 'legal_entity' | 'moderator';
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
    },
    async getIndividualByUuid(uuid: string): Promise<Individual> {
        const response = await $apiClient.get<Individual>(`/roles/individual/${uuid}`);
        return response.data;
    },
    async updateIndividualByUuid(uuid: string, payload: UpdateIndividualPayload): Promise<Individual> {
        const response = await $apiClient.put<Individual>(`/roles/individual/${uuid}`, payload);
        return response.data;
    },
    async getLegalEntityByUuid(uuid: string): Promise<LegalEntity> {
        const response = await $apiClient.get<LegalEntity>(`/roles/legal-entity/${uuid}`);
        return response.data;
    },
    async updateLegalEntityByUuid(uuid: string, payload: UpdateLegalEntityPayload): Promise<LegalEntity> {
        const response = await $apiClient.put<LegalEntity>(`/roles/legal-entity/${uuid}`, payload);
        return response.data;
    },
    async getModeratorByUuid(uuid: string): Promise<Moderator> {
        const response = await $apiClient.get<Moderator>(`/roles/moderator/${uuid}`);
        return response.data;
    },
    async updateModeratorByUuid(uuid: string, payload: UpdateModeratorPayload): Promise<Moderator> {
        const response = await $apiClient.put<Moderator>(`/roles/moderator/${uuid}`, payload);
        return response.data;
    },
    async changeCurrentUserRole(payload: ChangeUserRolePayload): Promise<UserRoleResponse> {
        const response = await $apiClient.put<UserRoleResponse>('/roles/change', payload);
        return response.data;
    }, 
    async getRolesByUuid(uuid: string): Promise<Role> {
        const response = await $apiClient.get<Role>(`/roles/${uuid}`);
        return response.data;
    }
});