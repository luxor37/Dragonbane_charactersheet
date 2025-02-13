<template>
  <div class="flex flex-col gap-2">
    <div class="flex flex-row gap-2">
      <!-- Use common ArmorRating for the armor_rating field -->
      <ArmorRating v-model="localItem.armor_rating" />
      <div class="flex flex-col">
        <div class="font-bold">
          {{ mode === "helmet" ? "Helmet" : "Armor" }}
        </div>
        <UInput type="text" v-model="localItem.name" />
      </div>
    </div>
    <div class="flex flex-row gap-2">
      <div class="font-bold">Bane on:</div>
      <template v-if="mode === 'helmet'">
        <UCheckbox v-model="bane.awareness" label="Awareness" />
        <UCheckbox v-model="bane.ranged_attacks" label="Ranged Attacks" />
      </template>
      <template v-else>
        <UCheckbox v-model="bane.acrobatics" label="Acrobatics" />
        <UCheckbox v-model="bane.evade" label="Evade" />
        <UCheckbox v-model="bane.sneaking" label="Sneaking" />
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, watch, computed } from "vue";
import type { Armor, Helmet } from "~/types/sheet";

// Define props: item can be either an Armor or Helmet, and mode indicates which one.
const props = defineProps<{
  item: Armor | Helmet;
  mode: "helmet" | "armor";
}>();

const emit = defineEmits<{
  (e: "update:item", newItem: Armor | Helmet): void;
}>();

// Create a local reactive copy of the passed item.
const localItem = reactive({ ...props.item });

// Create a computed property that casts the bane object according to the mode.
const bane = computed(() => {
  return props.mode === "helmet"
    ? (localItem.bane as Helmet["bane"])
    : (localItem.bane as Armor["bane"]);
});

// Watch localItem and emit update events so the parent is kept in sync.
watch(
  localItem,
  (newVal) => {
    emit("update:item", newVal);
  },
  { deep: true }
);
</script>
