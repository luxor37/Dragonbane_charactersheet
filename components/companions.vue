<script setup lang="ts">
import { ref } from "vue";
import { useSheetStore } from "~/stores/sheet";
import { DICE_VALUES, type Dice } from "~/types/sheet";

const sheetStore = useSheetStore();
const { character } = storeToRefs(sheetStore);

// Modal management
const isCompanionModalOpen = ref(false);
const isEditingCompanion = ref(false);
const companionIndex = ref<number | null>(null);
const companionForm = ref({
  name: "",
  health: { total: 0, remaining: 0 },
  attack: "d6" as Dice, // Default to "d6"
  awareness: 0,
  evade: 0,
  sneaking: 0,
  movement: 0,
  notes: [""],
});

// Dice options
const diceOptions = DICE_VALUES.map((value) => ({
  value: value,
  label: value,
}));

const openCompanionModal = (index: number | null = null) => {
  if (index !== null) {
    // Edit existing companion
    isEditingCompanion.value = true;
    companionIndex.value = index;
    companionForm.value = { ...character.value.companions[index] };
  } else {
    // Add new companion
    isEditingCompanion.value = false;
    companionForm.value = {
      name: "",
      health: { total: 0, remaining: 0 },
      attack: "d6",
      awareness: 0,
      evade: 0,
      sneaking: 0,
      movement: 0,
      notes: [""],
    };
  }
  isCompanionModalOpen.value = true;
};

const saveCompanion = () => {
  if (isEditingCompanion.value && companionIndex.value !== null) {
    // Update existing companion
    character.value.companions[companionIndex.value] = {
      ...companionForm.value,
    };
  } else {
    // Add new companion
    character.value.companions.push({ ...companionForm.value });
  }
  closeCompanionModal();
};

const deleteCompanion = (index: number) => {
  character.value.companions.splice(index, 1);
};

const closeCompanionModal = () => {
  isCompanionModalOpen.value = false;
  companionForm.value = {
    name: "",
    health: { total: 0, remaining: 0 },
    attack: "d6",
    awareness: 0,
    evade: 0,
    sneaking: 0,
    movement: 0,
    notes: [""],
  };
  companionIndex.value = null;
};
</script>

<template>
  <div class="flex flex-col m-4">
    <div class="font-bold text-xl text-center underline">Companions</div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
      <CardCompanion
        v-for="(companion, index) in character.companions"
        :key="companion.name + index"
        :item="companion"
        :index="index"
        @edit="openCompanionModal"
      />
    </div>

    <!-- Add New Companion Button -->
    <div class="flex justify-end mt-4">
      <UButton
        icon="i-mdi-plus"
        label="Add Companion"
        @click="openCompanionModal()"
      />
    </div>

    <!-- Companion Modal -->
    <UModal v-model:open="isCompanionModalOpen">
      <template #content>
        <UCard>
          <template #header>
            <h3 class="text-lg font-bold">
              {{ isEditingCompanion ? "Edit Companion" : "Add Companion" }}
            </h3>
          </template>
          <div class="flex flex-col gap-4">
            <!-- Name -->
            <div class="flex flex-row items-center gap-2">
              <label for="companion-name" class="font-bold">Name:</label>
              <UInput
                id="companion-name"
                type="text"
                v-model="companionForm.name"
                placeholder="Companion Name"
              />
            </div>

            <!-- Health -->
            <div class="flex flex-row items-center gap-2">
              <label class="font-bold">Health:</label>
              <NumberInput
                v-model="companionForm.health.remaining"
                placeholder="Remaining"
                width-class="w-14"
                :min="0"
              />
              /
              <NumberInput
                v-model="companionForm.health.total"
                placeholder="Total"
                width-class="w-14"
                :min="0"
              />
            </div>

            <!-- Attack -->
            <div class="flex flex-row items-center gap-2">
              <label class="font-bold">Attack:</label>
              <USelect
                :items="diceOptions"
                v-model="companionForm.attack"
                placeholder="Select Attack Dice"
              />
            </div>

            <!-- Stats -->
            <div class="grid grid-cols-2 gap-2">
              <div class="flex flex-row items-center gap-2">
                <label class="font-bold">Awareness:</label>
                <NumberInput
                  v-model="companionForm.awareness"
                  placeholder="Awareness"
                  width-class="w-14"
                  :min="0"
                />
              </div>
              <div class="flex flex-row items-center gap-2">
                <label class="font-bold">Evade:</label>
                <NumberInput
                  v-model="companionForm.evade"
                  placeholder="Evade"
                  width-class="w-14"
                  :min="0"
                />
              </div>
              <div class="flex flex-row items-center gap-2">
                <label class="font-bold">Sneaking:</label>
                <NumberInput
                  v-model="companionForm.sneaking"
                  placeholder="Sneaking"
                  width-class="w-14"
                  :min="0"
                />
              </div>
              <div class="flex flex-row items-center gap-2">
                <label class="font-bold">Movement:</label>
                <NumberInput
                  v-model="companionForm.movement"
                  placeholder="Movement"
                  width-class="w-14"
                  :min="0"
                />
              </div>
            </div>

            <!-- Notes -->
            <div>
              <label class="font-bold">Notes:</label>
              <textarea
                v-model="companionForm.notes[0]"
                placeholder="Companion Notes"
                class="border border-gray-300 rounded-md p-2 w-full"
              />
            </div>
          </div>
          <template #footer>
            <div class="flex flex-row gap-2 justify-between">
              <!-- Delete Button (only in edit mode) -->
              <UButton
                v-if="isEditingCompanion"
                label="Delete"
                variant="outline"
                color="error"
                @click="
                  () => {
                    if (companionIndex !== null)
                      deleteCompanion(companionIndex);
                    closeCompanionModal();
                  }
                "
              />
              <div class="flex flex-row gap-2">
                <!-- Save and Cancel Buttons -->
                <UButton label="Save" @click="saveCompanion" />
                <UButton
                  label="Cancel"
                  variant="outline"
                  @click="closeCompanionModal"
                />
              </div>
            </div>
          </template>
        </UCard>
      </template>
    </UModal>
  </div>
</template>
