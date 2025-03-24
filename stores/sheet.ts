// stores/sheet.ts
import { defaultCharacter, type Character } from "~/types/sheet";
import { defineStore } from "pinia";
import { ref, watch } from "vue";

export const useSheetStore = defineStore("sheet", () => {
    const character = ref<Character>(defaultCharacter);
    const fileId = ref<string | null>(null);

    const loadCharacterFromLocalStorage = () => {
        try {
            const savedCharacter = localStorage.getItem("character");
            if (savedCharacter) {
                character.value = JSON.parse(savedCharacter);
            }
        } catch (err) {
            console.error("Error loading character from local storage:", err);
        }
    };

    watch(
        character,
        (newCharacter) => {
            try {
                localStorage.setItem("character", JSON.stringify(newCharacter));
            } catch (err) {
                console.error("Error saving character to local storage:", err);
            }
        },
        { deep: true }
    );

    const resetCharacter = () => {
        character.value = JSON.parse(JSON.stringify(defaultCharacter));
        fileId.value = null;
    };

    const importData = (file: File) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            if (e.target?.result) {
                try {
                    const data = JSON.parse(e.target.result as string);
                    character.value = data;
                } catch (err) {
                    console.error("Invalid JSON file");
                    alert("The imported file is not valid JSON.");
                }
            }
        };
        reader.readAsText(file);
    };

    const exportData = () => {
        const json = JSON.stringify(character.value, null, 2);
        const blob = new Blob([json], { type: "application/json" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = `${character.value.name}.dragonbane.json` || "character.dragonbane.json";
        link.click();
    };

    // New action to set the character directly (when loading from Drive)
    const setCharacter = (data: Character) => {
        character.value = data;
    };

    return {
        character,
        fileId,
        resetCharacter,
        importData,
        exportData,
        loadCharacterFromLocalStorage,
        setCharacter,
    };
});