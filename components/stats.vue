<script setup lang="ts">
const dmg_bonus_str = ref<number>(1);
const dmg_bonus_agl = ref<number>(1);
const movement = ref<number>(1);
</script>

<template>
  <div class="flex flex-col m-4">
    <div class="flex flex-row gap-4 mx-auto">
      <StatsNumber
        name="Strenght"
        :stat="14"
        condition="Exhausted"
        :isCondition="true"
      />
      <StatsNumber
        name="Constitution"
        :stat="14"
        condition="Sickly"
        :isCondition="true"
      />
      <StatsNumber
        name="Agility"
        :stat="14"
        condition="Dazed"
        :isCondition="true"
      />
      <StatsNumber
        name="Intelligence"
        :stat="14"
        condition="Angry"
        :isCondition="true"
      />
      <StatsNumber
        name="Willpower"
        :stat="14"
        condition="Scared"
        :isCondition="true"
      />
      <StatsNumber
        name="Charisma"
        :stat="14"
        condition="Disheartened"
        :isCondition="true"
      />
    </div>
    <div class="flex flex-row gap-4 mt-8 mx-auto">
      <div></div>
      <div class="flex flex-row gap-2">
        <span class="underline font-bold">Damage Bonus Strenght:</span>
        <NumberInput v-model="dmg_bonus_str" />
      </div>
      <div class="flex flex-row gap-2">
        <span class="underline font-bold">Damage Bonus Agility:</span>
        <NumberInput v-model="dmg_bonus_agl" />
      </div>
      <div class="flex flex-row gap-2">
        <span class="underline font-bold">Movement:</span>
        <NumberInput v-model="movement" />
      </div>
      <div></div>
    </div>
  </div>
</template>
