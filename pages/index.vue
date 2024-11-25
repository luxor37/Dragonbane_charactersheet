<script setup lang="ts">
import { storeToRefs } from "pinia";
import { AGES, KINS, PROFESSIONS } from "~/types/sheet";

const sheetStore = useSheetStore();
const { character } = storeToRefs(sheetStore);

definePageMeta({
  colorMode: "light",
});

const professionOptions = PROFESSIONS.map((prof) => ({
  value: prof,
  label: prof,
}));

const kinOptions = KINS.map((k) => ({
  value: k,
  label: k,
}));

const ageOption = AGES.map((a) => ({
  value: a,
  label: a,
}));
</script>

<template>
  <File />
  <div class="flex flex-row flex-wrap gap-4 mx-10">
    <div class="md:w-1/3">
      <div class="grid grid-cols-[auto,auto] items-center gap-2">
        <label class="text-right">Kin:</label>
        <div class="flex flex-row items-center gap-2">
          <USelect :options="kinOptions" v-model="character.kin" />

          <label class="text-right">Age:</label>
          <USelect :options="ageOption" v-model="character.age" />
        </div>

        <label class="text-right">Profession:</label>
        <USelect :options="professionOptions" v-model="character.profession" />

        <label class="text-right">Weakness:</label>
        <UTextarea v-model="character.weakness" />
      </div>
    </div>
    <div class="md:w-1/3 flex flex-col text-center justify-center gap-4">
      <div class="text-5xl font-bold">Dragon Bane</div>
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
        <label>Appearance:</label>
        <UTextarea v-model="character.appearance" />
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
</template>
