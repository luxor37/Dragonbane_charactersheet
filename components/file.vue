<script setup lang="ts">
const sheetStore = useSheetStore();

// Handle file input change
const handleImport = (event: Event) => {
  const input = event.target as HTMLInputElement;
  if (input?.files && input.files[0]) {
    const file = input.files[0];
    sheetStore.importData(file);
  }
};

// Export confirmation
const handleExport = () => {
  sheetStore.exportData();
  alert("Character data has been exported successfully!");
};
</script>

<template>
  <div class="flex flex-row gap-4 m-4 items-center">
    <!-- Import Button -->
    <div>
      <label
        for="file-import"
        class="text-md cursor-pointer flex flex-row items-center gap-2 bg-green-500 text-white px-2 py-1 rounded-md hover:bg-green-600"
      >
        <UIcon name="i-mdi-import" />Import...
      </label>
      <input
        id="file-import"
        type="file"
        accept="application/json"
        class="hidden"
        @change="handleImport"
      />
    </div>

    <!-- Export Button -->
    <div>
      <UButton
        label="Export..."
        icon="i-mdi-export"
        @click="handleExport"
        class="bg-green-500 text-white hover:bg-green-600"
      />
    </div>
    <div>Be sure to export your character before leaving!</div>
  </div>
</template>
