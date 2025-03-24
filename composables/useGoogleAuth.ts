export function useGoogleAuth() {
    const isAuthenticated = ref(false);
    let tokenClient: google.accounts.oauth2.TokenClient | null = null;

    const authStore = useAuthStore()
    const { showAuthModal, accessToken } = storeToRefs(authStore)

    // Initialize the token client (runs only once)
    const initTokenClient = () => {
        const config = useRuntimeConfig();
        tokenClient = google.accounts.oauth2.initTokenClient({
            client_id: config.public.googleClientId,
            scope: 'https://www.googleapis.com/auth/drive.file',
            callback: (response: any) => {
                if (response.error) {
                    console.error('Error obtaining token:', response);
                    return;
                }
                accessToken.value = response.access_token;
                isAuthenticated.value = true;
                showAuthModal.value = false
            },
        });
    };

    const signIn = async () => {
        if (!tokenClient) {
            initTokenClient();
        }
        tokenClient!.requestAccessToken();
    };

    const signOut = async () => {
        // The new library doesn’t offer a built‑in sign‑out; clear your stored token instead.
        accessToken.value = null;
        isAuthenticated.value = false;
    };

    return { isAuthenticated, accessToken, signIn, signOut };
}