import { defineNuxtPlugin } from '#app';
import authApi from '~/api/auth';
import userApi from `~/api/user`;
import storageApi from `~/api/storage`;
import citiesApi from `~/api/cities`;
import rolesApi from `~/api/roles`;
import competenciesApi from `~/api/competencies`;
import vacanciesApi from '~/api/vacancies';

export default defineNuxtPlugin((nuxtApp) => {
  const { $apiClient } = nuxtApp;

  const api = {
    auth: authApi($apiClient),
    user: userApi($apiClient),
    storage: storageApi($apiClient),
    city: citiesApi($apiClient),
    roles: rolesApi($apiClient),
    competencies: competenciesApi($apiClient),
    vacancies: vacanciesApi($apiClient)
  };

  nuxtApp.provide('api', api);
});