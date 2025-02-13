import type { Heroic_ability } from "./heroic_abilities"

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
            acrobatics: Skill
            awareness: Skill
            bartering: Skill
            beast_lore: Skill
            bluffing: Skill
            bushcraft: Skill
            crafting: Skill
            evade: Skill
            healing: Skill
            hunting_fishing: Skill
            languages: Skill
            myths_legends: Skill
            performance: Skill
            persuasion: Skill
            riding: Skill
            seamanship: Skill
            sleight_of_hand: Skill
            sneaking: Skill
            spot_hidden: Skill
            swimming: Skill
        }
        weapons: {
            axes: Skill
            bows: Skill
            brawling: Skill
            crossbows: Skill
            hammers: Skill
            knives: Skill
            slings: Skill
            spears: Skill
            staves: Skill
            swords: Skill
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
        armor: Armor
        helmet: Helmet
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
    abilities: (Heroic_ability | Ability)[]
    spells: (Spell)[]
    notes: string[]
    companions: Companion[]
}

export interface SecondarySkill {
    name: string
    skill: Skill
    description: string
}

export interface Gear {
    name: string
    qty?: number
}

export interface Armor {
    armor_rating: number
    name: string
    bane: {
        sneaking: boolean
        evade: boolean
        acrobatics: boolean
    }
}

export interface Helmet {
    armor_rating: number
    name: string
    bane: {
        awareness: boolean
        ranged_attacks: boolean
    }
}

export interface Weapon {
    name: string
    grip: Grip
    range: number
    strength?: number
    durability: number
    features: WeaponFeature[]
    damage: Dice
    dices: number
    description: string
}

export interface Skill {
    check: number
    upgrade: boolean
}

export const KINS = ["Wolfkin", "Human", "Elf", "Halfling", "Dwarf", "Mallard"] as const;
export type Kin = typeof KINS[number];

export const GRIPS = ["2 hands", "1 hand"] as const;
export type Grip = typeof GRIPS[number];

export const PROFESSIONS = ["Hunter", "Mage", "Artisan", "Bard", "Fighter", "Knight", "Mariner", "Merchant", "Scholar", "Thief"] as const;
export type Profession = typeof PROFESSIONS[number];

export const AGES = ["Young", "Adult", "Old"] as const;
export type Age = typeof AGES[number];

export const WEAPON_FEATURES = ["Subtle", "Piercing", "Thrown"] as const;
export type WeaponFeature = typeof WEAPON_FEATURES[number];

export const DICE_VALUES = ["d4", "d6", "d8", "d10", "d12", "d20"] as const;
export type Dice = typeof DICE_VALUES[number];

export interface Ability {
    name: string
    cost?: number
    description: string
    requirement?: string
}

export interface Spell {
    name: string
    rank: number
    prerequisite: string
    requirement: SpellRequirement[]
    casting_time: SpellCastingTime
    range: number | 'Touch' | 'Personal'
    duration: SpellDuration
    description: string
}

export const SPELL_REQUIREMENTS = ["Word", "Gesture", "Focus", "Ingredient"] as const;
export type SpellRequirement = typeof SPELL_REQUIREMENTS[number];

export const SPELL_DURATION = ["Instant", "Round", "Stretch", "Shift", "Concentration", "Permanent"] as const;
export type SpellDuration = typeof SPELL_DURATION[number];

export const SPELL_CASTING_TIME = ["Action", "Shift", "Stretch", "Reaction"] as const;
export type SpellCastingTime = typeof SPELL_CASTING_TIME[number];

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

