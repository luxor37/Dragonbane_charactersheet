// composables/useGapiClient.ts
import { waitForGapi } from "./useGapiLoader";
import { useRuntimeConfig } from "#imports";

let initPromise: Promise<void> | null = null;

export async function initGapiClient(): Promise<void> {
    if (initPromise) return initPromise;

    initPromise = new Promise(async (resolve, reject) => {
        try {
            const gapiInstance = await waitForGapi();
            gapiInstance.load("client", async () => {
                try {
                    const config = useRuntimeConfig();
                    await gapiInstance.client.init({
                        apiKey: config.public.googleApiKey,
                        discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"]
                    });
                    // No OAuth parameters here; OAuth is handled via GIS.
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