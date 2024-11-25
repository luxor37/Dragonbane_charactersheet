<script setup lang="ts">
import { ref } from "vue";
import { marked } from "marked";
import { useSheetStore } from "~/stores/sheet";

const sheetStore = useSheetStore();
const { character } = storeToRefs(sheetStore);

const newNote = ref("");
const draggedNoteIndex = ref<number | null>(null);
const dropIndex = ref<number | null>(null);
const editingIndex = ref<number | null>(null);
const editingContent = ref(""); // Temporary storage for note content during editing

// Add a new note
const addNote = () => {
  if (newNote.value.trim()) {
    character.value.notes.push(newNote.value.trim());
    newNote.value = "";
  }
};

// Delete a note
const deleteNote = (index: number) => {
  character.value.notes.splice(index, 1);
  editingIndex.value = null;
};

// Handle drag start
const onDragStart = (index: number) => {
  if (editingIndex.value === null) {
    draggedNoteIndex.value = index;
  }
};

// Handle drop
const onDrop = (index: number) => {
  if (draggedNoteIndex.value !== null && draggedNoteIndex.value !== index) {
    const notes = [...character.value.notes];
    const draggedNote = notes[draggedNoteIndex.value];
    notes.splice(draggedNoteIndex.value, 1); // Remove dragged note
    notes.splice(index, 0, draggedNote); // Insert dragged note at new position
    character.value.notes = notes;
  }
  draggedNoteIndex.value = null;
  dropIndex.value = null;
};

// Prevent default behavior during dragover
const onDragOver = (event: DragEvent, index: number) => {
  event.preventDefault();
  dropIndex.value = index;
};

// Handle drag leave to clear drop indicator
const onDragLeave = () => {
  dropIndex.value = null;
};

// Enter edit mode
const startEditing = (index: number) => {
  editingIndex.value = index;
  editingContent.value = character.value.notes[index]; // Set temporary content
};

// Save edited note
const saveNote = () => {
  if (editingIndex.value !== null) {
    character.value.notes[editingIndex.value] = editingContent.value.trim();
    editingIndex.value = null;
  }
};

// Cancel editing
const cancelEditing = () => {
  editingIndex.value = null;
  editingContent.value = "";
};
</script>

<template>
  <div class="flex flex-col m-4">
    <div class="font-bold text-xl text-center underline">Notes</div>

    <!-- Notes Grid -->
    <div class="grid grod-col-1 md:grid-cols-3 gap-4 mt-4">
      <div
        v-for="(note, index) in character.notes"
        :key="note"
        class="p-2 border rounded-md shadow-md bg-white flex flex-col relative"
        :class="{ 'ring-2 ring-blue-400': dropIndex === index }"
        :draggable="editingIndex !== index"
        @dragstart="editingIndex !== index && onDragStart(index)"
        @dragover="(e) => editingIndex !== index && onDragOver(e, index)"
        @dragleave="editingIndex !== index && onDragLeave"
        @drop="editingIndex !== index && onDrop(index)"
      >
        <!-- Drag Handle -->
        <div
          v-if="editingIndex !== index"
          class="absolute top-2 left-2 cursor-grab bg-gray-200 p-1 rounded-md flex items-center"
          @mousedown.prevent
          draggable="true"
          @dragstart="editingIndex !== index && onDragStart(index)"
        >
          <i class="i-mdi-drag-horizontal text-gray-600"></i>
        </div>

        <!-- Note Content -->
        <template v-if="editingIndex === index">
          <UTextarea
            v-model="editingContent"
            placeholder="Edit note..."
            class="w-full border border-gray-300 resize-none outline-none"
          />
          <div class="flex gap-2 mt-2">
            <UButton label="Save" variant="solid" @click="saveNote" />
            <UButton label="Cancel" variant="outline" @click="cancelEditing" />
            <UButton
              label="Delete"
              variant="outline"
              color="red"
              @click="deleteNote(index)"
            />
          </div>
        </template>
        <template v-else>
          <div
            class="prose notes mt-2 cursor-pointer"
            v-html="marked(note)"
            @click="startEditing(index)"
          ></div>
        </template>
      </div>
    </div>

    <!-- Add New Note -->
    <div class="flex gap-2 mt-4">
      <UTextarea
        v-model="newNote"
        placeholder="Enter a new note"
        class="flex-grow"
      />
      <UButton
        icon="i-mdi-plus"
        label="Add Note"
        variant="solid"
        @click="addNote"
      />
    </div>
  </div>
</template>

<style scoped>
/* Optional styling for drag feedback and grid layout */
[draggable="true"] {
  cursor: grab;
}
[draggable="true"]:active {
  cursor: grabbing;
  opacity: 0.8;
}
.prose {
  /* max-height: 200px; */
  overflow-y: none;
}

textarea {
  font-family: inherit;
  font-size: 1rem;
}
</style>

<style>
.prose.notes {
  ul {
    li {
      padding: 0 !important;
      margin: 0 !important;
      font-size: 12pt;
      line-height: 1rem;
    }
  }

  h1,
  h2,
  h3,
  h4,
  h5 {
    margin: 0 !important;
    padding: 0 !important;
  }
}
</style>
