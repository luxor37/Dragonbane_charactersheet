<script setup lang="ts">
import type { Ability } from "~/types/sheet";

const abilities = ref<Ability[]>([
  {
    name: "Companion",
    cost: 3,
    description: "Description",
  },
  {
    name: "Hunting Instincts",
    cost: 3,
    description: "Description",
  },
]);

const gold = ref<number>(1);
const silver = ref<number>();
const copper = ref<number>();
</script>

<template>
  <div class="flex flex-col m-4">
    <div class="font-bold text-xl text-center underline">Abilities</div>
    <ul>
      <li v-for="{ name, cost, description } in abilities" :key="name">
        <UTooltip :text="description"> {{ name }} ({{ cost }} w) </UTooltip>
      </li>
    </ul>
    <table class="mt-4">
      <tbody>
        <tr>
          <td class="font-bold">GOLD:</td>
          <td class="text-left w-full pl-2">{{ gold }}</td>
        </tr>
        <tr>
          <td class="font-bold">SILVER:</td>
          <td class="text-left w-full pl-2">{{ silver || "-" }}</td>
        </tr>
        <tr>
          <td class="font-bold">COPPER:</td>
          <td class="text-left w-full pl-2">{{ copper || "-" }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style lang="css" scoped>
table,
th,
td {
  border: 1px solid black;
  border-collapse: collapse;
  padding: 4px;
}
</style>
