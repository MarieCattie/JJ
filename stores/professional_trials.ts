import { defineStore } from "pinia";
import { ref } from "vue";
import { useApi } from "~/composables/api";
import { ProfessionalTrial, UpdateProfessionalTrialData } from "~/api/professional_trials";

export const useProfessionalTrialsStore = defineStore('professional_trials', () => {
    const trials = ref<ProfessionalTrial[]>([]);
    const currentUserTrials = ref<ProfessionalTrial[]>([]);
    const loading = ref(false);
    const error = ref<string | null>(null);

    async function fetchProfessionalTrials(query?: string, row?: number, page?: number) {
        loading.value = true;
        error.value = null;
        try {
            const api = useApi();
            const data = await api.professional_trials.getAllProfessionalTrials(query, row, page);
            trials.value = data;
        } catch (err) {
            error.value = 'Failed to fetch professional trials';
            console.error('Error fetching professional trials', err);
        } finally {
            loading.value = false;
        }
    }

    async function fetchCurrentUserTrials() {
        loading.value = true;
        error.value = null;
        try {
            const api = useApi();
            const data = await api.professional_trials.getCurrentUserTrials();
            currentUserTrials.value = data;
        } catch (err: any) {
            if(err.response && err.response.status === 401) {
                error.value = 'Unauthorized: You do not have permission to ban this vacancy';
            } else {
                error.value = 'Failed to ban vacancy'
            }
            console.error('Error', err);
            return null;
        } finally {
            loading.value = false;
        }
    }

    async function getProfessionalTrialById(uuid: string) {
        loading.value = true;
        error.value = null;
        try {
            const api = useApi();
            const data = await api.professional_trials.getProfessionTrialById(uuid);
            return data;
        } catch (err: any) {
            console.log("error")
        } finally {
            loading.value = false;
        }
    }

    async function addProfessionalTrial(trialData: { category_uuid: string; title: string; place: string; time: string; date: string }, image: File) {
        loading.value = true;
        error.value = null;
        try {
            const api = useApi();
            const newTrial = await api.professional_trials.storeProfessionalTrial(trialData);
            if(image) {
                await api.professional_trials.uploadProfessionalTrialImage({ professional_trial_uuid: newTrial.uuid, image });
            }
            await fetchProfessionalTrials();
            return newTrial;
        } catch (err) {
            error.value = 'Failed to add professional trial';
            console.error('Error adding professional trial', err);
            return null;
        } finally {
            loading.value = false;
        }
    }

    async function updateProfessionalTrial(uuid: string, professionalTrialData: UpdateProfessionalTrialData, image?: File) {
        loading.value = true;
        error.value = null;
        try {
            const api = useApi();
            const updatedProfessionalTrial = await api.professional_trials.updateProfessionalTrial(professionalTrialData);
            if (image) {
                await api.professional_trials.uploadProfessionalTrialImage({uuid: updatedProfessionalTrial.uuid, image});
            }
            await fetchProfessionalTrials();
            return updatedProfessionalTrial;
        } catch (err) {
            error.value = 'Failed to update trial';
            console.error('Error updating vacancy', err);
            return null;
        } finally {
            loading.value = false;
        }
    }

    async function respondToProfessionalTrial(professional_trial_uuid: string) {
        loading.value = true;
        error.value = null;
        try {
            const api = useApi();
            await api.professional_trials.respondToProfessionalTrial({ professional_trial_uuid });
            // Дополнительно можно обновить список откликов или профессиональных проб, если нужно
        } catch (err) {
            error.value = 'Failed to respond to professional trial';
            console.error('Error responding to professional trial', err);
        } finally {
            loading.value = false;
        }
    }

    async function deleteProfessionalTrialResponse(professional_trial_uuid: string) {
        loading.value = true;
        error.value = null;
        try {
            const api = useApi();
            await api.professional_trials.deleteProfessionalTrialResponse({ professional_trial_uuid });
            // Дополнительно можно обновить список откликов или профессиональных проб, если нужно
        } catch (err) {
            error.value = 'Failed to delete response to professional trial';
            console.error('Error deleting response to professional trial', err);
        } finally {
            loading.value = false;
        }
    }

    async function deleteProfessionalTrial(professional_trial_uuid: string) {
        loading.value = true;
        error.value = null;
        try {
            const api = useApi();
            await api.professional_trials.deleteProfessionalTrial({ professional_trial_uuid });
            await fetchProfessionalTrials();
        } catch (err) {
            error.value = 'Failed to delete professional trial';
            console.error('Error deleting professional trial', err);
        } finally {
            loading.value = false;
        }
    }

    return {
        trials,
        loading,
        error,
        fetchProfessionalTrials,
        fetchCurrentUserTrials,
        getProfessionalTrialById,
        addProfessionalTrial,
        respondToProfessionalTrial,
        deleteProfessionalTrialResponse,
        deleteProfessionalTrial
    };
});
