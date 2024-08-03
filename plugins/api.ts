import { defineNuxtPlugin } from '#app';
import authApi from '~/api/auth';
import userApi from '~/api/user';
import storageApi from '~/api/storage';
import citiesApi from '~/api/cities';
import rolesApi from '~/api/roles';
import competenciesApi from '~/api/competencies';
import vacanciesApi from '~/api/vacancies';
import categoriesApi from '~/api/categories';
import vacancyResponses from '~/api/vacancy_responses';


export default defineNuxtPlugin((nuxtApp) => {
  const { $apiClient } = nuxtApp;

  const api = {
    auth: authApi($apiClient),
    user: userApi($apiClient),
    storage: storageApi($apiClient),
    city: citiesApi($apiClient),
    roles: rolesApi($apiClient),
    competencies: competenciesApi($apiClient),
    vacancies: vacanciesApi($apiClient),
    categories: categoriesApi($apiClient),
    vacancy_responses: vacancyResponses($apiClient)
  };

  nuxtApp.provide('api', api);
});