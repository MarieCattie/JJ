import { defineStore } from "pinia";
import { ref } from "vue";
import { useApi } from "~/composables/api"; // Импортируем ваш API клиент

export const useUserStore = defineStore('user', () => {
    const users = ref<User[]>([]);
    const loading = ref(false);
    const error = ref<string | null>(null);

    async function fetchUsers(page?: number, row?: number, byDate?: string | null, sortByUpdatedAt?: string | null, sortByCreatedAt?: string | null) {
        loading.value = true;
        error.value = null;
        try {
            const api = useApi();
            const data = await api.user.getUsers(page, row, byDate, sortByUpdatedAt, sortByCreatedAt);
            users.value = data;
        } catch (err) {
            error.value = 'Failed to fetch users';
            console.error('Error fetching users', err);
        } finally {
            loading.value = false;
        }
    }

    return {
        users,
        loading,
        error,
        fetchUsers
    };
}, {
    persist: true
});
