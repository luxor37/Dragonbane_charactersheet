<template>
  <div class="relative p-4 border rounded bg-gray-50 flex flex-col gap-2">
    <!-- Edit button in the top-right corner -->

    <UButton
      icon="i-mdi-pencil"
      @click="onEdit"
      class="absolute top-2 right-2"
    />

    <!-- Companion Name -->
    <div class="text-xl font-bold">{{ item.name }}</div>

    <!-- Health -->
    <div class="flex flex-row gap-2">
      <div class="font-bold">Health:</div>
      <div>{{ item.health.remaining }} / {{ item.health.total }}</div>
    </div>

    <!-- Attack -->
    <div class="flex flex-row gap-2">
      <div class="font-bold">Attack:</div>
      <div>{{ item.attack }}</div>
    </div>

    <!-- Stats -->
    <div class="grid grid-cols-2 gap-2">
      <div class="flex flex-row gap-2">
        <div class="font-bold">Awareness:</div>
        <div>{{ item.awareness }}</div>
      </div>
      <div class="flex flex-row gap-2">
        <div class="font-bold">Evade:</div>
        <div>{{ item.evade }}</div>
      </div>
      <div class="flex flex-row gap-2">
        <div class="font-bold">Sneaking:</div>
        <div>{{ item.sneaking }}</div>
      </div>
      <div class="flex flex-row gap-2">
        <div class="font-bold">Movement:</div>
        <div>{{ item.movement }}</div>
      </div>
    </div>

    <!-- Notes -->
    <div class="flex flex-col">
      <div class="font-bold">Notes:</div>
      <div v-if="item.notes && item.notes.length" class="text-sm">
        <div v-for="(note, idx) in item.notes" :key="idx">{{ note }}</div>
      </div>
      <div v-else class="text-sm">No notes</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Companion } from "~/types/sheet";

// Props: item is a Companion, index is its position in the list
const props = defineProps<{
  item: Companion;
  index: number;
}>();

// Emit an "edit" event with the index
const emit = defineEmits<{
  (e: "edit", index: number): void;
}>();

function onEdit() {
  emit("edit", props.index);
}
</script>
