import { AxiosInstance } from "axios";

interface City {
    uuid: string;
    title: string;
}

interface Applicant {
    uuid: string;
    user_uuid: string;
    name: string;
    surname: string;
    birthday: string;
    study_place: string;
    inn: string;
    competitions: string;
    summary: string;
    created_at: string;
    updated_at: string;
}

interface Individual {
    uuid: string;
    user_uuid: string;
    name: string;
    surname: string;
    patronymic: string;
    summary: string;
}

interface LegalEntity {
    uuid: string;
    user_uuid: string;
    title: string;
    inn: string;
    contact_info: string;
    summary: string;
}

interface Moderator {
    uuid: string;
    user_uuid: string;
    name: string;
    surname: string;
}

interface Role {
    uuid: string;
    applicant?: Applicant;
    individual?: Individual;
    legal_entity?: LegalEntity;
    moderator?: Moderator;
    current: string;
}

interface User {
    uuid: string;
    email: string;
    password: string;
    image: string;
    city: City;
    role: Role;
    created_at: string;
    updated_at: string;
    banned: boolean;
    deleted: boolean;
    hashedRefreshToken: string;
}

interface UserResponse extends Array<User> {}

export default ($apiClient: AxiosInstance) => ({
    async getAllUsers(page?: number, row?: number, byDate?: string, sortByUpdatedAt?: string, sortByCreatedAt?: string): Promise<UserResponse> {
        const params = {
            page,
            row,
            byDate,
            sortByUpdatedAt,
            sortByCreatedAt
        };

        const response = await $apiClient.get<UserResponse>('/users', { params });
        return response.data;
    },

    async getUserByToken(): Promise<User> {
        const response = await $apiClient.get<any>('/users/my');
        return response.data;
    },

    async getUserByEmail(email: string): Promise<User> {
        const response = await $apiClient.get<User>(`/users/email/${email}`);
        return response.data;
    },

    async getUserById(uuid: string): Promise<User> {
        const response = await $apiClient.get<User>(`/users/${uuid}`);
        return response.data;
    },

    async uploadUserImage(formData: FormData): Promise<void> {
        const response = await $apiClient.post('/users/uploadImage', formData, {
            headers: {
                ...$apiClient.defaults.headers,
                "Content-Type": "multipart/form-data",
            }
        });
        return response.data;
    },

    async changePassword(previous_password: string, new_password: string): Promise<User> {
        const response = await $apiClient.post<User>('/users/changePassword', {
            previous_password,
            new_password
        });
        return response.data;
    }
    
});