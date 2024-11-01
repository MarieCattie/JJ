import { defineStore } from "pinia";
import { ref } from "vue";
import { useApi } from "~/composables/api"; // Импортируем ваш API клиент
interface FetchUsersParams {
    page?: number;
    row?: number;
    byDate?: string | null;
    sortByUpdatedAt?: string | null;
    sortByCreatedAt?: string | null;
  }
export const useUserStore = defineStore('user', () => {
    const users = ref<User[]>([]);
    const currentUser = ref<any>(null);
    const loading = ref(false);
    const error = ref<string | null>(null);

    async function fetchUsers({
        page,
        row,
        byDate,
        sortByUpdatedAt,
        sortByCreatedAt
      }: FetchUsersParams = {}) {
        loading.value = true;
        error.value = null;
        try {
            const api = useApi();
            const data = await api.user.getAllUsers(page, row, byDate, sortByUpdatedAt, sortByCreatedAt);
            users.value = data;
        } catch (err) {
            error.value = 'Failed to fetch users';
            console.error('Error fetching users', err);
        } finally {
            loading.value = false;
        }
    }

    async function fetchCurrentUser() {
        try {
            const api = useApi();
            const user = await api.user.getUserByToken();
            currentUser.value = user;
            console.log(user);
        } catch (error) {
            console.error("Ошибка при получении пользователя:", error);
        }
    }

    async function getUserByEmail(email: string) {
        loading.value = true;
        error.value = null;
        try {
            const api = useApi();
            const user = await api.user.getUserByEmail(email);
            return user; // Возвращаем пользователя, не сохраняем в store
        } catch (err) {
            error.value = 'Failed to fetch user by email';
            console.error('Error fetching user by email', err);
            throw err;  // Важно: чтобы внешние вызовы могли обработать ошибку
        } finally {
            loading.value = false;
        }
    }

    async function getUserById(uuid: string) {
        loading.value = true;
        error.value = null;
        try {
            const api = useApi();
            const user = await api.user.getUserById(uuid);
            return user; // Возвращаем пользователя, не сохраняем в store
        } catch (err) {
            error.value = 'Failed to fetch user by ID';
            console.error('Error fetching user by ID', err);
            throw err;  // Важно: чтобы внешние вызовы могли обработать ошибку
        } finally {
            loading.value = false;
        }
    }

    async function uploadUserImage(file: File) {
        loading.value = true;
        error.value = true;
        try {
            const api = useApi();
            const formData = new FormData();
            formData.append('image', file);
            const image = await api.user.uploadUserImage(formData);
            if(image) {
                await fetchCurrentUser()
            }
            
            
        } catch (err) {
            error.value = 'Failed to upload user image';
            console.error('Error uploading user image', err);
        } finally {
            loading.value = false;
        }
    }

    async function changePassword(previous_password: string, new_password: string) {
        try {
            const api = useApi();
            const user = await api.user.changePassword(previous_password, new_password);
            await fetchCurrentUser()
            console.log('Password changed successfully:', user);
        } catch (error) {
            console.error('Error changing password:', error);
        }
    }

    async function changeEmail(email: string, password: string) {
        try {
            const api = useApi();
            const user = await api.user.changeEmail(email, password);
            currentUser.value = user;
            console.log('Email changed successfully:', user);
        } catch (error) {
            console.error('Error changing email:', error);
        }
    }

    async function banUser(uuid: string) {
        try {
            const api = useApi();
            await api.user.banUser(uuid);
            console.log('User banned successfully');
            // Обновление списка пользователей после бана
            await fetchUsers();
        } catch (error) {
            console.error('Error banning user:', error);
        }
    }

    async function unbanUser(uuid: string) {
        try {
            const api = useApi();
            await api.user.unbanUser(uuid);
            console.log('User unbanned successfully');
            // Обновление списка пользователей после разбана
            await fetchUsers();
        } catch (error) {
            console.error('Error unbanning user:', error);
        }
    }

    async function deleteUser(uuid: string) {
        try {
            const api = useApi();
            await api.user.deleteUser(uuid);
            console.log('User deleted successfully');
            // Обновление списка пользователей после удаления
            await fetchUsers();
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    }

    return {
        users,
        currentUser,
        loading,
        error,
        fetchUsers,
        fetchCurrentUser,
        getUserByEmail,
        getUserById,
        uploadUserImage,
        changePassword,
        changeEmail,
        banUser,
        unbanUser,
        deleteUser
    };
}, {
    persist: {
        storage: persistedState.localStorage
    }
});
