import { defineStore } from "pinia";
import { ref } from "vue";
import { useApi } from "~/composables/api";
import { useUserStore } from "~/stores/user";
import { useRoleStore } from "~/stores/roles";

export const useAuthStore = defineStore('auth', () => {

  const token = ref<string | null>(null);
  const refreshToken = ref<string | null>(null);
  const errorMessage = ref<string | null>(null);
  const userStore = useUserStore();
  const roleStore = useRoleStore();

  const isAuthenticated = computed(() => token.value !== null);

  const isApplicant = computed(() => token.value !== null && userStore.currentUser.role.current === 'applicant');

  const isEmployer = computed(() => token.value !== null && (userStore.currentUser.role.current === 'individual' || userStore.currentUser.role.current === 'legal_entity'));

  async function refresh() {
    try {
      const api = useApi()
      const data = await api.auth.refresh(token.value, refreshToken.value);
      if (data.access_token) {
        token.value = data.access_token;
      }
      if (data.refresh_token) {
        refreshToken.value = data.refresh_token;
      }
    } catch (error) {
      console.error('Error refreshing token', error);
      if ((error as any).response?.status === 403) {
        console.warn('Refresh token has expired or invalid');
      }
    }
  }

  async function signIn(email: string, password: string) {
    try {
      const api = useApi()
      const data = await api.auth.signIn(email, password);
      token.value = data.access_token;
      refreshToken.value = data.refresh_token;
      await userStore.fetchCurrentUser();
      errorMessage.value = null; // Сброс ошибки при успешной авторизации
      await roleStore.fetchRolesForCurrentUser();
      userStore.currentUser = { ...userStore.currentUser, ...roleStore.rolesByCurrentUser[roleStore.rolesByCurrentUser?.current] }
    } catch (error: any) {
      console.error('Error signing in', error);
      // Обработка ошибок с учетом строки или массива
      const serverMessage = error.response?.data?.message;
      if (serverMessage) {
        if (Array.isArray(serverMessage)) {
          // Если это массив, объединяем его элементы в одну строку
          errorMessage.value = serverMessage.join('. ');
        } else {
          // Если это строка
          errorMessage.value = serverMessage;
        }
      } else {
        errorMessage.value = 'Произошла ошибка при входе в систему. Пожалуйста, попробуйте еще раз.';
      }
    }
  }

  async function signUp(email: string, password: string, cityUuid: string) {
    try {
      const api = useApi();
      const data = await api.auth.signUp(email, password, cityUuid);
      token.value = data.access_token;
      refreshToken.value = data.refresh_token;
      errorMessage.value = null; // Сброс ошибки при успешной регистрации
    } catch (error: any) {
      console.error('Error signing up', error);
      const serverMessage = error.response?.data?.message;
      if (serverMessage) {
        if (Array.isArray(serverMessage)) {
          errorMessage.value = serverMessage.join('. ');
        } else {
          errorMessage.value = serverMessage;
        }
      } else {
        errorMessage.value = 'Произошла ошибка при регистрации. Пожалуйста, попробуйте еще раз.';
      }

      throw error; // Перебрасываем ошибку для дальнейшей обработки
    }
  }

  async function logout() {
    try {
      token.value = null;
      refreshToken.value = null;
      userStore.currentUser = null;
      localStorage.removeItem('auth');
      localStorage.removeItem('roles');
      localStorage.removeItem('user');
      const api = useApi();
      await api.auth.logout(); // Assuming logout() is a function that sends a POST request to /auth/logout
    } catch (error) {
      console.error('Error logging out', error);
      throw error;
    }
  }

  return {
    token,
    refresh,
    signIn,
    signUp,
    refreshToken,
    logout,
    isAuthenticated,
    isApplicant,
    isEmployer,
    errorMessage
  }
}, {
  persist: true
})
