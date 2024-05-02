<script lang="ts" setup>
import { NCollapseTransition } from 'naive-ui';
import SignInForm from '@/projects/superadmin/entities/sign-in/sign-in-form';
import SignInPanels from '@/projects/superadmin/entities/sign-in/sign-in-panels';
import SignUpForm from '@/projects/superadmin/entities/sign-in/sign-up-form';
import useAuthorizationModule from '@/projects/superadmin/features/sign-in/useAuthorizationModule.ts';

const {
  signUpFormModel,
  signUpFormRef,
  submitButtonRegisterLoading,
  signUp,
  signedIn,
  signInFormModel,
  signInFormRef,
  submitButtonLoading,
  showRegisterForm,
  authPanelStore,
  showRegister,
  signIn,
  onSelectAuthPanel
} = useAuthorizationModule();
</script>

<template>
  <div class="sign-in p-3">
    <n-collapse-transition :show="signedIn">
      <SignInPanels
        :available-panels="authPanelStore.availablePanels"
        @select="onSelectAuthPanel"
      />
    </n-collapse-transition>

    <n-collapse-transition :show="!signedIn">
      <n-collapse-transition :show="showRegisterForm">
        <SignUpForm
          v-model:username="signUpFormModel.username"
          v-model:password="signUpFormModel.password"
          ref="signUpFormRef"
          :model="signUpFormModel"
          :loading="submitButtonRegisterLoading"
          @show-register="showRegister"
          @submit.prevent="signUp"
        />
      </n-collapse-transition>

      <n-collapse-transition :show="!showRegisterForm">
        <SignInForm
          v-model:username="signInFormModel.username"
          v-model:password="signInFormModel.password"
          v-model:remember-me="signInFormModel.rememberMe"
          ref="signInFormRef"
          :model="signInFormModel"
          :loading="submitButtonLoading"
          @show-register="showRegister"
          @submit.prevent="signIn"
        />
      </n-collapse-transition>
    </n-collapse-transition>
  </div>
</template>

<style lang="scss" scoped>
.sign-in {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  min-height: $content-height;
}
</style>
