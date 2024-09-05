import { storeToRefs } from "pinia";
import { useAuthStore } from '~/stores/auth';

export default defineNuxtRouteMiddleware((to) => {
    const authStore = useAuthStore();
    const { token, refreshToken, isAuthenticated } = storeToRefs(authStore);

    //Список страниц, которые требуют авторизации
    const restrictedPages = ['/profile', '/settings1', '/user1/', '/test1'];

    const isRestrictedPage = restrictedPages.some((page) => to.path.startsWith(page));

    if(isRestrictedPage && !authStore.token) {
        abortNavigation();
        return navigateTo('/login');
    }
})