<script lang="ts" setup>
import AuthLayout from '@/app/layouts/AuthLayout.vue';
import SignInPage from '@/projects/superadmin/pages/sign-in/SignInPage.vue';
import useAuthGuard from './useAuthGuard';

const {
  isAuth
} = useAuthGuard();
</script>

<template>
  <router-view v-if="isAuth" />

  <AuthLayout v-else>
    <SignInPage />
  </AuthLayout>
</template>
