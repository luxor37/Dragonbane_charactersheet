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

        // Build file metadata
        const fileMetadata = {
            name: `${characterData.name || "character"}.dragonborn.json`,
            mimeType: "application/json",
        };

        // Convert character data to JSON string.
        const fileContent = JSON.stringify(characterData, null, 2);
        const media = {
            mimeType: "application/json",
            body: fileContent,
        };
        console.log(media)
        try {
            const response = await gapiInstance.client.drive.files.create({
                resource: fileMetadata,
                media: media,
                fields: "id",
                name: fileMetadata.name,
                contentHints: {
                    thumbnail: {
                        mimeType: 'application/json'
                    }
                },
                params: { uploadType: "media" }
            });
            console.log("File created with ID:", response.result.id);
            return response.result.id;
        } catch (error) {
            console.error("Error creating file:", error);
            return undefined;
        }
    };

    const updateCharacterFile = async (
        fileId: string,
        characterData: Character
    ): Promise<any> => {
        await initGapiClient();
        const gapiInstance = await waitForGapi();

        if (!accessToken.value) {
            throw new Error("User is not authenticated");
        }
        gapiInstance.client.setToken({ access_token: accessToken.value });

        const fileContent = JSON.stringify(characterData, null, 2);
        const media = {
            mimeType: "application/json",
            body: fileContent,
        };

        try {
            const response = await gapiInstance.client.drive.files.update({
                fileId,
                media: media,
                params: { uploadType: "multipart" }
            });
            console.log("File updated:", response);
            return response;
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
        const query = "name contains '.dragonborn.json'";
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