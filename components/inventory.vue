<script setup lang="ts">
import type { Gear } from "~/types/sheet";

const cc = ref<number>(14);

const inventory = ref<Gear[]>([
  {
    name: "Sleeping pelt",
  },
  {
    name: "Food rations",
    qty: 6,
  },
]);
</script>

<template>
  <div class="flex flex-col m-4">
    <div class="font-bold text-xl text-center underline">Inventory</div>
    <div class="text-center underline">
      Emcumbrance Limit: <NumberInput v-model="cc" />
    </div>
    <ul class="pl-4">
      <li v-for="{ name, qty } in inventory" :key="name" class="list-disc">
        {{ name }} <span v-if="qty"> (x{{ qty }})</span>
      </li>
    </ul>
    <div class="font-bold mt-4">Memento</div>
    <ul class="pl-4">
      <li v-for="{ name, qty } in inventory" :key="name" class="list-disc">
        {{ name }} <span v-if="qty"> (x{{ qty }})</span>
      </li>
    </ul>
    <div class="border-2 border-solid mt-4 p-2">
      <div class="font-bold">Tiny Items</div>
      <ul>
        <li v-for="{ name, qty } in inventory" :key="name">
          {{ name }} <span v-if="qty"> (x{{ qty }})</span>
        </li>
      </ul>
    </div>
  </div>
</template>
