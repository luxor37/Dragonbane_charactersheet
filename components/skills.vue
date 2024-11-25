<script setup lang="ts">
import type { Character } from "~/types/sheet";

const character = ref<Character>({
  name: "Archer",
  profession: "Hunter",
  weakness: "Fire",
  appearance: "Tall and lean",
  stats: {
    strenght: 10,
    constitution: 8,
    agility: 12,
    intelligence: 14,
    willpower: 11,
    charisma: 9,
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
    strenght: 2,
    agility: 3,
  },
  movement: 30,
  encumbrance_limit: 50,
  skills: {
    utility: {
      acrobatics: 4,
      awareness: 3,
      bartering: 2,
      beast_lore: 5,
      bluffing: 1,
      bushcraft: 4,
      crafting: 2,
      evade: 5,
      healing: 3,
      hunting_fishing: 4,
      languages: 3,
      myths_legends: 2,
      performance: 1,
      persuasion: 4,
      riding: 3,
      seamanship: 1,
      sleight_of_hand: 5,
      sneaking: 4,
      spot_hidden: 3,
      swimming: 2,
    },
    weapons: {
      axes: 1,
      bows: 5,
      brawling: 2,
      crossbows: 4,
      hammers: 1,
      knives: 3,
      slings: 2,
      spears: 3,
      staves: 2,
      swords: 4,
    },
    secondary: [
      {
        name: "Sercellon",
        check: 11,
        description: "some desc",
      },
    ],
  },
  inventory: [],
  mementos: [],
  tiny_items: [],
  money: {
    gold: 10,
    silver: 50,
    copper: 100,
  },
  equipment: {
    armor: {
      armor_rating: 5,
      name: "Leather Armor",
      bane: {
        sneaking: true,
        evade: false,
        acrobatics: false,
      },
    },
    helmet: {
      armor_rating: 2,
      name: "Iron Helmet",
      bane: {
        awareness: true,
        ranged_attacks: false,
      },
    },
    weapons: [],
  },
  willpower: {
    total: 10,
    used: 2,
  },
  health: {
    total: 20,
    used: 5,
    death_rolls: {
      successess: 0,
      failures: 0,
    },
  },
  rests: {
    round: true,
    stretch: false,
  },
  abilities: [],
  notes: [],
  companions: [],
});
</script>

<template>
  <div class="flex flex-col m-4 border-2 border-solid">
    <div class="font-bold text-xl text-center underline">Skills</div>
    <div class="flex flex-row">
      <div class="flex flex-col m-4">
        <ul>
          <li
            v-for="(value, skill) in character.skills.utility"
            :key="skill"
            class="flex flex-row items-center gap-1"
          >
            <UCheckbox />
            <NumberInput v-model="character.skills.utility[skill]" /> :
            {{ skill.charAt(0).toUpperCase() + skill.slice(1) }}
          </li>
        </ul>
      </div>
      <div class="flex flex-col m-4">
        <div class="text-md font-bold">Weapons Skills</div>
        <ul>
          <li
            v-for="(value, skill) in character.skills.weapons"
            :key="skill"
            class="flex flex-row items-center gap-1"
          >
            <UCheckbox />
            <NumberInput v-model="character.skills.weapons[skill]" /> :
            {{ skill.charAt(0).toUpperCase() + skill.slice(1) }}
          </li>
        </ul>
        <div class="text-md font-bold mt-4">Secondary Skills</div>
        <ul>
          <li
            v-for="(skill, index) in character.skills.secondary"
            :key="skill.name"
            class="flex flex-row items-center gap-1"
          >
            <UCheckbox />
            <NumberInput v-model="character.skills.secondary[index].check" /> :
            <UTooltip :text="skill.description">
              {{ skill.name.charAt(0).toUpperCase() + skill.name.slice(1) }}
            </UTooltip>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
