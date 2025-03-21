// composables/useDriveApi.ts
import type { Character } from "~/types/sheet";
import { waitForGapi } from "./useGapiLoader";
import { initGapiClient } from "./useGapiClient";

export function useDriveApi() {
    const createCharacterFile = async (
        characterData: Character
    ): Promise<string | undefined> => {
        await initGapiClient();
        const gapiInstance = await waitForGapi();
        const fileMetadata = {
            name: `${characterData.name || "character"}.dragonborn.json`,
            mimeType: "application/json",
        };

        const media = {
            mimeType: "application/json",
            body: JSON.stringify(characterData, null, 2),
        };

        try {
            const response = await gapiInstance.client.drive.files.create({
                resource: fileMetadata,
                media: media,
                fields: "id",
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
        const media = {
            mimeType: "application/json",
            body: JSON.stringify(characterData, null, 2),
        };

        try {
            const response = await gapiInstance.client.drive.files.update({
                fileId,
                media: media,
            });
            console.log("File updated:", response);
            return response;
        } catch (error) {
            console.error("Error updating file:", error);
            return undefined;
        }
    };

    const listCharacterFiles = async (): Promise<Array<{ id: string; name: string }> | undefined> => {
        await initGapiClient();
        const gapiInstance = await waitForGapi();
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

    return { createCharacterFile, updateCharacterFile, listCharacterFiles, readCharacterFile };
}