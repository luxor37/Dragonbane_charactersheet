<template>
  <div class="flex flex-col gap-2">
    <!-- Title -->
    <div class="font-bold text-lg">{{ label }}</div>

    <!-- Total Points and Used Points -->
    <div class="flex flex-row gap-2">
      <div>
        <div class="border-2 border-solid rounded-xl p-1">
          <!-- Editable total points -->
          <NumberInput v-model="localTotal" class="text-lg font-bold" />
        </div>
      </div>
      <div class="grid grid-cols-10 gap-1">
        <template v-for="i in 20" :key="i">
          <input
            type="checkbox"
            :checked="i <= used"
            :disabled="i > localTotal"
            @change="() => toggle(i)"
            class="w-6 h-6 cursor-pointer disabled:cursor-not-allowed"
          />
        </template>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Define the props interface inline:
interface PointsCardProps {
  label: string;
  total: number;
  used: number;
  // A callback that is called with the clicked index (1 to 20)
  toggle: (index: number) => void;
}

const props = defineProps<PointsCardProps>();
const emit = defineEmits<{
  (e: "update:total", newTotal: number): void;
}>();

// Create a local copy for the total so that the input can be edited.
const localTotal = ref(props.total);

// When localTotal changes, emit an update so that the parent can update its data.
watch(localTotal, (newVal) => {
  emit("update:total", newVal);
});
</script>
