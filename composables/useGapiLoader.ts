// composables/useGapiLoader.ts
export function waitForGapi(): Promise<typeof gapi> {
    return new Promise((resolve, reject) => {
        const checkGapi = () => {
            if (typeof gapi !== 'undefined') {
                resolve(gapi);
            }
        };

        // Check immediately
        checkGapi();

        // Poll every 50ms until gapi is available
        const interval = setInterval(() => {
            if (typeof gapi !== 'undefined') {
                clearInterval(interval);
                resolve(gapi);
            }
        }, 50);

        // Optionally, reject after a timeout (e.g., 10 seconds)
        setTimeout(() => {
            clearInterval(interval);
            if (typeof gapi === 'undefined') {
                reject(new Error("gapi did not load in time"));
            }
        }, 10000);
    });
}