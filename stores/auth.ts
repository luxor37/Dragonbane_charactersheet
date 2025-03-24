export const useAuthStore = defineStore('auth', () => {
    const showAuthModal = ref(false);
    const accessToken = ref<string | null>(null);
    return { showAuthModal, accessToken };
});