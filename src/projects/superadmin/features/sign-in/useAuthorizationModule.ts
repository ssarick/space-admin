import { ref, watch } from 'vue';
import useSignInModule from './composables/useSignInModule';
import useSignUpModule from './composables/useSignUpModule';

export default function useAuthorizationModule() {
  const signInModule = useSignInModule();
  const signUpModule = useSignUpModule();

  const showRegisterForm = ref<boolean>(false);

  const showRegister = (value: boolean) => {
    showRegisterForm.value = value;
  };

  watch(
    () => signUpModule.signedUp.value,
    (v) => {
      showRegister(!v);
    }
  );

  return {
    ...signInModule,
    ...signUpModule,
    showRegisterForm,
    showRegister
  };
}
