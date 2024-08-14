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
import professionalTrialsApi from '~/api/professional_trials';
import professionalTrialCategoriesApi from '~/api/professional_trial_categories';
import articlesApi from '~/api/articles';
import chatApi from '~/api/chat';


export default defineNuxtPlugin((nuxtApp) => {
  const { $apiClient, $chatapiClient } = nuxtApp;

  const api = {
    auth: authApi($apiClient),
    user: userApi($apiClient),
    storage: storageApi($apiClient),
    city: citiesApi($apiClient),
    roles: rolesApi($apiClient),
    competencies: competenciesApi($apiClient),
    vacancies: vacanciesApi($apiClient),
    categories: categoriesApi($apiClient),
    vacancy_responses: vacancyResponses($apiClient),
    professional_trials: professionalTrialsApi($apiClient),
    professional_trial_categories: professionalTrialCategoriesApi($apiClient),
    articles: articlesApi($apiClient),
    chat: chatApi($chatapiClient)
  };

  nuxtApp.provide('api', api);
});