<script setup lang="ts">
import { marked } from "marked";

const sheetStore = useSheetStore();
const { character } = storeToRefs(sheetStore);

// Manage secondary skills
const isSkillModalOpen = ref(false);
const isEditingSkill = ref(false);
const skillIndex = ref<number | null>(null);
const skillForm = ref({
  name: "",
  skill: { check: 0, upgrade: false },
  description: "",
});

const isDescriptionModalOpen = ref(false);
const selectedDescription = ref("");

const openSkillModal = (index: number | null = null) => {
  if (index !== null) {
    // Edit existing skill
    isEditingSkill.value = true;
    skillIndex.value = index;
    skillForm.value = { ...character.value.skills.secondary[index] };
  } else {
    // Add new skill
    isEditingSkill.value = false;
    skillForm.value = {
      name: "",
      skill: { check: 0, upgrade: false },
      description: "",
    };
  }
  isSkillModalOpen.value = true;
};

const saveSkill = () => {
  if (isEditingSkill.value && skillIndex.value !== null) {
    // Update existing skill
    character.value.skills.secondary[skillIndex.value] = { ...skillForm.value };
  } else {
    // Add new skill
    character.value.skills.secondary.push({ ...skillForm.value });
  }
  closeSkillModal();
};

const deleteSkill = (index: number) => {
  character.value.skills.secondary.splice(index, 1);
};

const closeSkillModal = () => {
  isSkillModalOpen.value = false;
  skillForm.value = {
    name: "",
    skill: { check: 0, upgrade: false },
    description: "",
  };
  skillIndex.value = null;
};

const openDescriptionModal = (description: string) => {
  selectedDescription.value = description;
  isDescriptionModalOpen.value = true;
};
</script>

<template>
  <div class="flex flex-col m-4 border-2 border-solid">
    <div class="font-bold text-xl text-center underline">Skills</div>
    <div class="flex flex-row">
      <!-- Utility Skills -->
      <div class="flex flex-col m-4">
        <ul>
          <li
            v-for="(value, skill) in character.skills.utility"
            :key="skill"
            class="flex flex-row items-center gap-1"
          >
            <UCheckbox v-model="character.skills.utility[skill].upgrade" />
            <NumberInput v-model="character.skills.utility[skill].check" />:
            <div>
              {{ skill.charAt(0).toUpperCase() + skill.slice(1) }}
            </div>
          </li>
        </ul>
      </div>

      <!-- Weapon Skills -->
      <div class="flex flex-col m-4">
        <div class="text-md font-bold">Weapons Skills</div>
        <ul>
          <li
            v-for="(value, skill) in character.skills.weapons"
            :key="skill"
            class="flex flex-row items-center gap-1"
          >
            <UCheckbox v-model="character.skills.weapons[skill].upgrade" />
            <NumberInput v-model="character.skills.weapons[skill].check" /> :
            {{ skill.charAt(0).toUpperCase() + skill.slice(1) }}
          </li>
        </ul>

        <!-- Secondary Skills -->
        <div class="text-md font-bold mt-4">Secondary Skills</div>
        <ul>
          <li
            v-for="(skill, index) in character.skills.secondary"
            :key="skill.name"
            class="flex flex-row items-center gap-2"
          >
            <!-- Skill Check -->
            <UCheckbox
              v-model="character.skills.secondary[index].skill.upgrade"
            />
            <NumberInput
              v-model="character.skills.secondary[index].skill.check"
            />
            :

            <!-- Skill Name with Description -->
            <button
              class="underline text-blue-500"
              @click="openDescriptionModal(skill.description)"
            >
              {{ skill.name.charAt(0).toUpperCase() + skill.name.slice(1) }}
            </button>

            <!-- Edit Button -->
            <UButton
              icon="i-mdi-pencil"
              variant="ghost"
              class="p-0 m-0"
              @click="openSkillModal(index)"
            />
          </li>

          <!-- Add New Skill -->
          <li class="flex flex-row items-center gap-2">
            <UButton
              icon="i-mdi-plus"
              variant="ghost"
              @click="openSkillModal()"
              label="Add Secondary Skill"
            />
          </li>
        </ul>
      </div>
    </div>
  </div>

  <!-- Secondary Skill Modal -->
  <UModal v-model:open="isSkillModalOpen">
    <template #content>
      <UCard>
        <template #header>
          <h3 class="text-lg font-bold">
            {{ isEditingSkill ? "Edit Skill" : "Add Skill" }}
          </h3>
        </template>
        <div class="flex flex-col gap-4">
          <!-- Name -->
          <div class="flex flex-row items-center gap-2">
            <label for="skill-name" class="font-bold">Name:</label>
            <UInput
              id="skill-name"
              type="text"
              v-model="skillForm.name"
              placeholder="Skill Name"
            />
          </div>

          <!-- Check -->
          <div class="flex flex-row items-center gap-2">
            <label for="skill-check" class="font-bold">Check:</label>
            <NumberInput
              id="skill-check"
              v-model="skillForm.skill.check"
              placeholder="Check"
              width-class="w-20"
              :min="0"
            />
          </div>

          <!-- Description -->
          <div class="flex flex-col">
            <label for="skill-description" class="font-bold"
              >Description:</label
            >
            <UTextarea
              id="skill-description"
              v-model="skillForm.description"
              placeholder="Describe the skill"
              :rows="20"
            />
          </div>
        </div>
        <template #footer>
          <div class="flex flex-row gap-2 justify-between">
            <!-- Delete Button (only in edit mode) -->
            <UButton
              v-if="isEditingSkill"
              label="Delete"
              variant="outline"
              color="error"
              @click="
                () => {
                  if (skillIndex !== null) deleteSkill(skillIndex);
                  closeSkillModal();
                }
              "
            />
            <div class="flex flex-row gap-2">
              <!-- Save and Cancel Buttons -->
              <UButton label="Save" @click="saveSkill" />
              <UButton
                label="Cancel"
                variant="outline"
                @click="closeSkillModal"
              />
            </div>
          </div>
        </template>
      </UCard>
    </template>
  </UModal>

  <!-- Description Modal -->
  <UModal v-model:open="isDescriptionModalOpen">
    <template #content>
      <UCard>
        <template #header>
          <h3 class="text-lg font-bold">Skill Description</h3>
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
    </template>
  </UModal>
</template>
