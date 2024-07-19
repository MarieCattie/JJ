import { defineNuxtPlugin } from '#app';
import authApi from '~/api/auth';


export default defineNuxtPlugin((nuxtApp) => {
  const { $apiClient } = nuxtApp;

  const api = {
    auth: authApi($apiClient),

  };

  nuxtApp.provide('api', api);
});