// plugins/apiClient.ts
import { defineNuxtPlugin } from '#app';
import axios from 'axios';
import { useAuthStore } from '~/stores/auth';

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();
  const authStore = useAuthStore();

  const apiClient = axios.create({
    baseURL: config.public.backendAddress,
  });

  // Request interceptor
  apiClient.interceptors.request.use(
    (config) => {
      if (authStore.token) {
        config.headers.Authorization = `Bearer ${authStore.token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Response interceptor
  apiClient.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      if (
        error.response &&
        (error.response.status === 401 || error.response.status === 409) &&
        !originalRequest._retry
      ) {
        originalRequest._retry = true;
        await authStore.refresh();
        originalRequest.headers.Authorization = `Bearer ${authStore.token}`;
        return apiClient(originalRequest);
      }

      return Promise.reject(error);
    }
  );

  // Make apiClient available in Nuxt context
  nuxtApp.provide('apiClient', apiClient);
});
