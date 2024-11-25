<script setup lang="ts">
import type { Character } from "~/types/sheet";

const character = ref<Character>({
  name: "Archer",
  profession: "Hunter",
  weakness: "Fire",
  appearance: "Tall and lean with a scar over the left eye",
  stats: {
    strenght: 12,
    constitution: 10,
    agility: 14,
    intelligence: 13,
    willpower: 11,
    charisma: 8,
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
  encumbrance_limit: 60,
  skills: {
    utility: {
      acrobatics: 5,
      awareness: 4,
      bartering: 3,
      beast_lore: 6,
      bluffing: 2,
      bushcraft: 5,
      crafting: 3,
      evade: 6,
      healing: 4,
      hunting_fishing: 6,
      languages: 3,
      myths_legends: 3,
      performance: 2,
      persuasion: 4,
      riding: 4,
      seamanship: 2,
      sleight_of_hand: 5,
      sneaking: 5,
      spot_hidden: 4,
      swimming: 3,
    },
    weapons: {
      axes: 2,
      bows: 6,
      brawling: 3,
      crossbows: 5,
      hammers: 1,
      knives: 4,
      slings: 2,
      spears: 3,
      staves: 2,
      swords: 4,
    },
    secondary: [
      {
        name: "Herbalism",
        check: 12,
        description: "Knowledge of herbs and their uses for healing or poisons",
      },
      {
        name: "Map Reading",
        check: 10,
        description: "Ability to navigate terrain using maps",
      },
    ],
  },
  inventory: [
    { name: "Rope", qty: 1 },
    { name: "Torch", qty: 3 },
    { name: "Healing Potion", qty: 2 },
  ],
  mementos: [{ name: "Lock of Hair" }],
  tiny_items: [{ name: "Flint" }, { name: "Needle" }],
  money: {
    gold: 15,
    silver: 75,
    copper: 120,
  },
  equipment: {
    armor: {
      armor_rating: 6,
      name: "Chainmail Armor",
      bane: {
        sneaking: true,
        evade: false,
        acrobatics: false,
      },
    },
    helmet: {
      armor_rating: 3,
      name: "Iron Helmet",
      bane: {
        awareness: true,
        ranged_attacks: false,
      },
    },
    weapons: [
      {
        name: "Longbow",
        grip: 2,
        range: 150,
        durability: 10,
        features: ["piercing"],
        damage: "d8",
      },
      {
        name: "Dagger",
        grip: 1,
        range: 5,
        durability: 8,
        features: ["subtle", "thrown"],
        damage: "d4",
      },
    ],
  },
  willpower: {
    total: 10,
    used: 3,
  },
  health: {
    total: 25,
    used: 5,
    death_rolls: {
      successess: 0,
      failures: 0,
    },
  },
  rests: {
    round: false,
    stretch: true,
  },
  abilities: [
    {
      name: "Eagle Eye",
      cost: 2,
      description: "Increased accuracy with ranged weapons",
    },
    {
      name: "Survivor",
      cost: 3,
      description: "Resilience against harsh environmental conditions",
    },
  ],
  notes: ["Prefers ranged combat", "Favors traveling light"],
  companions: [
    {
      name: "Shadow",
      health: {
        total: 15,
        remaining: 12,
      },
      attack: "d6",
      awareness: 4,
      evade: 5,
      sneaking: 6,
      movement: 40,
      notes: ["A loyal wolf with sharp senses and stealth skills"],
    },
  ],
});

const columns = [
  {
    key: "weapon",
    label: "Weapon",
    sortable: false,
  },
  {
    key: "grip",
    label: "Grip",
    sortable: false,
  },
  {
    key: "range",
    label: "Range",
    sortable: false,
  },
  {
    key: "dmg",
    label: "Damage",
    sortable: false,
  },
  {
    key: "durability",
    label: "Durability",
    sortable: false,
  },
  {
    key: "feat",
    label: "Features",
    sortable: false,
  },
];

const rows = computed(() =>
  character.value.equipment.weapons.map(
    ({ name, grip, range, damage, durability, features }) => {
      return {
        weapon: name,
        grip: grip,
        range: `${range} ft`,
        dmg: `1${damage}`,
        durability: durability,
        feat: features,
      };
    }
  )
);
</script>

<template>
  <div class="flex flex-row m-auto">
    <div class="flex flex-col">
      <div class="flex flex-row">
        <!-- ARMOR -->
        <div class="flex flex-row m-2 gap-2">
          <ArmorRating v-model="character.equipment.armor.armor_rating" />
          <div class="flex flex-col">
            <div class="font-bold">Armor</div>
            <UInput type="text" v-model="character.equipment.armor.name" />
            <div>
              Bane on:
              <UCheckbox
                v-model="character.equipment.armor.bane.acrobatics"
                label="Acrobatics"
              />
              <UCheckbox
                v-model="character.equipment.armor.bane.evade"
                label="Evade"
              />
              <UCheckbox
                v-model="character.equipment.armor.bane.sneaking"
                label="Sneaking"
              />
            </div>
          </div>
        </div>

        <!-- HELMET -->
        <div class="flex flex-row m-2 gap-2">
          <ArmorRating v-model="character.equipment.helmet.armor_rating" />
          <div class="flex flex-col">
            <div class="font-bold">Armor</div>
            <UInput type="text" v-model="character.equipment.helmet.name" />
            <div>
              Bane on:
              <UCheckbox
                v-model="character.equipment.helmet.bane.awareness"
                label="Awareness"
              />
              <UCheckbox
                v-model="character.equipment.helmet.bane.ranged_attacks"
                label="Ranged Attacks"
              />
            </div>
          </div>
        </div>
      </div>
      <div>
        <UTable :columns="columns" :rows="rows" />
      </div>
    </div>
    <div class="flex flex-col">
      <div>Willpower</div>
      <div>Hitpoint</div>
    </div>
  </div>
</template>
