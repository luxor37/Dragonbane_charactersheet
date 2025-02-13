<template>
  <div class="mt-2 p-2 border rounded bg-gray-50">
    <div class="flex flex-row gap-2 align-middle" v-if="requirement">
      <div class="font-bold">Requirement:</div>
      <div>{{ requirement }}</div>
    </div>
    <div class="flex flex-row gap-2 align-middle" v-if="cost && cost > 0">
      <div class="font-bold">Cost:</div>
      <div>{{ cost }} w</div>
    </div>
    <div v-if="description">
      <strong>Description:</strong>
      <p>{{ description }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Ability } from "~/types/sheet";

defineProps<Ability>();
</script>
