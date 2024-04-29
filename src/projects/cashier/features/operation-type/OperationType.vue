<script setup lang="ts">
import BaseButton from '@/shared/UI/base-button';
import BaseForm from '@/shared/UI/base-form';
import BaseSelect from '@/shared/UI/base-select';
import { OperationTypeEmits } from '@/projects/cashier/features/operation-type/operation-type.types';
import { useOperationType } from './useOperationType';

const emit = defineEmits<OperationTypeEmits>();

const {
  operationTypeOptions,
  choosenOption,
  validateAndEmitToNextStep
} = useOperationType(emit);
</script>

<template>
  <div class="operation">
    <BaseForm
      :vertical="true"
    >
      <n-form-item
        :label="$t('operation')"
      >
        <BaseSelect
          v-model:value="choosenOption"
          filterable
          :options="operationTypeOptions"
        />
      </n-form-item>

      <n-space
        justify="end"
        :size="[ 20, 16 ]"
      >
        <BaseButton
          type="primary"
          class="px-10 flex-1 w-100"
          @click="validateAndEmitToNextStep"
        >
          {{ $t('continue') }}
        </BaseButton>
      </n-space>
    </BaseForm>
  </div>
</template>

<style scoped lang="scss">
.operation {
  &__selectbox {

    width: 380px;
    display: flex;

    :deep(.n-input-wrapper) {
      width: 147px;
    }

    :deep(.n-base-selection) {
      width: 233px;
    }

    :global(.n-base-selection-overlay__wrapper) {
      font-weight: 600 !important;
    }
  }

  &__title {
    font-size: 16px;
    font-weight: 600;
    line-height: 24px;
  }

  &__wrapper {
    margin-bottom: 32px;
  }
}
</style>
