<script setup>
import { defineProps, defineEmits } from "vue";

defineProps({
  modelValue: {
    type: [Number, String],
    required: true,
  },
});

defineEmits(["update:modelValue"]);
</script>

<template>
  <div class="flex flex-col text-center justify-start">
    <div class="border-2 border-solid rounded-xl p-1">
      <div class="text-lg font-bold">
        <NumberInput
          :modelValue="modelValue"
          @update:modelValue="$emit('update:modelValue', $event)"
        />
      </div>
      <div class="text-xs">Armor Rating</div>
    </div>
  </div>
</template>
