<script setup lang="ts">
import {
  DICE_VALUES,
  WEAPON_FEATURES,
  type Weapon,
  type WeaponFeature,
} from "~/types/sheet";

const sheetStore = useSheetStore();
const { character } = storeToRefs(sheetStore);

const isOpen = ref<boolean>(false);
const isAddWeapon = ref<boolean>(false);
const weapon = ref<Weapon | null>(null);
const editedIndex = ref<number | null>(null);

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
  {
    key: "edit",
    sortable: false,
  },
];

const rows = computed(() =>
  character.value.equipment.weapons.map(
    ({ name, grip, range, damage, durability, features }, index) => {
      return {
        index: index,
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

interface _WeaponFeature {
  value: WeaponFeature;
  label: WeaponFeature;
}
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
const weaponFeatureOptions = WEAPON_FEATURES.map(
  (feature): _WeaponFeature => ({
    value: feature,
    label: feature,
  })
);

const diceOptions = DICE_VALUES.map((dice) => ({
  value: dice,
  label: `1${dice}`,
}));

const editItem = (index: number) => {
  editedIndex.value = index;
  weapon.value = character.value.equipment.weapons[index];
  isOpen.value = true;
};

const addItemInit = () => {
  weapon.value = {
    name: "Weapon",
    grip: 1,
    range: 0,
    damage: "d4",
    durability: 0,
    features: [],
  } as Weapon;
  isAddWeapon.value = true;
  isOpen.value = true;
};

const deleteWeapon = () => {
  if (editedIndex.value) {
    character.value.equipment.weapons.splice(editedIndex.value, 1);
  }
  reset();
};

const addItem = () => {
  if (weapon.value) {
    character.value.equipment.weapons.push(weapon.value);
  }
  reset();
};

const saveWeapon = () => {
  if (!isAddWeapon.value) reset();
  else addItem();
};

const reset = () => {
  editedIndex.value = null;
  isAddWeapon.value = false;
  weapon.value = null;
  isOpen.value = false;
};

const toggleWillpower = (index: number) => {
  if (index <= character.value.willpower.used) {
    // Decrease used points
    character.value.willpower.used = index - 1;
  } else {
    // Increase used points
    character.value.willpower.used = index;
  }
};

const toggleHealth = (index: number) => {
  if (index <= character.value.health.used) {
    // Decrease used points
    character.value.health.used = index - 1;
  } else {
    // Increase used points
    character.value.health.used = index;
  }
};

const toggleDeathRoll = (type: "successess" | "failures", index: number) => {
  if (type === "successess") {
    // Update successes
    character.value.health.death_rolls.successess =
      index <= character.value.health.death_rolls.successess
        ? index - 1
        : index;
  } else if (type === "failures") {
    // Update failures
    character.value.health.death_rolls.failures =
      index <= character.value.health.death_rolls.failures ? index - 1 : index;
  }
};
</script>

<template>
  <div class="flex flex-col md:flex-row m-auto gap-4">
    <div class="flex flex-col gap-4">
      <div class="flex flex-col md:flex-row">
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
      <div
        class="border-2 border-solid rounded-md m-2 gap-2 overflow-x-scroll w-screen md:w-full"
      >
        <UTable :columns="columns" :rows="rows">
          <template #feat-data="{ row }">
            <div class="felx flex-col">
              <div v-for="feat in row.feat" :key="feat">{{ feat }}</div>
            </div>
          </template>
          <template #edit-data="{ row }">
            <UButton icon="i-mdi-pencil" @click="editItem(row.index)" />
          </template>
        </UTable>
        <hr />
        <div class="flex flex-row justify-end p-2">
          <UButton label="Add Item..." @click="addItemInit" />
        </div>
      </div>
    </div>
    <div class="flex flex-col gap-4">
      <div class="flex flex-row gap-4 justify-center">
        <UCheckbox label="Round Rest" v-model="character.rests.round" />
        <UCheckbox label="Stretch Rest" v-model="character.rests.stretch" />
      </div>

      <!-- Willpower -->
      <div class="flex flex-col gap-2">
        <div class="font-bold">Willpower Points</div>
        <div class="flex flex-row gap-2">
          <div>
            <div class="border-2 border-solid rounded-xl p-1">
              <div class="text-lg font-bold">
                <NumberInput v-model="character.willpower.total" />
              </div>
            </div>
          </div>

          <div class="grid grid-cols-10 gap-1">
            <template v-for="i in 20" :key="i">
              <input
                type="checkbox"
                :checked="i <= character.willpower.used"
                :disabled="i > character.willpower.total"
                @change="toggleWillpower(i)"
                class="w-6 h-6 cursor-pointer disabled:cursor-not-allowed"
              />
            </template>
          </div>
        </div>
      </div>

      <!-- Hit Points -->
      <div class="flex flex-col gap-2">
        <div class="font-bold">Health Points</div>
        <div class="flex flex-col justify-center">
          <div class="flex flex-row gap-2">
            <div>
              <div class="border-2 border-solid rounded-xl p-1">
                <div class="text-lg font-bold">
                  <NumberInput v-model="character.health.total" />
                </div>
              </div>
            </div>

            <div class="grid grid-cols-10 gap-1">
              <template v-for="i in 20" :key="i">
                <input
                  type="checkbox"
                  :checked="i <= character.health.used"
                  :disabled="i > character.health.total"
                  @change="toggleHealth(i)"
                  class="w-6 h-6 cursor-pointer disabled:cursor-not-allowed"
                />
              </template>
            </div>
          </div>

          <!-- Death rolls -->
          <div class="flex flex-col gap-2 just">
            <div class="flex flex-row gap-4 items-center justify-center">
              <div class="font-bold">Death Rolls:</div>
              <!-- Successes -->
              <div>
                <div class="text-center font-bold">Successes</div>
                <div class="flex gap-2">
                  <template v-for="i in 3" :key="'success-' + i">
                    <input
                      type="checkbox"
                      :checked="i <= character.health.death_rolls.successess"
                      @change="toggleDeathRoll('successess', i)"
                      class="w-6 h-6 cursor-pointer"
                    />
                  </template>
                </div>
              </div>

              <!-- Failures -->
              <div>
                <div class="text-center font-bold">Failures</div>
                <div class="flex gap-2">
                  <template v-for="i in 3" :key="'failure-' + i">
                    <input
                      type="checkbox"
                      :checked="i <= character.health.death_rolls.failures"
                      @change="toggleDeathRoll('failures', i)"
                      class="w-6 h-6 cursor-pointer"
                    />
                  </template>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <UModal v-model="isOpen">
    <UCard
      :ui="{
        ring: '',
        divide: 'divide-y divide-gray-100 dark:divide-gray-800',
      }"
    >
      <template #header>
        <div class="flex items-center justify-between">
          <h3 class="text-base font-semibold leading-6">
            {{ isAddWeapon ? "Add Weapon" : "Edit Weapon" }}
          </h3>
          <UButton
            color="gray"
            variant="ghost"
            icon="i-heroicons-x-mark-20-solid"
            class="-my-1"
            @click="reset"
          />
        </div>
      </template>
      <div class="flex flex-col gap-2" v-if="weapon">
        <div class="flex flex-row items-center gap-2">
          Name: <UInput v-model="weapon.name" placeholder="name" />
        </div>
        <div class="flex flex-row items-center gap-2">
          Grip:
          <USelect
            :options="[
              { value: 1, label: '1' },
              { value: 2, label: '2' },
            ]"
            v-model="weapon.grip"
          />
        </div>
        <div class="flex flex-row items-center gap-2">
          Range:
          <UInput type="number" v-model="weapon.range" placeholder="range" />ft
        </div>
        <div class="flex flex-row items-center gap-2">
          Damage:
          <USelect :options="diceOptions" v-model="weapon.damage" />
        </div>
        <div class="flex flex-row items-center gap-2">
          Durability:
          <UInput
            type="number"
            v-model="weapon.durability"
            placeholder="range"
          />
        </div>
        <div class="flex flex-row items-center gap-2">
          Features:
          <USelectMenu
            :options="weaponFeatureOptions"
            v-model="selectedWeaponFeatures"
            multiple
            label="Select Features"
          />
        </div>
      </div>
      <template #footer>
        <div class="flex flex-row gap-2 justify-end">
          <UButton @click="saveWeapon" :label="isAddWeapon ? `Add` : `Edit`" />
          <UButton
            v-if="!isAddWeapon"
            @click="deleteWeapon"
            label="Delete"
            variant="outline"
            color="red"
          />
        </div>
      </template>
    </UCard>
  </UModal>
</template>
