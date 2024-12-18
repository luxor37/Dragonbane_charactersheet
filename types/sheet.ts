export interface Character {
    name: string
    profession: Profession
    kin: Kin
    age: Age
    weakness: string
    appearance: string
    stats: {
        strenght: number
        constitution: number
        agility: number
        intelligence: number
        willpower: number
        charisma: number
    }
    conditions: {
        exhausted: boolean
        sickly: boolean
        dazed: boolean
        angry: boolean
        scared: boolean
        disheartened: boolean
    }
    damage_bonus: {
        strenght: number
        agility: number
    }
    movement: number
    encumbrance_limit: number
    skills: {
        utility: {
            acrobatics: number
            awareness: number
            bartering: number
            beast_lore: number
            bluffing: number
            bushcraft: number
            crafting: number
            evade: number
            healing: number
            hunting_fishing: number
            languages: number
            myths_legends: number
            performance: number
            persuasion: number
            riding: number
            seamanship: number
            sleight_of_hand: number
            sneaking: number
            spot_hidden: number
            swimming: number
        }
        weapons: {
            axes: number
            bows: number
            brawling: number
            crossbows: number
            hammers: number
            knives: number
            slings: number
            spears: number
            staves: number
            swords: number
        }
        secondary: SecondarySkill[]
    }
    inventory: Gear[]
    mementos: Gear[]
    tiny_items: Gear[]
    money: {
        gold: number
        silver: number
        copper: number
    }
    equipment: {
        armor: {
            armor_rating: number
            name: string
            bane: {
                sneaking: boolean
                evade: boolean
                acrobatics: boolean
            }
        }
        helmet: {
            armor_rating: number
            name: string
            bane: {
                awareness: boolean
                ranged_attacks: boolean
            }
        }
        weapons: Weapon[]
    }
    willpower: {
        total: number
        used: number
    }
    health: {
        total: number
        used: number
        death_rolls: {
            successess: number
            failures: number
        }
    }
    rests: {
        round: boolean
        stretch: boolean
    }
    abilities: Ability[]
    notes: string[]
    companions: Companion[]
}

export interface SecondarySkill {
    name: string
    check: number
    description: string
}

export interface Gear {
    name: string
    qty?: number
}

export interface Weapon {
    name: string
    grip: number
    range: number
    durability: number
    features: WeaponFeature[]
    damage: Dice
}

export const KINS = ["Wolfkin", "Human", "Elf"] as const;

export type Kin = typeof KINS[number];

export const PROFESSIONS = ["Hunter", "Mage", "Warrior"] as const;

export type Profession = typeof PROFESSIONS[number];

export const AGES = ["Young", "Adult", "Old"] as const;

export type Age = typeof AGES[number];

export const WEAPON_FEATURES = ["Subtle", "Piercing", "Thrown"] as const;

export type WeaponFeature = typeof WEAPON_FEATURES[number];

export const DICE_VALUES = ["d4", "d6", "d8", "d10", "d12", "d20"] as const;

export type Dice = typeof DICE_VALUES[number];

export interface Ability {
    name: string
    cost: number
    description: string
}

export interface Companion {
    name: string
    health: {
        total: number
        remaining: number
    }
    attack: Dice
    awareness: number
    evade: number
    sneaking: number
    movement: number
    notes: string[]
}