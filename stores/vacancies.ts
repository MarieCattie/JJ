import { defineStore } from "pinia";
import { ref } from "vue";
import { useApi } from "~/composables/api";
import { Vacancy, CreateVacancyData, UpdateVacancyData, BanVacancyData, UploadVacancyImageData } from "~/api/vacancies";

export const useVacanciesStore = defineStore('vacancies', () => {
    const vacancies = ref<Vacancy[]>([]);
    const currentUserVacancies = ref<Vacancy[]>([]);
    const loading = ref(false);
    const error = ref<string | null>(null);

    async function fetchVacancies() {
        loading.value = true;
        error.value = null;
        try {
            const api = useApi();
            const data = await api.vacancies.getAllVacancies();
            vacancies.value = data;
        } catch (err) {
            error.value = 'Failed to fetch vacancies';
            console.error('Error fetching vacancies', err);
        } finally {
            loading.value = false;
        }
    }

    async function createVacancy(vacancyData: CreateVacancyData, image: File) {
        loading.value = true;
        error.value = null;
        try {
            const api = useApi();
            const newVacancy = await api.vacancies.createVacancy(vacancyData);
            if (image) {
                await api.vacancies.uploadVacancyImage({ uuid: newVacancy.uuid, image });
            }
            await fetchVacancies();
            return newVacancy;
        } catch (err) {
            error.value = 'Failed to create vacancy';
            console.error('Error creating vacancy', err);
            return null;
        } finally {
            loading.value = false;
        }
    }

    async function updateVacancy(vacancyData: UpdateVacancyData, image?: File) {
        loading.value = true;
        error.value = null;
        try {
            const api = useApi();
            const updatedVacancy = await api.vacancies.updateVacancy(vacancyData);
            if (image) {
                await api.vacancies.uploadVacancyImage({ uuid: updatedVacancy.uuid, image });
            }
            await fetchVacancies();
            return updatedVacancy;
        } catch (err) {
            error.value = 'Failed to update vacancy';
            console.error('Error updating vacancy', err);
            return null;
        } finally {
            loading.value = false;
        }
    }

    async function searchVacancies(params: {
        page?: number;
        row?: number;
        byDate?: string;
        sortByUpdatedAt?: string;
        sortByCreatedAt?: string;
        query?: string;
    }) {
        loading.value = true;
        error.value = null;
        try {
            const api = useApi();
            const data = await api.vacancies.searchVacancies(params);
            vacancies.value = data;
        } catch (err) {
            error.value = 'Failed to search vacancies';
            console.error('Error searching vacancies', err);
        } finally {
            loading.value = false;
        }
    }

    async function fetchCurrentUserVacancies() {
        loading.value = true;
        error.value = null;
        try {
            const api = useApi();
            const data = await api.vacancies.getCurrentUserVacancies();
            currentUserVacancies.value = data;
        } catch (err: any) {
            if (err.response && err.response.status === 401) {
                error.value = 'Unauthorized: You do not have permission to ban this vacancy';
            } else {
                error.value = 'Failed to ban vacancy';
            }
            console.error('Error banning vacancy', err);
            return null;
        } finally {
            loading.value = false;
        }
    }

    async function getVacancyById(uuid: string) {
        loading.value = true;
        error.value = null;
        try {
            const api = useApi();
            const data = await api.vacancies.getVacancyById(uuid);
            return data;
        } catch (err: any) {
            console.log("error")
        } finally {
            loading.value = false;
        }
    }

    async function banVacancy(banData: BanVacancyData) {
        loading.value = true;
        error.value = null;
        try {
            const api = useApi();
            const bannedVacancy = await api.vacancies.banVacancy(banData);
            await fetchVacancies();
            return bannedVacancy;
        } catch (err: any) {
            if (err.response && err.response.status === 401) {
                error.value = 'Unauthorized: You do not have permission to ban this vacancy';
            } else {
                error.value = 'Failed to ban vacancy';
            }
            console.error('Error banning vacancy', err);
            return null;
        } finally {
            loading.value = false;
        }
    }

    async function unbanVacancy(banData: BanVacancyData) {
        loading.value = true;
        error.value = null;
        try {
            const api = useApi();
            const unbannedVacancy = await api.vacancies.unbanVacancy(banData);
            await fetchVacancies();
            return unbannedVacancy;
        } catch (err: any) {
            if (err.response && err.response.status === 401) {
                error.value = 'Unauthorized: You do not have permission to ban this vacancy';
            } else {
                error.value = 'Failed to ban vacancy';
            }
            console.error('Error banning vacancy', err);
            return null;
        } finally {
            loading.value = false;
        }
    }

    async function deleteVacancy(uuid: string) {
        try {
            const api = useApi();
            await api.vacancies.deleteVacancy(uuid);
            await fetchVacancies();
        } catch (error) {
            console.log("Error deleting vacancy", error);
        }
    }

    return {
        vacancies,
        loading,
        error,
        fetchVacancies,
        createVacancy,
        searchVacancies,
        banVacancy,
        unbanVacancy,
        deleteVacancy,
        currentUserVacancies,
        fetchCurrentUserVacancies,
        getVacancyById,
        updateVacancy
    };
}, {
    persist: true
});
