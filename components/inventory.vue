<script setup lang="ts">
const sheetStore = useSheetStore();
const { character } = storeToRefs(sheetStore);

// Add new item placeholders
const newItem = ref({ name: "", qty: 0 });
const newMemento = ref("");
const newTinyItem = ref("");
</script>

<template>
  <div class="flex flex-col m-4">
    <div class="font-bold text-xl text-center underline">Inventory</div>
    <div class="text-center underline">
      Emcumbrance Limit: <NumberInput v-model="character.encumbrance_limit" />
    </div>

    <!-- Inventory -->
    <ul class="pl-4">
      <li
        v-for="(item, index) in character.inventory"
        :key="item.name"
        class="list-disc flex flex-row items-center gap-2"
      >
        <!-- Editable Item Name -->
        <UInput
          type="text"
          v-model="item.name"
          placeholder="Item Name"
          variant="none"
          color="white"
          class="w-32"
          :padded="false"
          :ui="{
            placeholder: 'placeholder-gray-400 dark:placeholder-gray-500',
          }"
        />
        <!-- Editable Quantity -->
        <div class="flex flex-row gap-0">
          (x<NumberInput v-model="item.qty" :min="0" />)
        </div>
        <!-- Remove Item -->
        <UButton
          icon="i-mdi-close"
          variant="ghost"
          color="red"
          class="p-0 m-0"
          @click="character.inventory.splice(index, 1)"
        />
      </li>
      <!-- Add New Item -->
      <li class="list-disc flex flex-row items-center gap-2">
        <UInput
          type="text"
          :padded="false"
          v-model="newItem.name"
          placeholder="New Item"
          variant="none"
          color="white"
          padding="px-0 py-0"
          class="w-32"
          :ui="{
            placeholder: 'placeholder-gray-400 dark:placeholder-gray-500',
          }"
        />
        <div class="flex flex-row gap-0">
          (x<NumberInput v-model="newItem.qty" :min="0" />)
        </div>
        <UButton
          icon="i-mdi-plus"
          variant="ghost"
          class="p-0 m-0"
          @click="
            () => {
              if (newItem.name) {
                character.inventory.push({ ...newItem });
                newItem.name = '';
                newItem.qty = 0;
              }
            }
          "
        />
      </li>
    </ul>

    <!-- Mementos -->
    <div class="font-bold mt-4">Memento</div>
    <ul class="pl-4">
      <li
        v-for="(item, index) in character.mementos"
        :key="item.name"
        class="list-disc flex flex-row items-center gap-2"
      >
        <!-- Editable Memento Name -->
        <UInput
          type="text"
          v-model="item.name"
          placeholder="Memento Name"
          variant="none"
          color="white"
          :padded="false"
          :ui="{
            placeholder: 'placeholder-gray-400 dark:placeholder-gray-500',
          }"
        />
        <!-- Remove Memento -->
        <UButton
          icon="i-mdi-close"
          variant="ghost"
          color="red"
          class="p-0 m-0"
          @click="character.mementos.splice(index, 1)"
        />
      </li>
      <!-- Add New Memento -->
      <li class="list-disc flex flex-row items-center gap-2">
        <UInput
          type="text"
          v-model="newMemento"
          placeholder="New Memento"
          variant="none"
          color="white"
          :padded="false"
          :ui="{
            placeholder: 'placeholder-gray-400 dark:placeholder-gray-500',
          }"
        />
        <UButton
          icon="i-mdi-plus"
          variant="ghost"
          class="p-0 m-0"
          @click="
            () => {
              if (newMemento) {
                character.mementos.push({ name: newMemento });
                newMemento = '';
              }
            }
          "
        />
      </li>
    </ul>

    <!-- Tiny Items -->
    <div class="border-2 border-solid mt-4 p-2">
      <div class="font-bold">Tiny Items</div>
      <ul>
        <li
          v-for="(item, index) in character.tiny_items"
          :key="item.name"
          class="list-disc flex flex-row items-center gap-2"
        >
          <!-- Editable Tiny Item Name -->
          <UInput
            type="text"
            v-model="item.name"
            placeholder="Tiny Item Name"
            variant="none"
            color="white"
            :padded="false"
            :ui="{
              placeholder: 'placeholder-gray-400 dark:placeholder-gray-500',
            }"
          />
          <!-- Remove Tiny Item -->
          <UButton
            icon="i-mdi-close"
            variant="ghost"
            color="red"
            class="p-0 m-0"
            @click="character.tiny_items.splice(index, 1)"
          />
        </li>
        <!-- Add New Tiny Item -->
        <li class="list-disc flex flex-row items-center gap-2">
          <UInput
            type="text"
            v-model="newTinyItem"
            placeholder="New Tiny Item"
            variant="none"
            color="white"
            :padded="false"
            :ui="{
              placeholder: 'placeholder-gray-400 dark:placeholder-gray-500',
            }"
          />
          <UButton
            icon="i-mdi-plus"
            variant="ghost"
            class="p-0 m-0"
            @click="
              () => {
                if (newTinyItem) {
                  character.tiny_items.push({ name: newTinyItem });
                  newTinyItem = '';
                }
              }
            "
          />
        </li>
      </ul>
    </div>
  </div>
</template>
