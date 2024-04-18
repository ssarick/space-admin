<script setup lang="ts">
import { useRouter } from 'vue-router';
import { NCheckbox } from 'naive-ui';
import BaseLoading from '@/shared/UI/base-loading';
import PageTitle from '@/shared/UI/page-title';
import UserInfoCard from '@/projects/b2b/entities/user-info-card/UserInfoCard.vue';
import useClientUserAddFinishing from './useClientUserAddFinishing';

const router = useRouter();

const {
  userFullName,
  isLoading,
  userData,
  isNeedAddCertificate,
  businessCode,
  userId,
  onComplete
} = useClientUserAddFinishing();
</script>

<template>
  <div class="user-add-finishing">
    <PageTitle :title="$t('Adding-a-user') + ', ' + userFullName" />

    <BaseLoading v-if="isLoading" />

    <UserInfoCard
      v-else
      :data="userData"
    />

    <NCheckbox
      v-model:checked="isNeedAddCertificate"
      class="mt-3"
    >
      {{ $t('Add-a-certificate-after-registration-is-completed') }}
    </NCheckbox>

    <footer class="flex mt-3">
      <n-button
        class="ml-auto"
        ghost
        @click="
          router.push({
            name: 'client-user-access-accounts',
            params: { businessCode, userId },
          })
        "
      >
        {{ $t('Back') }}
      </n-button>

      <n-button
        type="info"
        class="mx-2"
        ghost
        @click="onComplete"
      >
        {{ $t('Complete') }}
      </n-button>
    </footer>
  </div>
</template>
