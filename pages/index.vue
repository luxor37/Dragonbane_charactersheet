<script setup lang="ts">
import { storeToRefs } from "pinia";
import { AGES, KINS, PROFESSIONS } from "~/types/sheet";

const sheetStore = useSheetStore();
const { character } = storeToRefs(sheetStore);

interface Option {
  label: string;
  value: any;
}

definePageMeta({
  colorMode: "light",
  middleware: "auth",
});

const professionOptions = computed((): Option[] =>
  PROFESSIONS.map((prof) => ({
    value: prof,
    label: prof,
  }))
);

const kinOptions = computed((): Option[] =>
  KINS.map((k) => ({
    value: k,
    label: k,
  }))
);

const ageOption = computed((): Option[] =>
  AGES.map((a) => ({
    value: a,
    label: a,
  }))
);
</script>

<template>
  <div>
    <GoogleAuthModal />

    <DriveFileManager />
    <!-- <File /> -->
    <div
      class="flex flex-row flex-wrap md:flex-nowrap gap-4 mx-10 justify-center"
      v-if="kinOptions.length > 0 && character.kin"
    >
      <div class="md:w-1/3">
        <div class="flex flex-col items-center gap-2">
          <div class="flex flex-row items-center gap-2">
            <label class="text-right">Kin:</label>
            <USelect :items="kinOptions" v-model="character.kin" />
          </div>
          <div class="flex flex-row items-center gap-2">
            <label class="text-right">Age:</label>
            <USelect :items="ageOption" v-model="character.age" />
          </div>

          <div class="flex flex-row items-center gap-2">
            <label class="text-right">Profession:</label>
            <USelect
              :items="professionOptions"
              v-model="character.profession"
            />
          </div>

          <div>
            <label class="text-right">Weakness:</label>
            <UTextarea v-model="character.weakness" placeholder="Weakness" />
          </div>
        </div>
      </div>
      <div class="md:w-1/3 flex flex-col text-center justify-center gap-4">
        <div class="text-5xl font-bold hidden md:flex">Dragon Bane</div>
        <div class="text-md flex flex-row justify-center">
          <UInput
            type="text"
            v-model="character.name"
            placeholder="Character's name..."
          />
        </div>
      </div>
      <div class="md:w-1/3">
        <div class="grid grid-cols-[auto] items-center gap-2">
          <label class="hidden md:flex">Appearance:</label>
          <UTextarea
            v-model="character.appearance"
            placeholder="Appeareance..."
          />
        </div>
      </div>
    </div>

    <Stats />
    <div class="flex flex-col md:flex-row gap-1 mx-auto">
      <Abilities />
      <Skills />
      <Inventory />
    </div>
    <Gear />
    <Companions />
    <Notes />
  </div>
</template>
