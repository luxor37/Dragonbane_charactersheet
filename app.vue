<script setup lang="ts">
import { en } from "@nuxt/ui/locale";
</script>

<template>
  <Body>
    <VitePwaManifest />
    <NuxtLayout>
      <UApp :locale="en">
        <NuxtPage />
      </UApp>
    </NuxtLayout>
  </Body>
</template>

<style>
/* .page-enter-active,
.page-leave-active {
  transition: all 0.5s;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
} */
</style>
