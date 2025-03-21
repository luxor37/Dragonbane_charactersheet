// composables/useGapiClient.ts
import { waitForGapi } from "./useGapiLoader";

let initPromise: Promise<void> | null = null;

export async function initGapiClient(): Promise<void> {
    if (initPromise) {
        return initPromise;
    }
    initPromise = new Promise(async (resolve, reject) => {
        try {
            const gapiInstance = await waitForGapi();
            gapiInstance.load("client:auth2", async () => {
                try {
                    // Get runtime config for the client ID
                    const config = useRuntimeConfig();
                    const clientId = config.public.googleClientId;
                    await gapiInstance.client.init({
                        clientId,
                        scope: "https://www.googleapis.com/auth/drive.file",
                    });
                    // Now explicitly load the Drive API (v3)
                    await gapiInstance.client.load("drive", "v3");
                    resolve();
                } catch (error) {
                    reject(error);
                }
            });
        } catch (err) {
            reject(err);
        }
    });
    return initPromise;
}