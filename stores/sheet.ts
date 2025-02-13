import { defineStore } from "pinia";
import { ref, watch } from "vue";
import type { Character } from "~/types/sheet";

const defaultCharacter: Character = {
    name: "",
    profession: "Hunter",
    kin: "Human",
    age: "Adult",
    weakness: "",
    appearance: "",
    stats: {
        strenght: 0,
        constitution: 0,
        agility: 0,
        intelligence: 0,
        willpower: 0,
        charisma: 0,
    },
    conditions: {
        exhausted: false,
        sickly: false,
        dazed: false,
        angry: false,
        scared: false,
        disheartened: false,
    },
    damage_bonus: {
        strenght: 0,
        agility: 0,
    },
    movement: 0,
    encumbrance_limit: 0,
    skills: {
        utility: {
            acrobatics: {
                check: 0,
                upgrade: false
            },
            awareness: {
                check: 0,
                upgrade: false
            },
            bartering: {
                check: 0,
                upgrade: false
            },
            beast_lore: {
                check: 0,
                upgrade: false
            },
            bluffing: {
                check: 0,
                upgrade: false
            },
            bushcraft: {
                check: 0,
                upgrade: false
            },
            crafting: {
                check: 0,
                upgrade: false
            },
            evade: {
                check: 0,
                upgrade: false
            },
            healing: {
                check: 0,
                upgrade: false
            },
            hunting_fishing: {
                check: 0,
                upgrade: false
            },
            languages: {
                check: 0,
                upgrade: false
            },
            myths_legends: {
                check: 0,
                upgrade: false
            },
            performance: {
                check: 0,
                upgrade: false
            },
            persuasion: {
                check: 0,
                upgrade: false
            },
            riding: {
                check: 0,
                upgrade: false
            },
            seamanship: {
                check: 0,
                upgrade: false
            },
            sleight_of_hand: {
                check: 0,
                upgrade: false
            },
            sneaking: {
                check: 0,
                upgrade: false
            },
            spot_hidden: {
                check: 0,
                upgrade: false
            },
            swimming: {
                check: 0,
                upgrade: false
            },
        },
        weapons: {
            axes: {
                check: 0,
                upgrade: false
            },
            bows: {
                check: 0,
                upgrade: false
            },
            brawling: {
                check: 0,
                upgrade: false
            },
            crossbows: {
                check: 0,
                upgrade: false
            },
            hammers: {
                check: 0,
                upgrade: false
            },
            knives: {
                check: 0,
                upgrade: false
            },
            slings: {
                check: 0,
                upgrade: false
            },
            spears: {
                check: 0,
                upgrade: false
            },
            staves: {
                check: 0,
                upgrade: false
            },
            swords: {
                check: 0,
                upgrade: false
            },
        },
        secondary: [],
    },
    inventory: [],
    mementos: [],
    tiny_items: [],
    money: {
        gold: 0,
        silver: 0,
        copper: 0,
    },
    equipment: {
        armor: {
            armor_rating: 0,
            name: "",
            bane: {
                sneaking: false,
                evade: false,
                acrobatics: false,
            },
        },
        helmet: {
            armor_rating: 0,
            name: "",
            bane: {
                awareness: false,
                ranged_attacks: false,
            },
        },
        weapons: [],
    },
    willpower: {
        total: 0,
        used: 0,
    },
    health: {
        total: 0,
        used: 0,
        death_rolls: {
            successess: 0,
            failures: 0,
        },
    },
    rests: {
        round: false,
        stretch: false,
    },
    abilities: [],
    spells: [],
    notes: [],
    companions: [],
}

export const useSheetStore = defineStore("sheet", () => {
    const character = ref<Character>(defaultCharacter);

    // Load character from local storage on initialization
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

    // Automatically save character to local storage on changes
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
        character.value = JSON.parse(
            JSON.stringify(defaultCharacter)
        );
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
        link.download = `${character.value.name}.json` || "character.json";
        link.click();
    };

    // Load character from local storage when the store initializes
    loadCharacterFromLocalStorage();

    return {
        character,
        resetCharacter,
        importData,
        exportData,
        loadCharacterFromLocalStorage,
    };
});
