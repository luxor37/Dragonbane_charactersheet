<template>
  <div class="min-h-screen flex flex-col justify-between bg-black">
    <div class="justify-center flex flex-col max-w-5xl mx-auto w-full bg-white">
      <slot />
    </div>
    <div class="bg-primary flex flex-col items-center py-4">
      <div>
        <span>©</span>
        <UButton
          variant="link"
          to="https://www.rmartel.dev"
          color="white"
          target="_blank"
          :padded="false"
          label="Rémi Martel"
        />
        <span>
          {{ `, ${new Date().getFullYear()}. Tous droits réservés.` }}
        </span>
      </div>
      <div>
        <UButton
          variant="link"
          color="white"
          to="/privacypolicy"
          label="Privacy policy"
        />
        <UButton
          variant="link"
          to="/termsandconditions"
          color="white"
          label="Terms and Conditions"
        />
      </div>
      <div>
        <UButton
          variant="link"
          to="https://github.com/luxor37/Dragonbane_charactersheet"
          color="white"
          target="_blank"
          icon="i-mdi-github"
          label="Github repo"
        />
      </div>
    </div>
  </div>
</template>
