<script setup lang="ts">
import { marked } from "marked";
const sheetStore = useSheetStore();
const { character } = storeToRefs(sheetStore);

// Manage abilities
const isAbilityModalOpen = ref(false);
const isEditingAbility = ref(false);
const abilityIndex = ref<number | null>(null);
const abilityForm = ref({ name: "", cost: 0, description: "" });

const isDescriptionModalOpen = ref(false);
const selectedDescription = ref("");

const openDescriptionModal = (description: string) => {
  selectedDescription.value = description;
  isDescriptionModalOpen.value = true;
};

const openAbilityModal = (index: number | null = null) => {
  if (index !== null) {
    // Edit existing ability
    isEditingAbility.value = true;
    abilityIndex.value = index;
    abilityForm.value = { ...character.value.abilities[index] };
  } else {
    // Add new ability
    isEditingAbility.value = false;
    abilityForm.value = { name: "", cost: 0, description: "" };
  }
  isAbilityModalOpen.value = true;
};

const saveAbility = () => {
  if (isEditingAbility.value && abilityIndex.value !== null) {
    // Update existing ability
    character.value.abilities[abilityIndex.value] = { ...abilityForm.value };
  } else {
    // Add new ability
    character.value.abilities.push({ ...abilityForm.value });
  }
  closeAbilityModal();
};

const deleteAbility = (index: number) => {
  character.value.abilities.splice(index, 1);
};

const closeAbilityModal = () => {
  isAbilityModalOpen.value = false;
  abilityForm.value = { name: "", cost: 0, description: "" };
  abilityIndex.value = null;
};
</script>

<template>
  <div class="flex flex-col m-4">
    <div class="font-bold text-xl text-center underline">
      Abilities & Spells
    </div>
    <ul>
      <li
        v-for="(ability, index) in character.abilities"
        :key="ability.name"
        class="flex flex-row items-center justify-center md:justify-start gap-2"
      >
        <!-- Ability Display -->
        <button
          class="underline text-blue-500"
          @click="openDescriptionModal(ability.description)"
        >
          {{ ability.name }} ({{ ability.cost }} w)
        </button>

        <!-- Edit Button -->
        <UButton
          icon="i-mdi-pencil"
          variant="ghost"
          class="p-0 m-0"
          @click="openAbilityModal(index)"
        />
      </li>

      <!-- Add New Ability -->
      <li
        class="flex flex-row items-center justify-center md:justify-start gap-2"
      >
        <UButton
          icon="i-mdi-plus"
          variant="ghost"
          @click="openAbilityModal()"
          label="Add Ability"
        />
      </li>
    </ul>

    <div
      class="mt-4 grid grid-cols-2 gap-x-2 gap-y-1 items-center border-2 border-solid rounded-md p-2"
    >
      <!-- GOLD -->
      <div class="font-bold text-right">GOLD:</div>
      <div class="text-left pl-2">
        <NumberInput width-class="w-14" v-model="character.money.gold" />
      </div>

      <!-- SILVER -->
      <div class="font-bold text-right">SILVER:</div>
      <div class="text-left pl-2">
        <NumberInput width-class="w-14" v-model="character.money.silver" />
      </div>

      <!-- COPPER -->
      <div class="font-bold text-right">COPPER:</div>
      <div class="text-left pl-2">
        <NumberInput width-class="w-14" v-model="character.money.copper" />
      </div>
    </div>
  </div>

  <!-- Ability Modal -->
  <UModal v-model="isAbilityModalOpen">
    <UCard>
      <template #header>
        <h3 class="text-lg font-bold">
          {{ isEditingAbility ? "Edit Ability" : "Add Ability" }}
        </h3>
      </template>
      <div class="flex flex-col gap-4">
        <!-- Name -->
        <div class="flex flex-row items-center gap-2">
          <label for="ability-name" class="font-bold">Name:</label>
          <UInput
            id="ability-name"
            type="text"
            v-model="abilityForm.name"
            placeholder="Ability Name"
          />
        </div>

        <!-- Cost -->
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

        <!-- Description -->
        <div class="flex flex-col">
          <label for="ability-description" class="font-bold"
            >Description:</label
          >
          <textarea
            id="ability-description"
            v-model="abilityForm.description"
            placeholder="Describe the ability"
            class="border border-gray-300 rounded-md p-2 w-full"
          />
        </div>
      </div>
      <template #footer>
        <div class="flex flex-row gap-2 justify-between">
          <!-- Delete Button (only in edit mode) -->
          <UButton
            v-if="isEditingAbility"
            label="Delete"
            variant="outline"
            color="red"
            @click="
              () => {
                if (abilityIndex !== null) deleteAbility(abilityIndex);
                closeAbilityModal();
              }
            "
          />
          <div class="flex flex-row gap-2">
            <!-- Save and Cancel Buttons -->
            <UButton label="Save" @click="saveAbility" />
            <UButton
              label="Cancel"
              variant="outline"
              @click="closeAbilityModal"
            />
          </div>
        </div>
      </template>
    </UCard>
  </UModal>

  <!-- Description Modal -->
  <UModal v-model="isDescriptionModalOpen">
    <UCard>
      <template #header>
        <h3 class="text-lg font-bold">Ability Description</h3>
      </template>
      <div class="prose" v-html="marked(selectedDescription)"></div>
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
