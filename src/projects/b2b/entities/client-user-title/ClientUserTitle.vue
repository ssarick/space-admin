<script setup lang="ts">
import { NSpin } from 'naive-ui';
import PageTitle from '@/shared/UI/page-title';
import { IClientUserTitleProps } from './clien-user-title.types';

const props = defineProps<IClientUserTitleProps>();
</script>

<template>
  <div class="mb-3">
    <PageTitle
      no-margin
      :title="props.clientUser?.fio || ''"
    />

    <div class="mt-1">
      <n-spin
        v-if="props.clientUserLoading"
        :size="20"
      />

      <n-text
        class="client-subtitle"
        tag="p"
      >
        <template v-if="props.clientUser?.clientName">
          {{ props.clientUser.clientName }};
        </template>

        <template v-if="props.clientUser?.inn">
          {{ $t('INN') }}:
          {{ props.clientUser.inn }}
        </template>
      </n-text>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.client-subtitle {
  font-size: 16px;
  color: map-get($color-secondary, 'dark');
}
</style>
