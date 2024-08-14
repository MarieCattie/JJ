import { defineStore } from "pinia";
import { ref } from "vue";
import { useApi } from "~/composables/api";
import { VacancyResponse, CreateVacancyResponseData } from '@/api/vacancy_responses';
import { useUserStore } from "@/stores/user";

export const useVacancyResponsesStore  = defineStore('vacancy_responses', () => {
    const loading = ref(false);
    const error = ref<string | null>(null);
    const applicantResponses = ref<VacancyResponse[] | [] | null>(null);
    
    async function createVacancyResponse (responseData: CreateVacancyResponseData) {
        const userStore = useUserStore();

        if (!userStore.currentUser || userStore.currentUser.role.current !== 'applicant') {
            throw new Error('Только соискатель может оставлять отклики на вакансии.');
        }

        const api = useApi();
        try {
            loading.value = true;
            error.value = null;
            const newResponse = await api.vacancy_responses.createVacancyResponse(responseData);
            return newResponse;
        } catch (err) {
            error.value = 'Ошибка при создании отклика на вакансию';
            console.error("Ошибка при создании отклика на вакансию:", err);
            throw err;
        } finally {
            loading.value = false;
        }
    };

    async function getResponsesByApplicant (uuid: string) {
        const api = useApi();
        try {
            loading.value = true;
            error.value = null;
            const responses = await api.vacancy_responses.getResponsesByApplicant(uuid);
            applicantResponses.value = responses;
            return responses;
        } catch (err) {
            error.value = 'Ошибка при получении откликов соискателя';
            console.error("Ошибка при получении откликов соискателя:", err);
            throw err;
        } finally {
            loading.value = false;
        }
    };

    async function getResponsesByEmployer (uuid: string) {
        const api = useApi();
        try {
            loading.value = true;
            error.value = null;
            const responses = await api.vacancy_responses.getResponsesByEmployer(uuid);
            return responses;
        } catch (err) {
            error.value = 'Ошибка при получении откликов работодателя';
            console.error("Ошибка при получении откликов работодателя:", err);
            throw err;
        } finally {
            loading.value = false;
        }
    };

    async function getResponsesByVacancy (uuid: string) {
        const api = useApi();
        try {
            loading.value = true;
            error.value = null;
            const responses = await api.vacancy_responses.getResponsesByVacancy(uuid);
            return responses;
        } catch (err) {
            error.value = 'Ошибка при получении откликов на вакансию';
            console.error("Ошибка при получении откликов на вакансию:", err);
            throw err;
        } finally {
            loading.value = false;
        }
    };

    async function getResponseById (uuid: string) {
        const api = useApi();
        try {
            loading.value = true;
            error.value = null;
            const responses= await api.vacancy_responses.getResponseByUuid(uuid);
            return responses;
        } catch (err) {
            error.value = 'Ошибка при получении отклика';
            console.error("Ошибка при получении откликов на вакансию:", err);
        } finally {
            loading.value = false;
        }
    }

    async function deleteResponse(uuid: string) {
        try {
            const api = useApi();
            await api.vacancy_responses.deleteResponse(uuid);
        } catch (error) {
            console.log(error)
        }
    }

    async function selectResponse(responseData: { uuid: string; vacancyUuid: string }) {
        const userStore = useUserStore();

        if (!userStore.currentUser || !userStore.currentUser.role.individual && !userStore.currentUser.role.legal_entity) {
            throw new Error('Только работодатель может выбрать соискателя по отклику.');
        }

        const api = useApi();
        try {
            loading.value = true;
            error.value = null;
            await api.vacancy_responses.selectResponse(responseData);
        } catch (err) {
            error.value = 'Ошибка при выборе соискателя по отклику';
            console.error("Ошибка при выборе соискателя по отклику:", err);
            throw err;
        } finally {
            loading.value = false;
        }
    };


    return {
        createVacancyResponse,
        getResponsesByApplicant,
        getResponsesByEmployer,
        getResponsesByVacancy,
        getResponseById,
        deleteResponse,
        selectResponse,
        loading,
        applicantResponses,
        error
    };
})