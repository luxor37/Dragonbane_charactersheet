<script setup>
import { defineProps, defineEmits } from "vue";

// Define props and emits
defineProps({
  modelValue: {
    type: [Number, String],
    required: true,
  },
  widthClass: {
    type: String,
    default: "w-5", // Default width class
  },
});

defineEmits(["update:modelValue"]);

/**
 * Explanation:
 * - `modelValue`: Prop to bind input value (v-model).
 * - `update:modelValue`: Emit event to sync data with parent.
 * - `widthClass`: Prop to pass a custom width class for flexibility.
 */
</script>

<template>
  <input
    type="number"
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
    :class="`text-center appearance-none focus:outline-none focus:ring focus:ring-blue-300 ${widthClass}`"
  />
</template>

<style scoped>
/* Remove spinner buttons for Firefox */
input[type="number"] {
  -moz-appearance: textfield;
  appearance: textfield;
}

/* Remove spinner buttons for WebKit browsers */
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  display: none;
}
</style>
