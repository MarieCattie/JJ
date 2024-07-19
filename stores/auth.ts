import { defineStore } from "pinia";
import { ref } from "vue";
import {useApi} from "~/composables/api";
import { useUserStore } from "~/stores/user";

export const useAuthStore = defineStore('auth', () => {
  
  const token = ref<string | null>(null);
  const refreshToken = ref<string | null>(null);
  const userStore = useUserStore();

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
    } catch (error) {
      console.error('Error signing in', error);
      throw error;
    }
  }

  async function logout() {
    try {
      const api = useApi();
      await api.auth.logout(); // Assuming logout() is a function that sends a POST request to /auth/logout
      token.value = null;
      refreshToken.value = null;
    } catch (error) {
      console.error('Error logging out', error);
      throw error;
    }
  }

  return {
    token,
    refresh,
    signIn,
    refreshToken,
    logout
  }
}, {
  persist: true
})
