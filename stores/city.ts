import { defineStore } from "pinia";
import { ref } from "vue";
import { useApi } from "~/composables/api";
import { City } from "~/api/cities";

export const useCitiesStore = defineStore('city', () => {
    const cities = ref<City[]>([]);
    const loading = ref(false);
    const error = ref<string | null>(null);

    async function fetchCities() {
        loading.value = true;
        error.value = null;
        try {
            const api = useApi();
            const data = await api.city.getAllCities();
            cities.value = data;
        } catch (err) {
            error.value = 'Failed to fetch cities';
            console.error('Error fetching cities', err);
        } finally {
            loading.value = false;
        }
    }

    async function getCityByName(name: string): Promise<City | null> {
        try {
            const api = useApi();
            const city = await api.city.getCityByName(name);
            return city;
        } catch (err) {
            error.value = 'Failed to fetch city by name';
            console.error('Error fetching city by name', err);
            return null;
        }
    }

    async function getCityByUuid(uuid: string): Promise<City | null> {
        try {
          const api = useApi();
          const city = await api.city.getCityByUuid(uuid);
          return city;
        } catch (err) {
          error.value = 'Failed to fetch city by UUID';
          console.error('Error fetching city by UUID', err);
          return null;
        }
    }

    async function storeCity(name: string) {
        loading.value = true;
        error.value = null;
        try {
          const api = useApi();
          const newCity = await api.city.storeCity(name);
          await fetchCities();
          return newCity;
        } catch (err) {
          error.value = 'Failed to store city';
          console.error('Error storing city', err);
          return null;
        } finally {
          loading.value = false;
        }
    }

    return {
        cities,
        loading,
        error,
        fetchCities,
        getCityByName,
        getCityByUuid,
        storeCity,
    };
}, {
    persist: true
});