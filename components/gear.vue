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
  <div class="flex flex-row m-auto">
    <div class="flex flex-col">
      <div class="flex flex-row">
        <div>Armor</div>
        <div>Healmet</div>
      </div>
      <div>
        <UTable />
      </div>
    </div>
    <div class="flex flex-col">
      <div>Willpower</div>
      <div>Hitpoint</div>
    </div>
  </div>
</template>
