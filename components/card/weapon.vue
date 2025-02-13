<template>
  <div class="relative p-4 border rounded bg-gray-50 flex flex-col">
    <!-- Weapon Name -->
    <div class="font-bold text-xl mb-2">{{ item.name }}</div>

    <UButton
      icon="i-mdi-pencil"
      @click="onEdit"
      class="absolute top-2 right-2"
    />

    <!-- Grip -->
    <div class="flex flex-row gap-2 mb-1">
      <div class="font-bold">Grip:</div>
      <div>{{ item.grip }}</div>
    </div>

    <!-- Range -->
    <div class="flex flex-row gap-2 mb-1">
      <div class="font-bold">Range:</div>
      <div>{{ item.range }} m</div>
    </div>

    <!-- Strength -->
    <div class="flex flex-row gap-2 mb-1">
      <div class="font-bold">Strength:</div>
      <div>{{ item.strength !== undefined ? item.strength : "-" }}</div>
    </div>

    <!-- Damage -->
    <div class="flex flex-row gap-2 mb-1">
      <div class="font-bold">Damage:</div>
      <div>{{ item.dices }}{{ item.damage }}</div>
    </div>

    <!-- Durability -->
    <div class="flex flex-row gap-2 mb-1">
      <div class="font-bold">Durability:</div>
      <div>{{ item.durability }}</div>
    </div>

    <!-- Features -->
    <div class="flex flex-col mb-1">
      <div class="font-bold">Features:</div>
      <div class="text-sm">
        <span v-if="item.features && item.features.length">
          {{ item.features.join(", ") }}
        </span>
        <span v-else>-</span>
      </div>
    </div>

    <!-- Description -->
    <div class="flex flex-col">
      <div class="font-bold">Description:</div>
      <div class="text-sm">{{ item.description }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Weapon } from "~/types/sheet";

const props = defineProps<{
  item: Weapon;
  index: number;
}>();

const emit = defineEmits<{
  (e: "edit", index: number): void;
}>();

function onEdit() {
  emit("edit", props.index);
}
</script>
