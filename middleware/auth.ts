export default defineNuxtRouteMiddleware((to, from) => {
    if (import.meta.client) {
        const { isAuthenticated } = useGoogleAuth();
        const authStore = useAuthStore();
        const { showAuthModal } = storeToRefs(authStore)
        if (!isAuthenticated.value) {
            showAuthModal.value = true;
        }
    }
});