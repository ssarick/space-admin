import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useUserCreationStore = defineStore(
  'userCreation',
  () => {
    const userCreationStarted = ref(false);

    const startUserCreation = () =>
      userCreationStarted.value = true;

    const finishUserCreation = () =>
      userCreationStarted.value = false;

    return {
      userCreationStarted,
      startUserCreation,
      finishUserCreation
    };
  }
);
