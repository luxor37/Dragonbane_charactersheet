// composables/useDriveApi.ts
import type { Character } from "~/types/sheet";
import { waitForGapi } from "./useGapiLoader";
import { initGapiClient } from "./useGapiClient";
import { useGoogleAuth } from "./useGoogleAuth";

export function useDriveApi() {
    const { accessToken } = useGoogleAuth();

    const createCharacterFile = async (
        characterData: Character
    ): Promise<string | undefined> => {
        await initGapiClient();
        const gapiInstance = await waitForGapi();

        if (!accessToken.value) {
            throw new Error("User is not authenticated");
        }

        // Set the OAuth token on the gapi client for authorization.
        gapiInstance.client.setToken({ access_token: accessToken.value });

        // Convert character data to a JSON string and create a Blob.
        const fileContent = JSON.stringify(characterData, null, 2);
        const fileBlob = new Blob([fileContent], { type: "application/json" });

        // Define file metadata.
        const metadata = {
            name: `${characterData.name || 'character'}.dragonbane.json`,
            mimeType: "application/json",
        };

        // Build the multipart form data.
        const formData = new FormData();
        formData.append(
            "metadata",
            new Blob([JSON.stringify(metadata)], { type: "application/json" })
        );
        formData.append("file", fileBlob);

        try {
            const response = await fetch(
                "https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&supportsAllDrives=true",
                {
                    method: "POST",
                    headers: new Headers({
                        Authorization: "Bearer " + gapiInstance.auth.getToken().access_token,
                    }),
                    body: formData,
                }
            );

            const jsonResponse = await response.json();
            console.log("File created:", jsonResponse);
            return jsonResponse.id;
        } catch (error) {
            console.error("Error creating file:", error);
            return undefined;
        }
    };

    const updateCharacterFile = async (
        fileId: string,
        characterData: Character
    ): Promise<string | undefined> => {
        await initGapiClient();
        const gapiInstance = await waitForGapi();

        if (!accessToken.value) {
            throw new Error("User is not authenticated");
        }
        gapiInstance.client.setToken({ access_token: accessToken.value });

        // Convert character data to a JSON string and create a Blob.
        const fileContent = JSON.stringify(characterData, null, 2);
        const fileBlob = new Blob([fileContent], { type: "application/json" });

        // Define file metadata.
        const metadata = {
            name: `${characterData.name || "character"}.dragonbane.json`,
            mimeType: "application/json",
        };

        // Build the multipart form data.
        const formData = new FormData();
        formData.append(
            "metadata",
            new Blob([JSON.stringify(metadata)], { type: "application/json" })
        );
        formData.append("file", fileBlob);

        try {
            const response = await fetch(
                `https://www.googleapis.com/upload/drive/v3/files/${fileId}?uploadType=multipart&supportsAllDrives=true`,
                {
                    method: "PATCH", // Use PATCH to update the file.
                    headers: new Headers({
                        Authorization:
                            "Bearer " + gapiInstance.auth.getToken().access_token,
                    }),
                    body: formData,
                }
            );

            const jsonResponse = await response.json();
            console.log("File updated:", jsonResponse);
            return jsonResponse.id;
        } catch (error) {
            console.error("Error updating file:", error);
            return undefined;
        }
    };

    const listCharacterFiles = async (): Promise<
        Array<{ id: string; name: string }> | undefined
    > => {
        await initGapiClient();
        const gapiInstance = await waitForGapi();

        if (!accessToken.value) {
            throw new Error("User is not authenticated");
        }
        gapiInstance.client.setToken({ access_token: accessToken.value });
        const query = "name contains '.dragonbane.json' and trashed = false";
        try {
            const response = await gapiInstance.client.drive.files.list({
                q: query,
                fields: "files(id, name)",
            });
            return response.result.files;
        } catch (error) {
            console.error("Error listing files:", error);
            return undefined;
        }
    };

    const readCharacterFile = async (
        fileId: string
    ): Promise<Character | undefined> => {
        await initGapiClient();
        const gapiInstance = await waitForGapi();

        if (!accessToken.value) {
            throw new Error("User is not authenticated");
        }
        gapiInstance.client.setToken({ access_token: accessToken.value });
        try {
            const response = await gapiInstance.client.drive.files.get({
                fileId,
                alt: "media",
            });
            console.warn("LOADED", response)
            const content = response.body;
            return JSON.parse(content) as Character;
        } catch (error) {
            console.error("Error reading file:", error);
            return undefined;
        }
    };

    return {
        createCharacterFile,
        updateCharacterFile,
        listCharacterFiles,
        readCharacterFile,
    };
}