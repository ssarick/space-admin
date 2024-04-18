<script setup lang="ts">
import { NSpace } from 'naive-ui';
import { BlockingReasonForm } from '@/projects/b2b/entities/blocking-reason';
import { ClientStateId } from '@/projects/b2b/shared/types/client.types';
import {
  IClientDetailActionsEmit,
  IClientDetailActionsProps
} from './client-detail-actions.types';
import useClientDetailActions from './useClientDetailActions';

const props = defineProps<IClientDetailActionsProps>();
const emit = defineEmits<IClientDetailActionsEmit>();

const {
  clientStateId,
  clientBlockingLoading,
  blockingReason,
  blockingReasonText,
  onBeforeBlockClient,
  clientUnblockingLoading,
  onBeforeUnblockClient,
  redirectToUsers,
  blockingReasonParams,
  blockingReasonFormRef
} = useClientDetailActions(props, emit);
</script>

<template>
  <n-space
    justify="space-between"
    class="mt-3"
  >
    <n-space
      v-if="clientStateId === ClientStateId.ACTIVE"
      class="mr-2"
    >
      <BlockingReasonForm
        v-model:reason-id="blockingReason.reasonId"
        v-model:reason-text="blockingReasonText"
        ref="blockingReasonFormRef"
        :model="blockingReason"
        :disabled="clientBlockingLoading"
        :params="blockingReasonParams"
      />

      <n-button
        type="error"
        ghost
        :loading="clientBlockingLoading"
        @click="onBeforeBlockClient"
      >
        {{ $t('Block') }}
      </n-button>
    </n-space>

    <n-button
      v-else-if="clientStateId === ClientStateId.BLOCKED"
      type="warning"
      class="mr-2"
      ghost
      :loading="clientUnblockingLoading"
      @click="onBeforeUnblockClient"
    >
      {{ $t('Unblock') }}
    </n-button>

    <n-button
      ghost
      @click="redirectToUsers"
    >
      {{ $t('Users') }}
    </n-button>
  </n-space>
</template>
