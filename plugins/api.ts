import { defineNuxtPlugin } from '#app';
import authApi from '~/api/auth';
import userApi from `~/api/user`;
import storageApi from `~/api/storage`;

export default defineNuxtPlugin((nuxtApp) => {
  const { $apiClient } = nuxtApp;

  const api = {
    auth: authApi($apiClient),
    user: userApi($apiClient),
    storage: storageApi($apiClient)

  };

  nuxtApp.provide('api', api);
});