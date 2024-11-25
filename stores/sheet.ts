import { defineStore } from "pinia";
import { ref, watch } from "vue";
import type { Character } from "~/types/sheet";

export const useSheetStore = defineStore("sheet", () => {
    const character = ref<Character>({
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
                acrobatics: 0,
                awareness: 0,
                bartering: 0,
                beast_lore: 0,
                bluffing: 0,
                bushcraft: 0,
                crafting: 0,
                evade: 0,
                healing: 0,
                hunting_fishing: 0,
                languages: 0,
                myths_legends: 0,
                performance: 0,
                persuasion: 0,
                riding: 0,
                seamanship: 0,
                sleight_of_hand: 0,
                sneaking: 0,
                spot_hidden: 0,
                swimming: 0,
            },
            weapons: {
                axes: 0,
                bows: 0,
                brawling: 0,
                crossbows: 0,
                hammers: 0,
                knives: 0,
                slings: 0,
                spears: 0,
                staves: 0,
                swords: 0,
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
        notes: [],
        companions: [],
    });

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
            JSON.stringify({
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
                        acrobatics: 0,
                        awareness: 0,
                        bartering: 0,
                        beast_lore: 0,
                        bluffing: 0,
                        bushcraft: 0,
                        crafting: 0,
                        evade: 0,
                        healing: 0,
                        hunting_fishing: 0,
                        languages: 0,
                        myths_legends: 0,
                        performance: 0,
                        persuasion: 0,
                        riding: 0,
                        seamanship: 0,
                        sleight_of_hand: 0,
                        sneaking: 0,
                        spot_hidden: 0,
                        swimming: 0,
                    },
                    weapons: {
                        axes: 0,
                        bows: 0,
                        brawling: 0,
                        crossbows: 0,
                        hammers: 0,
                        knives: 0,
                        slings: 0,
                        spears: 0,
                        staves: 0,
                        swords: 0,
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
                notes: [],
                companions: [],
            })
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
