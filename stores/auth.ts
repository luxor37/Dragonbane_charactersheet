export const useAuthStore = defineStore('auth',
    () => {
        const isAuthenticated = ref(false);
        const accessToken = ref<string | null>(null);
        return { isAuthenticated, accessToken };
    },
    {
        persist: {
            storage: piniaPluginPersistedstate.localStorage(),
        },
    }
);