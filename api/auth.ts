import { AxiosInstance } from "axios";

interface TokenResponse {
    access_token: string;
    refresh_token: string;
}

export default ($apiClient: AxiosInstance) => ({
    async refresh(accessToken: string | null, refreshToken: string | null): Promise<TokenResponse> {
        const response = await $apiClient.post<TokenResponse>('auth/refresh', {
            access_token: accessToken,
            refresh_token: refreshToken
        });
        return response.data;
    },
    async signIn(email: string, password: string): Promise<TokenResponse> {
        const response = await $apiClient.post<TokenResponse>('auth/local/signin', {
            email: email,
            password: password
        });
        return response.data;
    },
    async signUp(email: string, password: string, cityUuid: string): Promise<TokenResponse> {
        const response = await $apiClient.post<TokenResponse>('auth/local/signup', {
            email: email,
            password: password,
            city_uuid: cityUuid
        });
        return response.data;
    },
    async logout(): Promise<void> {
        await $apiClient.post('auth/logout');
    },
})