import { defineStore } from "pinia";
import { ref } from "vue";
import { useApi } from "~/composables/api";
import { Competency } from "~/api/competencies";

export const useCompetenciesStore = defineStore('competencies', () => {
    const competencies = ref<Competency[]>([]);
    const loading = ref(false);
    const error = ref<string | null>(null);

    async function fetchCompetencies() {
        loading.value = true;
        error.value = null;
        try {
            const api = useApi();
            const data = await api.competencies.getAllCompetencies();
            competencies.value = data;
        } catch (err) {
            error.value = 'Failed to fetch cities';
            console.error('Error fetching cities', err);
        } finally {
            loading.value = false;
        }
    }

    async function getCompetencyByName(title: string) {
        loading.value = true;
        error.value = null;
        try {
            const api = useApi();
            const data = await api.competencies.getCompetencyByName(title);
            return data;
        } catch (err) {
            error.value = 'Failed to fetch cities';
            console.error('Error fetching cities', err);
        } finally {
            loading.value = false;
        }
    }

    async function getCompetencyById(uuid: string) {
        loading.value = true;
        error.value = null;
        try {
            const api = useApi();
            const data = await api.competencies.getCompetencyById(uuid);
            return data;
        } catch (err) {
            error.value = 'Failed to fetch cities';
            console.error('Error fetching cities', err);
        } finally {
            loading.value = false;
        }
    }

    async function deleteCompetency(uuid: string) {
        try {
            const api = useApi();
            await api.competencies.deleteCompetency(uuid);
            await fetchCompetencies();
        } catch (error) {
            console.log("Ошибка удаления компетенции")
        }
    }

    async function storeCompetency(title: string) {
        loading.value = true;
        error.value = null;
        try {
          const api = useApi();
          const newCompetency = await api.competencies.storeCompetency(title);
          await fetchCompetencies();
          return newCompetency;
        } catch (err) {
          error.value = 'Failed to store city';
          console.error('Error storing city', err);
          return null;
        } finally {
          loading.value = false;
        }
    }

    
    return {
        competencies,
        loading,
        error,
        fetchCompetencies,
        getCompetencyByName,
        getCompetencyById,
        deleteCompetency,
        storeCompetency
    };
}, {
    persist: true
});