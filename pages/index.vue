<script setup lang="ts">
import { storeToRefs } from "pinia";

definePageMeta({
  colorMode: "light",
});
</script>

<template>
  <File />
  <div class="flex flex-col text-5xl font-bold text-center">Dragon Bane</div>
  <Stats />
  <div class="flex flex-row gap-1 mx-auto">
    <Abilities />
    <Skills />
    <Inventory />
  </div>
  <Gear />
</template>
