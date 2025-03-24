<script setup lang="ts">
const { signIn } = useGoogleAuth();
const authStore = useAuthStore();
const { isAuthenticated, accessToken } = storeToRefs(authStore);

const showModal = ref<boolean>(!isAuthenticated.value);

const handleSignIn = async () => {
  await signIn();
  showModal.value = false;
};
</script>

<template>
  <UModal
    v-if="accessToken === null"
    v-model:open="showModal"
    closeable
    overlay-class="bg-black/50"
    class="max-w-md mx-auto"
  >
    <template #content>
      <UCard>
        <template #header>
          <h2 class="text-xl font-bold">Sign in with Google</h2>
        </template>
        <p class="mb-4">
          Please sign in with your Google account to continue using the app.
        </p>
        <div>
          <UButton
            icon="i-mdi-google-drive"
            label="Sign in with Google"
            @click="handleSignIn"
          />
        </div>
        <template #footer>
          <!-- You can add additional footer actions if needed -->
        </template>
      </UCard>
    </template>
  </UModal>
</template>
