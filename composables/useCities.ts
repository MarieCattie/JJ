import type { CitiesResponse } from "~/types/cities";
import { useMyClientFetch } from "~/composables/useMyFetch";

export default function useCities() {
    return {
        async getAll() {
            const response = await useMyClientFetch('cities')
            return response;
        }
    }
}