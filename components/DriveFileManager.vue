<script setup lang="ts">
const authStore = useAuthStore();
const { accessToken } = storeToRefs(authStore);

const sheetStore = useSheetStore();
const { character, fileId } = storeToRefs(sheetStore);
const {
  createCharacterFile,
  updateCharacterFile,
  listCharacterFiles,
  readCharacterFile,
} = useDriveApi();
const { signOut } = useGoogleAuth();

const showSaveAsModal = ref(false);
const showLoadModal = ref(false);
const saveFileName = ref("");
const files = ref<Array<{ id: string; name: string }>>([]);

const handleQuickSave = async () => {
  if (fileId.value) {
    await updateCharacterFile(fileId.value, character.value);
  } else {
    const _fileId = await createCharacterFile(character.value);
    if (_fileId) {
      fileId.value = _fileId;
    }
  }
  alert("Quick save completed!");
};

const handleSaveAsConfirm = async () => {
  const fileName = saveFileName.value.trim();
  if (fileName === "") {
    alert("Please enter a valid file name.");
    return;
  }
  character.value.name = fileName;
  const _fileId = await createCharacterFile(character.value);
  if (_fileId) {
    fileId.value = _fileId;
    alert(`File saved as ${fileName}.dragonbane.json`);
  }
  showSaveAsModal.value = false;
};

const openLoadModal = async () => {
  showLoadModal.value = true;
  const listedFiles = await listCharacterFiles();
  if (listedFiles) {
    files.value = listedFiles.filter((file) =>
      file.name.endsWith(".dragonbane.json")
    );
  }
};

const handleLoadFile = async (_fileId: string) => {
  const characterData = await readCharacterFile(_fileId);
  if (characterData) {
    sheetStore.setCharacter(characterData);
    fileId.value = _fileId;
    alert("Character loaded successfully!");
  } else {
    alert("Failed to load character.");
  }
  showLoadModal.value = false;
};

const handleRestart = async () => {
  await signOut();
  localStorage.clear();
  window.location.reload();
};
</script>

<template>
  <div class="flex flex-wrap gap-4 p-4 justify-center">
    <!-- Quick Save -->
    <UButton
      label="Quick Save"
      icon="i-mdi-content-save"
      @click="handleQuickSave"
      class="bg-blue-500 hover:bg-blue-600 text-white"
    />
    <!-- Save As -->
    <UButton
      label="Save As..."
      icon="i-mdi-content-save-outline"
      @click="
        () => {
          showSaveAsModal = true;
        }
      "
      class="bg-blue-500 hover:bg-blue-600 text-white"
    />
    <!-- Load -->
    <UButton
      label="Load"
      icon="i-mdi-folder-open"
      @click="openLoadModal"
      class="bg-blue-500 hover:bg-blue-600 text-white"
    />
    <UButton
      v-if="accessToken !== null"
      :label="`Logout`"
      icon="i-mdi-logout"
      @click="handleRestart"
      class="bg-red-500 hover:bg-red-600 text-white"
    />
  </div>

  <!-- Save As Modal -->
  <UModal
    v-model:open="showSaveAsModal"
    closeable
    class="max-w-md mx-auto"
    overlay-class="bg-black/50"
  >
    <template #content>
      <UCard>
        <template #header>
          <h3 class="text-xl font-bold">Save As</h3>
        </template>
        <UInput
          type="text"
          v-model="saveFileName"
          placeholder="Enter file name"
        />
        <template #footer>
          <div class="flex justify-end gap-2">
            <UButton
              label="Cancel"
              variant="solid"
              @click="showSaveAsModal = false"
            />
            <UButton label="Save" @click="handleSaveAsConfirm" />
          </div>
        </template>
      </UCard>
    </template>
  </UModal>

  <!-- Load Modal -->
  <UModal
    v-model:open="showLoadModal"
    closeable
    class="max-w-md mx-auto"
    overlay-class="bg-black/50"
  >
    <template #content>
      <UCard>
        <template #header>
          <h3 class="text-xl font-bold">Load Character</h3>
        </template>
        <ul class="divide-y divide-gray-200" v-if="files.length > 0">
          <li
            v-for="file in files"
            :key="file.id"
            class="py-2 flex justify-between items-center"
          >
            <span>{{ file.name }}</span>
            <UButton label="Load" size="sm" @click="handleLoadFile(file.id)" />
          </li>
        </ul>
        <div v-else>No '.dragonbane.json' detected</div>
        <template #footer>
          <div class="flex justify-end">
            <UButton
              label="Close"
              variant="solid"
              @click="showLoadModal = false"
            />
          </div>
        </template>
      </UCard>
    </template>
  </UModal>
</template>
