export interface UserProfile {
    getId: () => string;
    getName: () => string;
    getEmail: () => string;
    getImageUrl: () => string;
}

export function useGoogleAuth() {
    const isAuthenticated = ref<boolean>(false);
    const userProfile = ref<UserProfile | null>(null);
    const authStore = useAuthStore();

    const signIn = async (): Promise<void> => {
        try {
            await initGapiClient();
            const gapiInstance = await waitForGapi();
            const GoogleAuth: gapi.auth2.GoogleAuth = gapiInstance.auth2.getAuthInstance();
            const user: gapi.auth2.GoogleUser = await GoogleAuth.signIn();
            isAuthenticated.value = true;
            userProfile.value = user.getBasicProfile();
            // Hide the modal on successful sign-in
            authStore.showAuthModal = false;
        } catch (error) {
            console.error("Error during sign-in:", error);
        }
    };

    const signOut = async (): Promise<void> => {
        try {
            await initGapiClient();
            const gapiInstance = await waitForGapi();
            const GoogleAuth: gapi.auth2.GoogleAuth = gapiInstance.auth2.getAuthInstance();
            await GoogleAuth.signOut();
            isAuthenticated.value = false;
            userProfile.value = null;
            // Optionally re-show the modal when signed out
            authStore.showAuthModal = true;
        } catch (error) {
            console.error("Error during sign-out:", error);
        }
    };

    return { isAuthenticated, userProfile, signIn, signOut };
}