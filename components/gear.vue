<script setup lang="ts">
import {
  DICE_VALUES,
  WEAPON_FEATURES,
  GRIPS,
  type Weapon,
  type WeaponFeature,
} from "~/types/sheet";

const sheetStore = useSheetStore();
const { character } = storeToRefs(sheetStore);

const isOpen = ref<boolean>(false);
const isAddWeapon = ref<boolean>(false);
const weapon = ref<Weapon | null>(null);
const editedIndex = ref<number | null>(null);

interface _WeaponFeature {
  value: WeaponFeature;
  label: WeaponFeature;
}
const weaponFeatureOptions = WEAPON_FEATURES.map(
  (feature): _WeaponFeature => ({
    value: feature,
    label: feature,
  })
);

const diceOptions = DICE_VALUES.map((dice) => ({
  value: dice,
  label: dice, // For example: "d4", "d6", etc.
}));

// Grip options from GRIPS
const gripOptions = GRIPS.map((g) => ({ value: g, label: g }));

const selectedWeaponFeatures = computed({
  get() {
    if (!weapon.value) return [];
    return weaponFeatureOptions.filter((option) =>
      weapon.value?.features.includes(option.value)
    );
  },
  set(selectedItems) {
    if (weapon.value) {
      weapon.value.features = selectedItems.map((item) => item.value);
    }
  },
});

const editItem = (index: number) => {
  editedIndex.value = index;
  weapon.value = { ...character.value.equipment.weapons[index] };
  isOpen.value = true;
};

const addItemInit = () => {
  weapon.value = {
    name: "Weapon",
    grip: GRIPS[0],
    range: 0,
    strength: 0,
    damage: "d4",
    dices: 1,
    durability: 0,
    features: [],
    description: "",
  } as Weapon;
  isAddWeapon.value = true;
  isOpen.value = true;
};

const deleteWeapon = () => {
  if (editedIndex.value !== null) {
    character.value.equipment.weapons.splice(editedIndex.value, 1);
  }
  reset();
};

const addItem = () => {
  if (weapon.value) {
    character.value.equipment.weapons.push({ ...weapon.value });
  }
  reset();
};

const saveWeapon = () => {
  if (!isAddWeapon.value && editedIndex.value !== null) {
    character.value.equipment.weapons[editedIndex.value] = { ...weapon.value! };
    reset();
  } else {
    addItem();
  }
};

const reset = () => {
  editedIndex.value = null;
  isAddWeapon.value = false;
  weapon.value = null;
  isOpen.value = false;
};

const toggleWillpower = (index: number) => {
  if (index <= character.value.willpower.used) {
    character.value.willpower.used = index - 1;
  } else {
    character.value.willpower.used = index;
  }
};

const toggleHealth = (index: number) => {
  if (index <= character.value.health.used) {
    character.value.health.used = index - 1;
  } else {
    character.value.health.used = index;
  }
};

const toggleDeathRoll = (type: "successess" | "failures", index: number) => {
  if (type === "successess") {
    character.value.health.death_rolls.successess =
      index <= character.value.health.death_rolls.successess
        ? index - 1
        : index;
  } else if (type === "failures") {
    character.value.health.death_rolls.failures =
      index <= character.value.health.death_rolls.failures ? index - 1 : index;
  }
};
</script>

<template>
  <div class="flex flex-col m-auto gap-4">
    <div class="flex flex-row gap-4 justify-center">
      <UCheckbox label="Round Rest" v-model="character.rests.round" />
      <UCheckbox label="Stretch Rest" v-model="character.rests.stretch" />
    </div>
    <div class="flex flex-row flex-wrap justify-around">
      <CardArmor v-model:item="character.equipment.armor" mode="armor" />
      <CardArmor v-model:item="character.equipment.helmet" mode="helmet" />
    </div>
    <div class="flex flex-row flex-wrap gap-4 justify-around">
      <!-- Willpower -->
      <CardPoints
        label="Willpower Points"
        :total="character.willpower.total"
        :used="character.willpower.used"
        :toggle="toggleWillpower"
        @update:total="character.willpower.total = $event"
      />
      <!-- Health -->
      <CardPoints
        label="Health Points"
        :total="character.health.total"
        :used="character.health.used"
        :toggle="toggleHealth"
        @update:total="character.health.total = $event"
      />
    </div>

    <CardDeathRolls
      :successes="character.health.death_rolls.successess"
      :failures="character.health.death_rolls.failures"
      :toggleSuccess="toggleDeathRoll.bind(null, 'successess')"
      :toggleFailure="toggleDeathRoll.bind(null, 'failures')"
    />
    <div
      class="border-2 border-solid rounded-md m-2 gap-2 overflow-x-scroll md:w-full"
    >
      <div class="grid grid-cols-2 md:grid-cols-3 gap-4 p-4">
        <CardWeapon
          v-for="(weaponItem, index) in character.equipment.weapons"
          :key="weaponItem.name + index"
          :item="weaponItem"
          :index="index"
          @edit="editItem"
        />
      </div>
      <hr />
      <div class="flex flex-row justify-end p-2">
        <UButton label="Add Item..." @click="addItemInit" />
      </div>
    </div>
  </div>

  <!-- Modal for Adding/Editing a Weapon -->
  <UModal v-model:open="isOpen">
    <template #content>
      <UCard>
        <template #header>
          <div class="flex items-center justify-between">
            <h3 class="text-base font-semibold leading-6">
              {{ isAddWeapon ? "Add Weapon" : "Edit Weapon" }}
            </h3>
            <UButton
              color="neutral"
              variant="ghost"
              icon="i-heroicons-x-mark-20-solid"
              class="-my-1"
              @click="reset"
            />
          </div>
        </template>
        <div class="flex flex-col gap-2" v-if="weapon">
          <div class="flex flex-row items-center gap-2">
            <div>Name:</div>
            <UInput v-model="weapon.name" placeholder="Name" />
          </div>
          <div class="flex flex-row items-center gap-2">
            <div>Grip:</div>
            <USelect :items="gripOptions" v-model="weapon.grip" />
          </div>
          <div class="flex flex-row items-center gap-2">
            <div>Range:</div>
            <UInput type="number" v-model="weapon.range" placeholder="Range" />
            ft
          </div>
          <div class="flex flex-row items-center gap-2">
            <div>Strength:</div>
            <UInput
              type="number"
              v-model="weapon.strength"
              placeholder="Strength"
            />
          </div>
          <div class="flex flex-row items-center gap-2">
            <div>Damage:</div>
            <!-- Display number of dice first then 'd' then select for dice type -->
            <NumberInput
              v-model="weapon.dices"
              placeholder="Number"
              class="w-16"
            />
            <span>d</span>
            <USelect :items="diceOptions" v-model="weapon.damage" />
          </div>
          <div class="flex flex-row items-center gap-2">
            <div>Durability:</div>
            <UInput
              type="number"
              v-model="weapon.durability"
              placeholder="Durability"
            />
          </div>
          <div class="flex flex-row items-center gap-2">
            <div>Features:</div>
            <USelectMenu
              :items="weaponFeatureOptions"
              v-model="selectedWeaponFeatures"
              multiple
              label="Select Features"
            />
          </div>
          <div class="flex flex-col">
            <div>Description:</div>
            <UInput
              type="text"
              v-model="weapon.description"
              placeholder="Description"
            />
          </div>
        </div>
        <template #footer>
          <div class="flex flex-row gap-2 justify-end">
            <UButton
              @click="saveWeapon"
              :label="isAddWeapon ? 'Add' : 'Edit'"
            />
            <UButton
              v-if="!isAddWeapon"
              @click="deleteWeapon"
              label="Delete"
              variant="outline"
              color="error"
            />
          </div>
        </template>
      </UCard>
    </template>
  </UModal>
</template>
