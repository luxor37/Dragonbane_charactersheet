<script setup lang="ts">
import { useSheetStore } from "~/stores/sheet";

const sheetStore = useSheetStore();

onMounted(() => {});
</script>

<template>
  <div class="min-h-screen flex flex-col justify-between bg-black">
    <div class="justify-center flex flex-col max-w-7xl mx-auto w-full bg-white">
      <slot />
    </div>
    <div class="text-white bg-primary flex flex-col items-center py-4">
      <div>
        ©
        <a
          class="underline text-white"
          href="https://www.rmartel.dev"
          target="_blank"
          >Rémi Martel</a
        >, {{ new Date().getFullYear() }}. Tous droits réservés.
      </div>
      <div>
        <a
          class="underline text-white"
          href="https://github.com/luxor37/Dragonbane_charactersheet"
          target="_blank"
          >Projet Github</a
        >
      </div>
    </div>
  </div>
</template>
