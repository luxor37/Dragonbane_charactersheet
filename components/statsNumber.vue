<script setup lang="ts">
interface Props {
  stat: number;
  name: string;
  condition: string;
  isCondition: boolean;
}

const props = defineProps<Props>();

const emits = defineEmits(["update:stat", "update:isCondition"]);
</script>

<template>
  <div class="flex-col text-center">
    <div class="text-3xl font-bold text-center">
      <NumberInput
        v-model="props.stat"
        width-class="w-14"
        @update:modelValue="(value) => emits('update:stat', value)"
      />
    </div>
    <div class="font-bold">{{ props.name }}</div>
    <div class="flex flex-row justify-center align-middle items-center gap-1">
      {{ props.condition }}:
      <UCheckbox
        v-model="props.isCondition"
        @update:modelValue="(value) => emits('update:isCondition', value)"
      />
    </div>
  </div>
</template>
