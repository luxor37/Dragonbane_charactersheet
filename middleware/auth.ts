export default defineNuxtRouteMiddleware((to, from) => {
    if (import.meta.client) {
        const authStore = useAuthStore();
        const { accessToken, isAuthenticated } = storeToRefs(authStore)
        if (accessToken.value !== null) {
            isAuthenticated.value = true;
        }
    }
});