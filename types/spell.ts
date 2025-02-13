// ~/types/heroic_spells.ts
import type { Spell, SpellCastingTime, SpellDuration } from "./sheet";

// BASIC SPELLS – from GENERAL MAGIC (excluding minor magic tricks)
export const BASIC_SPELLS = [
    {
        name: "Dispel",
        rank: 1,
        prerequisite: "Any School of Magic",
        requirement: ["Word", "Gesture"],
        casting_time: "Action" as SpellCastingTime,
        range: 10,
        duration: "Instant" as SpellDuration,
        description:
            "You cancel an ongoing spell of lower or equal power level. Can also be used to end other magical effects if allowed by the adventure or GM."
    } as Spell,
    {
        name: "Protector",
        rank: 1,
        prerequisite: "Any School of Magic",
        requirement: ["Gesture", "Ingredient"],
        casting_time: "Action" as SpellCastingTime,
        range: "Touch",
        duration: "Shift" as SpellDuration,
        description:
            "Protects a person or place (no larger than a human) from magic. The power level of all spells cast at that target is reduced by the power level of PROTECTOR. Can also reduce damage from magical attacks."
    } as Spell,
    {
        name: "Magic Shield",
        rank: 2,
        prerequisite: "Protector or Dispel",
        requirement: ["Gesture"],
        casting_time: "Reaction" as SpellCastingTime,
        range: 10,
        duration: "Instant" as SpellDuration,
        description:
            "Interferes with a spell cast by another mage, reducing its power level. Can also be used against magical attacks from monsters."
    } as Spell,
    {
        name: "Transfer",
        rank: 3,
        prerequisite: "Magic Shield",
        requirement: ["Gesture"],
        casting_time: "Action" as SpellCastingTime,
        range: "Touch",
        duration: "Instant" as SpellDuration,
        description:
            "Steal WP from or transfer your WP to another humanoid. You can take or give up to twice the cost for casting the spell. (If the target refuses, you get a bane.)"
    } as Spell,
    {
        name: "Magic Seal",
        rank: 4,
        prerequisite: "Transfer",
        requirement: ["Word", "Gesture"],
        casting_time: "Shift" as SpellCastingTime,
        range: "Touch",
        duration: "Permanent" as SpellDuration,
        description:
            "Binds a spell to an inanimate object. The power level of MAGIC SEAL determines the power level of the bound spell. When activated, WP is drawn from the activator. May be combined with CHARGE."
    } as Spell,
    {
        name: "Charge",
        rank: 4,
        prerequisite: "Transfer",
        requirement: ["Word", "Gesture"],
        casting_time: "Stretch" as SpellCastingTime,
        range: "Touch",
        duration: "Shift" as SpellDuration,
        description:
            "Transfers your WP to an inanimate object (acting as a battery). Each power level lets you transfer up to 10 WP. The charged WP dissipate after one shift unless combined with PERMANENCE."
    } as Spell,
    {
        name: "Permanence",
        rank: 5,
        prerequisite: "Magic Seal",
        requirement: ["Word", "Gesture"],
        casting_time: "Shift" as SpellCastingTime,
        range: "Touch",
        duration: "Permanent" as SpellDuration,
        description:
            "Makes another spell permanent. This costs 1 WIL permanently (reducing maximum WP by one) and must match the spell’s power level. Cannot be applied to spells with instant duration."
    }
] as const;

// ANIMISM SPELLS
export const ANIMISM_SPELLS = [
    {
        name: "Animal Whisperer",
        rank: 1,
        prerequisite: "Animism",
        requirement: ["Word"],
        casting_time: "Stretch" as SpellCastingTime,
        range: 2,
        duration: "Instant" as SpellDuration,
        description:
            "Allows you to speak with a bird or mammal. You can ask a number of questions equal to your power level. Although their answers are honest, they may be cryptic."
    } as Spell,
    {
        name: "Banish",
        rank: 1,
        prerequisite: "Animism",
        requirement: ["Word", "Gesture", "Focus"],
        casting_time: "Action" as SpellCastingTime,
        range: 10,
        duration: "Instant" as SpellDuration,
        description:
            "Inflicts 2D8 damage on demons or undead. Each additional power level increases damage by D8. Armor and natural armor have no effect, and the spell cannot be dodged or parried."
    } as Spell,
    {
        name: "Ensnaring Roots",
        rank: 1,
        prerequisite: "Animism",
        requirement: ["Gesture", "Ingredient"],
        casting_time: "Action" as SpellCastingTime,
        range: 10,
        duration: "Shift" as SpellDuration,
        description:
            "Ensnare the target with roots and branches so they cannot move. Breaking free requires an EVADE roll (boon at level 1, normal at 2, bane at 3). Only one attempt per round."
    } as Spell,
    {
        name: "Lightning Flash",
        rank: 1,
        prerequisite: "Animism",
        requirement: ["Gesture"],
        casting_time: "Action" as SpellCastingTime,
        range: 30,
        duration: "Instant" as SpellDuration,
        description:
            "Calls down a flash of lightning that deals 2D6 damage to a target and 2D4 to a nearby target. Extra power increases the number of damage dice. Indoors, the WP cost is doubled."
    } as Spell,
    {
        name: "Treat Wound",
        rank: 1,
        prerequisite: "Animism",
        requirement: ["Word"],
        casting_time: "Action" as SpellCastingTime,
        range: "Touch",
        duration: "Instant" as SpellDuration,
        description:
            "Heals a living creature for 2D6 HP. For each additional power level, heal an extra D6 HP."
    } as Spell,
    {
        name: "Engulfing Forest",
        rank: 2,
        prerequisite: "Ensnaring Roots",
        requirement: ["Gesture", "Ingredient"],
        casting_time: "Action" as SpellCastingTime,
        range: 10,
        duration: "Shift" as SpellDuration,
        description:
            "Summons thickets of thorns and roots in a 10-meter area (sphere) that ensnare all except the caster. Breaking free requires an EVADE roll."
    } as Spell,
    {
        name: "Lightning Bolt",
        rank: 2,
        prerequisite: "Lightning Flash",
        requirement: ["Gesture"],
        casting_time: "Action" as SpellCastingTime,
        range: 40,
        duration: "Instant" as SpellDuration,
        description:
            "Deals 2D8 damage to a target, then jumps to a second target (2D6) and a third (2D4) within 2 meters. Extra power increases damage dice by one."
    } as Spell,
    {
        name: "Heal Wound",
        rank: 2,
        prerequisite: "Treat Wound",
        requirement: ["Word"],
        casting_time: "Action" as SpellCastingTime,
        range: "Touch",
        duration: "Instant" as SpellDuration,
        description:
            "Heals 2D8 HP and cures one non-permanent severe injury. Each extra power level heals an additional D8 HP."
    } as Spell,
    {
        name: "Purge",
        rank: 2,
        prerequisite: "Banish",
        requirement: ["Word", "Gesture", "Focus"],
        casting_time: "Action" as SpellCastingTime,
        range: 10,
        duration: "Instant" as SpellDuration,
        description:
            "Exorcises a demon or undead by inflicting 2D10 damage. Each power level increases damage by D10."
    } as Spell,
    {
        name: "Sleep",
        rank: 2,
        prerequisite: "Treat Wound",
        requirement: ["Word"],
        casting_time: "Action" as SpellCastingTime,
        range: "Touch",
        duration: "Instant" as SpellDuration,
        description:
            "The target must succeed on a WIL roll or fall into a deep sleep for one stretch. A sleeping target is very hard to wake and takes damage to awaken."
    } as Spell,
    {
        name: "Restoration",
        rank: 3,
        prerequisite: "Heal Wound",
        requirement: ["Word"],
        casting_time: "Action" as SpellCastingTime,
        range: "Touch",
        duration: "Instant" as SpellDuration,
        description:
            "Heals a living creature for 2D10 HP and cures one severe injury. Each extra power level heals an additional D10 HP."
    } as Spell,
    {
        name: "Resurrection",
        rank: 3,
        prerequisite: "Heal Wound",
        requirement: ["Word", "Gesture", "Ingredient"],
        casting_time: "Shift" as SpellCastingTime,
        range: "Touch",
        duration: "Permanent" as SpellDuration,
        description:
            "Resurrects a dead person (if the corpse is viable). Costs 1 WIL permanently and reduces max WP by one. (Extra details appended if necessary.)"
    } as Spell,
    {
        name: "Thunderbolt",
        rank: 3,
        prerequisite: "Lightning Bolt",
        requirement: ["Gesture"],
        casting_time: "Action" as SpellCastingTime,
        range: 50,
        duration: "Instant" as SpellDuration,
        description:
            "Calls down a mighty thunderstroke that deals 2D10 damage to the target, then 2D8, 2D6, and 2D4 damage to up to three additional targets. Indoors, WP cost is doubled."
    }
] as const;

// ELEMENTALISM SPELLS
export const ELEMENTALISM_SPELLS = [
    {
        name: "Fireball",
        rank: 1,
        prerequisite: "Elementalism",
        requirement: ["Word", "Gesture"],
        casting_time: "Action" as SpellCastingTime,
        range: 20,
        duration: "Instant" as SpellDuration,
        description:
            "Sends a fireball from your hand that deals 2D6 damage. Each extra power level increases damage by D6 or creates an additional fireball."
    } as Spell,
    {
        name: "Frost",
        rank: 1,
        prerequisite: "Elementalism",
        requirement: ["Word", "Gesture"],
        casting_time: "Action" as SpellCastingTime,
        range: 4,
        duration: "Stretch" as SpellDuration,
        description:
            "Drastically lowers temperature in a 4‑meter sphere. Extinguishes fires, causes 2D6 damage and D6 WP loss, and freezes living creatures (preventing healing until warmed)."
    } as Spell,
    {
        name: "Gust of Wind",
        rank: 1,
        prerequisite: "Elementalism",
        requirement: ["Word", "Gesture"],
        casting_time: "Action" as SpellCastingTime,
        range: 10,
        duration: "Instant" as SpellDuration,
        description:
            "Summons a gust of wind (in a cone) that pushes objects and creatures 2D4 meters away. Against swarms, deals 2D6 damage."
    } as Spell,
    {
        name: "Pillar",
        rank: 1,
        prerequisite: "Elementalism",
        requirement: ["Word", "Gesture"],
        casting_time: "Action" as SpellCastingTime,
        range: 10,
        duration: "Shift" as SpellDuration,
        description:
            "Raises a pillar 3 meters high and 1 meter wide. Anyone in its space must make an ACROBATICS roll to avoid falling."
    } as Spell,
    {
        name: "Shatter",
        rank: 1,
        prerequisite: "Elementalism",
        requirement: ["Word"],
        casting_time: "Action" as SpellCastingTime,
        range: "Touch",
        duration: "Instant" as SpellDuration,
        description:
            "Breaks apart physical matter, inflicting 2D10 damage on an inanimate, non-magical object. Armor is ignored."
    } as Spell,
    {
        name: "Fire Blast",
        rank: 2,
        prerequisite: "Fireball",
        requirement: ["Word", "Gesture"],
        casting_time: "Action" as SpellCastingTime,
        range: 30,
        duration: "Instant" as SpellDuration,
        description:
            "Sends a large blast of fire at a target, dealing 2D8 damage. Extra power increases damage by D8 or creates an additional blast."
    } as Spell,
    {
        name: "Stone Shield",
        rank: 2,
        prerequisite: "Pillar",
        requirement: ["Gesture", "Ingredient"],
        casting_time: "Reaction" as SpellCastingTime,
        range: "Personal",
        duration: "Instant" as SpellDuration,
        description:
            "Summons a shield of stone that reduces incoming damage by 2D6, plus an additional D6 per extra power level."
    } as Spell,
    {
        name: "Stonewall",
        rank: 2,
        prerequisite: "Pillar",
        requirement: ["Word", "Gesture"],
        casting_time: "Action" as SpellCastingTime,
        range: 10,
        duration: "Shift" as SpellDuration,
        description:
            "Raises a wall (1m thick, 2m high, 3m wide) from the ground. Anyone in its space must avoid falling by making an ACROBATICS roll."
    } as Spell,
    {
        name: "Tidal Wave",
        rank: 2,
        prerequisite: "Frost",
        requirement: ["Word", "Gesture", "Ingredient"],
        casting_time: "Action" as SpellCastingTime,
        range: 20,
        duration: "Instant" as SpellDuration,
        description:
            "Summons a wave from a water source that pushes objects/creatures 2D6 meters away. Extra power increases the number of dice rolled."
    } as Spell,
    {
        name: "Whirlwind",
        rank: 2,
        prerequisite: "Gust of Wind",
        requirement: ["Word", "Gesture"],
        casting_time: "Action" as SpellCastingTime,
        range: 4,
        duration: "Instant" as SpellDuration,
        description:
            "Creates a whirlwind in a 4‑meter sphere that hurls targets 2D4 meters away and inflicts D4 damage per extra power level. Optionally, one target may be redirected if you take a bane."
    } as Spell,
    {
        name: "Firebird",
        rank: 3,
        prerequisite: "Fire Blast",
        requirement: ["Word", "Gesture"],
        casting_time: "Action" as SpellCastingTime,
        range: 40,
        duration: "Instant" as SpellDuration,
        description:
            "Sends a terrifying bird of fire that inflicts 2D10 damage on a hit. Extra power increases damage by D10 or summons an additional firebird."
    } as Spell,
    {
        name: "Sylph",
        rank: 3,
        prerequisite: "Whirlwind",
        requirement: ["Word", "Gesture"],
        casting_time: "Stretch" as SpellCastingTime,
        range: 4,
        duration: "Stretch" as SpellDuration,
        description:
            "Summons a wind elemental in the shape of a bird. The sylph acts independently (counts as a monster) but must stay within sight."
    } as Spell,
    {
        name: "Firestorm",
        rank: 3,
        prerequisite: "Fire Blast and Whirlwind",
        requirement: ["Word", "Gesture"],
        casting_time: "Action" as SpellCastingTime,
        range: 4,
        duration: "Instant" as SpellDuration,
        description:
            "Creates a whirling storm of fire around you. All targets in the area take 2D6 damage; each extra power level increases the range by 4 meters and adds D6 damage."
    } as Spell,
    {
        name: "Gnome",
        rank: 3,
        prerequisite: "Stonewall",
        requirement: ["Word", "Gesture", "Ingredient"],
        casting_time: "Stretch" as SpellCastingTime,
        range: 4,
        duration: "Stretch" as SpellDuration,
        description:
            "Summons an earth elemental that takes the form of a humanoid made of gray-brown sand or clay. (Additional stat info omitted.)"
    } as Spell,
    {
        name: "Salamander",
        rank: 3,
        prerequisite: "Fire Blast",
        requirement: ["Word", "Gesture", "Ingredient"],
        casting_time: "Stretch" as SpellCastingTime,
        range: 4,
        duration: "Stretch" as SpellDuration,
        description:
            "Summons a fire elemental in the form of a lizard of fire. (Additional stat info omitted. The elemental is immune to fire damage.)"
    } as Spell,
    {
        name: "Undine",
        rank: 3,
        prerequisite: "Tidal Wave",
        requirement: ["Word", "Gesture", "Ingredient"],
        casting_time: "Stretch" as SpellCastingTime,
        range: 4,
        duration: "Stretch" as SpellDuration,
        description:
            "Summons a water elemental resembling a tidal wave with a crest shaped like a woman. (Additional stat info omitted.)"
    }
] as const;

// MENTALISM SPELLS
export const MENTALISM_SPELLS = [
    {
        name: "Farsight",
        rank: 1,
        prerequisite: "Mentalism",
        requirement: ["Word", "Gesture"],
        casting_time: "Action" as SpellCastingTime,
        range: 1000, // 1 kilometer
        duration: "Concentration" as SpellDuration,
        description:
            "Lets you see and hear what is happening in a location up to 1 kilometer away. Each additional power level increases the range tenfold."
    } as Spell,
    {
        name: "Levitate",
        rank: 1,
        prerequisite: "Mentalism",
        requirement: ["Word", "Gesture"],
        casting_time: "Action" as SpellCastingTime,
        range: 6,
        duration: "Instant" as SpellDuration,
        description:
            "Causes yourself or another to levitate up to 6 meters; each extra power level adds 2 meters or allows additional targets."
    } as Spell,
    {
        name: "Longstrider",
        rank: 1,
        prerequisite: "Mentalism",
        requirement: ["Word", "Gesture"],
        casting_time: "Action" as SpellCastingTime,
        range: "Touch",
        duration: "Stretch" as SpellDuration,
        description:
            "Doubles the target’s movement rating for the duration. Can be cast on yourself."
    } as Spell,
    {
        name: "Power Fist",
        rank: 1,
        prerequisite: "Mentalism",
        requirement: ["Word", "Gesture"],
        casting_time: "Action" as SpellCastingTime,
        range: "Personal",
        duration: "Stretch" as SpellDuration,
        description:
            "Increases the damage of your unarmed attacks by D6 per power level."
    } as Spell,
    {
        name: "Stone Skin",
        rank: 1,
        prerequisite: "Mentalism",
        requirement: ["Word", "Gesture", "Ingredient"],
        casting_time: "Action" as SpellCastingTime,
        range: "Touch",
        duration: "Stretch" as SpellDuration,
        description:
            "Turns the target’s skin hard, granting an armor rating of 4, with additional rating per extra power level."
    } as Spell,
    {
        name: "Divination",
        rank: 2,
        prerequisite: "Farsight",
        requirement: ["Word", "Gesture"],
        casting_time: "Action" as SpellCastingTime,
        range: 100,
        duration: "Instant" as SpellDuration,
        description:
            "Shows the direction to the nearest target of a specified type (item, creature, substance). Each extra power level doubles the range."
    } as Spell,
    {
        name: "Enchant Weapon",
        rank: 2,
        prerequisite: "Power Fist",
        requirement: ["Word", "Gesture"],
        casting_time: "Action" as SpellCastingTime,
        range: "Touch",
        duration: "Stretch" as SpellDuration,
        description:
            "Enchants a weapon so that results 1–2 count as a Dragon roll when attacking or parrying. Each extra power level increases the chance by 1."
    } as Spell,
    {
        name: "Mental Strike",
        rank: 2,
        prerequisite: "Power Fist",
        requirement: ["Word", "Gesture"],
        casting_time: "Action" as SpellCastingTime,
        range: 10,
        duration: "Instant" as SpellDuration,
        description:
            "Projects your mental power as a physical strike, hurling the target 2D6 meters away and inflicting damage. Each additional power level adds D6 damage."
    } as Spell,
    {
        name: "Scrying",
        rank: 2,
        prerequisite: "Farsight",
        requirement: ["Gesture"],
        casting_time: "Action" as SpellCastingTime,
        range: 10,
        duration: "Concentration" as SpellDuration,
        description:
            "Allows you to view past events in the current location. At rank 1 you see up to one day back, rank 2 up to one year, and rank 3 centuries. Visions are cryptic and fragmented."
    } as Spell,
    {
        name: "Telepathy",
        rank: 2,
        prerequisite: "Farsight",
        requirement: ["Word", "Gesture"],
        casting_time: "Action" as SpellCastingTime,
        range: 10,
        duration: "Concentration" as SpellDuration,
        description:
            "Lets you read surface thoughts or send your thoughts to another. Deeper access requires higher power levels."
    } as Spell,
    {
        name: "Dominate",
        rank: 3,
        prerequisite: "Telepathy",
        requirement: ["Word", "Gesture"],
        casting_time: "Action" as SpellCastingTime,
        range: 10,
        duration: "Instant" as SpellDuration,
        description:
            "Takes control of another’s actions by making an opposed roll against their WIL. On success, the victim loses their next turn."
    } as Spell,
    {
        name: "Flight",
        rank: 3,
        prerequisite: "Levitate",
        requirement: ["Word", "Gesture"],
        casting_time: "Action" as SpellCastingTime,
        range: "Touch",
        duration: "Stretch" as SpellDuration,
        description:
            "Grants you or another the ability to fly with a base Movement rating of 6; at rank 2 it doubles to 12, and at rank 3 to 24."
    } as Spell,
    {
        name: "Teleport",
        rank: 3,
        prerequisite: "Farsight",
        requirement: ["Word", "Gesture"],
        casting_time: "Action" as SpellCastingTime,
        range: "Touch",
        duration: "Instant" as SpellDuration,
        description:
            "Teleports you up to 100 meters. For each additional power level, you can bring another creature or double the range. Cannot be used to travel between dimensions."
    }
] as const;