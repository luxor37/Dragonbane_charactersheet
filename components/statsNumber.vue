<script setup lang="ts">
interface Props {
  stat: number;
  name: string;
  condition: string;
  isCondition: boolean;
}

const props = defineProps<Props>();

const emits = defineEmits(["update:stat", "update:isCondition"]);

// Local refs for internal reactivity
const stat = ref<number>(props.stat);
const isCondition = ref<boolean>(props.isCondition);

// Watch for changes to emit updates back to the parent
watch(stat, (newValue) => {
  emits("update:stat", newValue);
});

watch(isCondition, (newValue) => {
  emits("update:isCondition", newValue);
});
</script>

<template>
  <div class="flex-col text-center">
    <div class="text-3xl font-bold text-center">
      <NumberInput v-model="stat" width-class="w-14" />
    </div>
    <div class="font-bold">{{ props.name }}</div>
    <div class="flex flex-row justify-center align-middle items-center gap-1">
      {{ props.condition }}:<UCheckbox v-model="isCondition" />
    </div>
  </div>
</template>
