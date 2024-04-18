<script lang="ts" setup>
import { NCollapseTransition } from 'naive-ui';
import SignInForm from '@/projects/superadmin/entities/sign-in/sign-in-form';
import SignInPanels from '@/projects/superadmin/entities/sign-in/sign-in-panels';
import useSignInModule from './useSignInModule';

const {
  signedIn,
  signInFormModel,
  signInFormRef,
  submitButtonLoading,
  signIn,
  authPanelStore,
  onSelectAuthPanel
} = useSignInModule();
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
      <SignInForm
        v-model:username="signInFormModel.username"
        v-model:password="signInFormModel.password"
        v-model:remember-me="signInFormModel.rememberMe"
        ref="signInFormRef"
        :model="signInFormModel"
        :loading="submitButtonLoading"
        @submit.prevent="signIn"
      />
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
