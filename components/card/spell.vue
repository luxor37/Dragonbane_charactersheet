<template>
  <div class="p-4 border rounded bg-gray-50">
    <!-- Spell Name -->
    <div class="text-xl font-bold">{{ name }}</div>

    <!-- Spell Properties Inline -->
    <div class="flex flex-row gap-2">
      <div class="font-bold">Rank:</div>
      <div>{{ rank }}</div>
    </div>
    <div v-if="prerequisite" class="flex flex-row gap-2">
      <div class="font-bold">Prerequisite:</div>
      <div>{{ prerequisite }}</div>
    </div>
    <div v-if="requirement && requirement.length" class="flex flex-row gap-2">
      <div class="font-bold">Requirement:</div>
      <div>
        <span v-for="(req, i) in requirement" :key="i">
          {{ req }}<span v-if="i !== requirement.length - 1">, </span>
        </span>
      </div>
    </div>
    <div class="flex flex-row gap-2">
      <div class="font-bold">Casting Time:</div>
      <div>{{ casting_time }}</div>
    </div>
    <div class="flex flex-row gap-2">
      <div class="font-bold">Range:</div>
      <div>{{ range }}</div>
    </div>
    <div class="flex flex-row gap-2">
      <div class="font-bold">Duration:</div>
      <div>{{ duration }}</div>
    </div>

    <!-- Description on its own -->
    <div class="mt-4">
      <div class="font-bold">Description:</div>
      <div class="mt-1" v-html="description"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Spell } from "~/types/sheet";

defineProps<Spell>();
</script>
