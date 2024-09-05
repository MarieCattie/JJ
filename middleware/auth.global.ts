import { storeToRefs } from "pinia";
import { useAuthStore } from '~/stores/auth';
import { useRouter } from "vue-router";

export default defineNuxtRouteMiddleware(async (to, from, next) => {
    const authStore = useAuthStore();
    const router = useRouter();
    const { token, refreshToken, isAuthenticated } = storeToRefs(authStore);

    const restrictedPages = ['/profile', '/settings1', '/user1/', '/test1'];
    const restrictedPagesForAuthorized = ['/login', '/register/'];

    const isRestrictedPage = restrictedPages.some((page) => to.path.startsWith(page));
    const isRestrictedPageForAuthorized = restrictedPagesForAuthorized.some((page) => to.path.startsWith(page));

    if (isRestrictedPage && !authStore.token) {
        await router.push('/login');
        return;
    }

    if (isRestrictedPageForAuthorized && authStore.token) {
        await router.push('/profile');
        return;
    }
    

});
