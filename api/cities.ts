import { AxiosInstance } from "axios";

export interface City {
    uuid: string;
    title: string;
  }

export default ($apiClient: AxiosInstance) => ({
    async getAllCities(): Promise<City[]> {
        const response = await $apiClient.get<City[]>('/cities');
        return response.data;
    },
    async getCityByName(name: string): Promise<City> {
        const response = await $apiClient.get<City>(`/cities/name/${name}`);
        return response.data;
    },
    async getCityByUuid(uuid: string): Promise<City> {
        const response = await $apiClient.get<City>(`/cities/${uuid}`);
        return response.data;
    },
    async storeCity(name: string): Promise<City> {
        const response = await $apiClient.post<City>(`/cities/store/${name}`);
        return response.data;
    }
})