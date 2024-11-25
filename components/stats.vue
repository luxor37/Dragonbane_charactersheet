<script setup lang="ts">
const sheetStore = useSheetStore();
const { character } = storeToRefs(sheetStore);
</script>
<template>
  <div class="flex flex-col m-4">
    <div class="flex flex-row gap-4 mx-auto">
      <StatsNumber
        name="Strenght"
        v-model:stat="character.stats.strenght"
        condition="Exhausted"
        v-model:isCondition="character.conditions.exhausted"
      />
      <StatsNumber
        name="Constitution"
        v-model:stat="character.stats.constitution"
        condition="Sickly"
        v-model:isCondition="character.conditions.sickly"
      />
      <StatsNumber
        name="Agility"
        v-model:stat="character.stats.agility"
        condition="Dazed"
        v-model:isCondition="character.conditions.dazed"
      />
      <StatsNumber
        name="Intelligence"
        v-model:stat="character.stats.intelligence"
        condition="Angry"
        v-model:isCondition="character.conditions.angry"
      />
      <StatsNumber
        name="Willpower"
        v-model:stat="character.stats.willpower"
        condition="Scared"
        v-model:isCondition="character.conditions.scared"
      />
      <StatsNumber
        name="Charisma"
        v-model:stat="character.stats.charisma"
        condition="Disheartened"
        v-model:isCondition="character.conditions.disheartened"
      />
    </div>
    <div class="flex flex-row gap-4 mt-8 mx-auto">
      <div></div>
      <div class="flex flex-row gap-2">
        <span class="underline font-bold">Damage Bonus Strenght:</span>
        <NumberInput v-model="character.damage_bonus.strenght" />
      </div>
      <div class="flex flex-row gap-2">
        <span class="underline font-bold">Damage Bonus Agility:</span>
        <NumberInput v-model="character.damage_bonus.agility" />
      </div>
      <div class="flex flex-row gap-2">
        <span class="underline font-bold">Movement:</span>
        <NumberInput v-model="character.movement" />
      </div>
      <div></div>
    </div>
  </div>
</template>
