<template>
  <div class="flex flex-col gap-2">
    <div class="flex flex-row gap-4 items-center justify-center">
      <div class="font-bold">Death Rolls:</div>
      <div>
        <div class="text-center font-bold">Successes</div>
        <div class="flex gap-2">
          <template v-for="i in 3" :key="'success-' + i">
            <input
              type="checkbox"
              :checked="i <= successes"
              @change="handleSuccess(i)"
              class="w-6 h-6 cursor-pointer"
            />
          </template>
        </div>
      </div>
      <div>
        <div class="text-center font-bold">Failures</div>
        <div class="flex gap-2">
          <template v-for="i in 3" :key="'failure-' + i">
            <input
              type="checkbox"
              :checked="i <= failures"
              @change="handleFailure(i)"
              class="w-6 h-6 cursor-pointer"
            />
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  successes: number;
  failures: number;
  toggleSuccess: (i: number) => void;
  toggleFailure: (i: number) => void;
}>();

function handleSuccess(i: number) {
  props.toggleSuccess(i);
}

function handleFailure(i: number) {
  props.toggleFailure(i);
}
</script>
