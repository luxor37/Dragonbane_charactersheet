<script setup lang="ts">
import { HEROIC_ABILITIES } from "~/types/heroic_abilities";
import { type Ability, type Spell, SPELL_REQUIREMENTS } from "~/types/sheet";
import {
  ANIMISM_SPELLS,
  BASIC_SPELLS,
  ELEMENTALISM_SPELLS,
  MENTALISM_SPELLS,
} from "~/types/spell";

const sheetStore = useSheetStore();
const { character } = storeToRefs(sheetStore);

/* ============================================================
   Modal State & Forms for Both Items
   ============================================================ */

// active item type: 'ability' or 'spell'
// (Determined by which add button is pressed.)
const activeItemType = ref<"ability" | "spell">("ability");

// Modal open and editing state (shared for both types)
const isModalOpen = ref(false);
const isEditing = ref(false);
const itemIndex = ref<number | null>(null);

// Form state for abilities and spells
const abilityForm = ref<Ability>({ name: "", cost: 0, description: "" });
const spellForm = ref<Spell>({
  name: "",
  rank: 1,
  prerequisite: "",
  requirement: [], // array of selected requirements
  casting_time: "Action",
  range: "Touch",
  duration: "Instant",
  description: "",
});

// Preset toggle state for each type
// For Abilities: preset means Heroic Ability
const usePresetAbility = ref(true);
const selectedPresetAbilityIndex = ref<number | null>(null);

// For Spells: preset means using a preset spell
const usePresetSpell = ref(true);
// Instead of a simple index, we now use a combined string value:
const selectedPresetSpellValue = ref("");

// Compute a combined list of preset spells by category
const allPresetSpells = computed(() => {
  return [
    { category: "Basic", spells: BASIC_SPELLS },
    { category: "Animism", spells: ANIMISM_SPELLS },
    { category: "Elementalism", spells: ELEMENTALISM_SPELLS },
    { category: "Mentalism", spells: MENTALISM_SPELLS },
  ];
});

// Manage description modal for viewing full details
const isDescriptionModalOpen = ref(false);
const selectedItem = ref<Ability | Spell | null>(null);

const openDescriptionModal = (item: Ability | Spell) => {
  selectedItem.value = item;
  // Infer type based on the existence of a 'rank' property.
  activeItemType.value =
    (item as Spell).rank !== undefined ? "spell" : "ability";
  isDescriptionModalOpen.value = true;
};

/* ============================================================
   Open Modal Functions
   ============================================================ */

const openItemModal = (
  index: number | null = null,
  type: "ability" | "spell"
) => {
  activeItemType.value = type;
  if (type === "ability") {
    if (index !== null) {
      isEditing.value = true;
      itemIndex.value = index;
      abilityForm.value = { ...character.value.abilities[index] };
      usePresetAbility.value = false;
      selectedPresetAbilityIndex.value = null;
    } else {
      isEditing.value = false;
      abilityForm.value = { name: "", cost: 0, description: "" };
      usePresetAbility.value = true;
      selectedPresetAbilityIndex.value = null;
    }
  } else {
    // type === "spell"
    if (index !== null) {
      isEditing.value = true;
      itemIndex.value = index;
      spellForm.value = { ...character.value.spells[index] };
      usePresetSpell.value = false;
      selectedPresetSpellValue.value = "";
    } else {
      isEditing.value = false;
      spellForm.value = {
        name: "",
        rank: 1,
        prerequisite: "",
        requirement: [],
        casting_time: "Action",
        range: "Touch",
        duration: "Instant",
        description: "",
      };
      usePresetSpell.value = true;
      selectedPresetSpellValue.value = "";
    }
  }
  isModalOpen.value = true;
};

const selectPresetAbility = () => {
  if (selectedPresetAbilityIndex.value !== null) {
    const preset = HEROIC_ABILITIES[selectedPresetAbilityIndex.value];
    abilityForm.value = { ...preset };
  }
};

const onPresetSpellChange = () => {
  if (selectedPresetSpellValue.value) {
    // The value is in the format "Category-index"
    const [category, indexStr] = selectedPresetSpellValue.value.split("-");
    const index = Number(indexStr);
    let preset: Spell | undefined;
    if (category === "Basic") preset = BASIC_SPELLS[index] as Spell;
    else if (category === "Animism") preset = ANIMISM_SPELLS[index] as Spell;
    else if (category === "Elementalism")
      preset = ELEMENTALISM_SPELLS[index] as Spell;
    else if (category === "Mentalism")
      preset = MENTALISM_SPELLS[index] as Spell;
    if (preset) {
      spellForm.value = { ...preset };
    }
  }
};

const saveItem = () => {
  if (activeItemType.value === "ability") {
    if (isEditing.value && itemIndex.value !== null) {
      character.value.abilities[itemIndex.value] = { ...abilityForm.value };
    } else {
      character.value.abilities.push({ ...abilityForm.value });
    }
  } else {
    if (isEditing.value && itemIndex.value !== null) {
      character.value.spells[itemIndex.value] = { ...spellForm.value };
    } else {
      character.value.spells.push({ ...spellForm.value });
    }
  }
  closeItemModal();
};

const deleteItem = (index: number) => {
  if (activeItemType.value === "ability") {
    character.value.abilities.splice(index, 1);
  } else {
    character.value.spells.splice(index, 1);
  }
};

const closeItemModal = () => {
  isModalOpen.value = false;
  isEditing.value = false;
  itemIndex.value = null;
  abilityForm.value = { name: "", cost: 0, description: "" };
  spellForm.value = {
    name: "",
    rank: 1,
    prerequisite: "",
    requirement: [],
    casting_time: "Action",
    range: "Touch",
    duration: "Instant",
    description: "",
  };
  usePresetAbility.value = true;
  selectedPresetAbilityIndex.value = null;
  usePresetSpell.value = true;
  selectedPresetSpellValue.value = "";
};

// Toggle a requirement for spells
const toggleRequirement = (req: (typeof SPELL_REQUIREMENTS)[number]) => {
  if (spellForm.value.requirement.includes(req)) {
    spellForm.value.requirement = spellForm.value.requirement.filter(
      (r) => r !== req
    );
  } else {
    spellForm.value.requirement.push(req);
  }
};
</script>

<template>
  <div class="flex flex-col m-4 gap-4">
    <div class="font-bold text-xl text-center underline">
      Abilities & Spells
    </div>

    <!-- Abilities List -->
    <div class="flex flex-col gap-2 justify-center">
      <div
        class="font-bold flex flex-row justify-between align-middle items-center"
      >
        <span>Abilities</span>
        <UButton
          icon="i-mdi-plus"
          variant="ghost"
          @click="openItemModal(null, 'ability')"
          label="Add Ability"
        />
      </div>
      <ul>
        <li
          v-for="(ability, index) in character.abilities"
          :key="ability.name"
          class="flex flex-row items-center justify-between gap-2"
        >
          <button
            class="underline text-blue-500"
            @click="openDescriptionModal(ability)"
          >
            {{ ability.name }}
            <span v-if="ability.cost && ability.cost > 0">
              ({{ ability.cost }} w)
            </span>
          </button>
          <UButton
            icon="i-mdi-pencil"
            variant="ghost"
            class="p-0 m-0"
            @click="openItemModal(index, 'ability')"
          />
        </li>
      </ul>
    </div>

    <!-- Spells List -->
    <div class="flex flex-col gap-2 justify-center">
      <div
        class="font-bold flex flex-row justify-between align-middle items-center"
      >
        <span>Spells</span>
        <UButton
          icon="i-mdi-plus"
          variant="ghost"
          @click="openItemModal(null, 'spell')"
          label="Add Spell"
        />
      </div>
      <ul>
        <li
          v-for="(spell, index) in character.spells"
          :key="spell.name"
          class="flex flex-row items-center justify-between gap-2"
        >
          <button
            class="underline text-blue-500"
            @click="openDescriptionModal(spell)"
          >
            {{ spell.name }}
            <span v-if="spell.rank"> (Rank: {{ spell.rank }}) </span>
          </button>
          <UButton
            icon="i-mdi-pencil"
            variant="ghost"
            class="p-0 m-0"
            @click="openItemModal(index, 'spell')"
          />
        </li>
      </ul>
    </div>

    <!-- Money Inputs (unchanged) -->
    <div
      class="grid grid-cols-2 gap-x-2 gap-y-1 items-center border-2 border-solid rounded-md p-2"
    >
      <div class="font-bold text-right">GOLD:</div>
      <div class="text-left pl-2">
        <NumberInput width-class="w-14" v-model="character.money.gold" />
      </div>
      <div class="font-bold text-right">SILVER:</div>
      <div class="text-left pl-2">
        <NumberInput width-class="w-14" v-model="character.money.silver" />
      </div>
      <div class="font-bold text-right">COPPER:</div>
      <div class="text-left pl-2">
        <NumberInput width-class="w-14" v-model="character.money.copper" />
      </div>
    </div>
  </div>

  <!-- Modal for Adding/Editing an Item -->
  <UModal v-model="isModalOpen">
    <UCard>
      <template #header>
        <h3 class="text-lg font-bold">
          {{ isEditing ? "Edit " : "Add " }}
          {{ activeItemType === "ability" ? "Ability" : "Spell" }}
        </h3>
        <!-- Second-level tabs: Preset vs. Custom (only when not editing) -->
        <div v-if="!isEditing" class="mt-2">
          <div v-if="activeItemType === 'ability'" class="flex border-b">
            <button
              class="px-4 py-2 focus:outline-none"
              :class="{
                'border-b-2 border-blue-500 font-bold': usePresetAbility,
              }"
              @click="usePresetAbility = true"
            >
              Heroic Ability
            </button>
            <button
              class="px-4 py-2 focus:outline-none"
              :class="{
                'border-b-2 border-blue-500 font-bold': !usePresetAbility,
              }"
              @click="usePresetAbility = false"
            >
              Custom Ability
            </button>
          </div>
          <div v-else class="flex border-b">
            <button
              class="px-4 py-2 focus:outline-none"
              :class="{
                'border-b-2 border-blue-500 font-bold': usePresetSpell,
              }"
              @click="usePresetSpell = true"
            >
              Preset Spell
            </button>
            <button
              class="px-4 py-2 focus:outline-none"
              :class="{
                'border-b-2 border-blue-500 font-bold': !usePresetSpell,
              }"
              @click="usePresetSpell = false"
            >
              Custom Spell
            </button>
          </div>
        </div>
      </template>

      <div class="flex flex-col gap-4">
        <!-- Content for Ability -->
        <template v-if="activeItemType === 'ability'">
          <template v-if="usePresetAbility">
            <div>
              <label for="preset-select-ability" class="font-bold">
                Select Heroic Ability:
              </label>
              <select
                id="preset-select-ability"
                v-model.number="selectedPresetAbilityIndex"
                @change="selectPresetAbility"
                class="border border-gray-300 rounded-md p-2 w-full"
              >
                <option disabled value="">Select an ability</option>
                <option
                  v-for="(preset, index) in HEROIC_ABILITIES"
                  :key="preset.name"
                  :value="index"
                >
                  {{ preset.name }}
                  <span v-if="preset.cost && preset.cost > 0">
                    ({{ preset.cost }} w)
                  </span>
                </option>
              </select>
              <template v-if="selectedPresetAbilityIndex !== null">
                <CardAbility
                  v-bind="HEROIC_ABILITIES[selectedPresetAbilityIndex]"
                />
              </template>
            </div>
          </template>
          <template v-else>
            <div class="flex flex-row items-center gap-2">
              <label for="ability-name" class="font-bold">Name:</label>
              <UInput
                id="ability-name"
                type="text"
                v-model="abilityForm.name"
                placeholder="Ability Name"
              />
            </div>
            <div class="flex flex-row items-center gap-2">
              <label for="ability-cost" class="font-bold">Cost:</label>
              <NumberInput
                id="ability-cost"
                v-model="abilityForm.cost"
                placeholder="Cost"
                width-class="w-20"
                :min="0"
              />
            </div>
            <div class="flex flex-col">
              <label for="ability-description" class="font-bold">
                Description:
              </label>
              <textarea
                id="ability-description"
                v-model="abilityForm.description"
                placeholder="Describe the ability"
                class="border border-gray-300 rounded-md p-2 w-full"
              />
            </div>
          </template>
        </template>

        <!-- Content for Spell -->
        <template v-else>
          <template v-if="usePresetSpell">
            <div>
              <label for="preset-select-spell" class="font-bold">
                Select Preset Spell:
              </label>
              <select
                id="preset-select-spell"
                v-model="selectedPresetSpellValue"
                @change="onPresetSpellChange"
                class="border border-gray-300 rounded-md p-2 w-full"
              >
                <option disabled value="">Select a spell</option>
                <template
                  v-for="group in allPresetSpells"
                  :key="group.category"
                >
                  <optgroup :label="group.category">
                    <option
                      v-for="(spell, index) in group.spells"
                      :key="spell.name"
                      :value="group.category + '-' + index"
                    >
                      {{ spell.name }} (Rank: {{ spell.rank }})
                    </option>
                  </optgroup>
                </template>
              </select>
              <template v-if="selectedPresetSpellValue">
                <CardSpell v-bind="spellForm" />
              </template>
            </div>
          </template>
          <template v-else>
            <div class="flex flex-row items-center gap-2">
              <label for="spell-name" class="font-bold">Name:</label>
              <UInput
                id="spell-name"
                type="text"
                v-model="spellForm.name"
                placeholder="Spell Name"
              />
            </div>
            <div class="flex flex-row items-center gap-2">
              <label for="spell-rank" class="font-bold">Rank:</label>
              <NumberInput
                id="spell-rank"
                v-model="spellForm.rank"
                placeholder="Rank"
                width-class="w-14"
                :min="1"
              />
            </div>
            <div class="flex flex-row items-center gap-2">
              <label for="spell-prerequisite" class="font-bold"
                >Prerequisite:</label
              >
              <UInput
                id="spell-prerequisite"
                type="text"
                v-model="spellForm.prerequisite"
                placeholder="Spell Prerequisite"
              />
            </div>
            <!-- Toggle buttons for predefined requirements -->
            <div class="flex flex-col">
              <label class="font-bold">Requirement:</label>
              <div class="flex flex-wrap gap-2">
                <button
                  v-for="req in SPELL_REQUIREMENTS"
                  :key="req"
                  @click.prevent="toggleRequirement(req)"
                  :class="{
                    'bg-blue-500 text-white':
                      spellForm.requirement.includes(req),
                    'bg-gray-200 text-black':
                      !spellForm.requirement.includes(req),
                  }"
                  class="px-2 py-1 rounded"
                >
                  {{ req }}
                </button>
              </div>
            </div>
            <div class="flex flex-row items-center gap-2">
              <label for="spell-casting-time" class="font-bold"
                >Casting Time:</label
              >
              <UInput
                id="spell-casting-time"
                type="text"
                v-model="spellForm.casting_time"
                placeholder="Casting Time"
              />
            </div>
            <div class="flex flex-row items-center gap-2">
              <label for="spell-range" class="font-bold">Range:</label>
              <UInput
                id="spell-range"
                type="text"
                v-model="spellForm.range"
                placeholder="Spell Range"
              />
            </div>
            <div class="flex flex-row items-center gap-2">
              <label for="spell-duration" class="font-bold">Duration:</label>
              <UInput
                id="spell-duration"
                type="text"
                v-model="spellForm.duration"
                placeholder="Spell Duration"
              />
            </div>
            <div class="flex flex-col">
              <label for="spell-description" class="font-bold"
                >Description:</label
              >
              <textarea
                id="spell-description"
                v-model="spellForm.description"
                placeholder="Describe the spell"
                class="border border-gray-300 rounded-md p-2 w-full"
              />
            </div>
          </template>
        </template>
      </div>

      <template #footer>
        <div class="flex flex-row gap-2 justify-between">
          <UButton
            v-if="isEditing"
            label="Delete"
            variant="outline"
            color="red"
            @click="
              () => {
                if (itemIndex !== null) deleteItem(itemIndex);
                closeItemModal();
              }
            "
          />
          <div class="flex flex-row gap-2">
            <UButton label="Save" @click="saveItem" />
            <UButton label="Cancel" variant="outline" @click="closeItemModal" />
          </div>
        </div>
      </template>
    </UCard>
  </UModal>

  <!-- Description Modal -->
  <UModal v-model="isDescriptionModalOpen">
    <UCard>
      <template #header>
        <h3 class="text-lg font-bold">
          {{ selectedItem?.name || "Item Description" }}
        </h3>
      </template>
      <div class="prose">
        <CardAbility
          v-if="activeItemType === 'ability' && selectedItem"
          v-bind="(selectedItem as Ability)"
        />
        <CardSpell
          v-else-if="activeItemType === 'spell' && selectedItem"
          v-bind="(selectedItem as Spell)"
        />
      </div>
      <template #footer>
        <UButton
          label="Close"
          variant="outline"
          @click="isDescriptionModalOpen = false"
        />
      </template>
    </UCard>
  </UModal>
</template>
