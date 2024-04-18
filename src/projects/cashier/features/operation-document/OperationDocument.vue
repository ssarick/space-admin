<script setup lang="ts">
import SuccessMessage from '@/projects/cashier/entities/success-message';
import {
  OperationDocumentEmit,
  OperationDocumentProps
} from '@/projects/cashier/features/operation-document/operation-document.types';
import useOperationDocument from '@/projects/cashier/features/operation-document/useOpertaionDocument';

const props = defineProps<OperationDocumentProps>();
const emit = defineEmits<OperationDocumentEmit>();

const {
  resetToFirstStep,
  showPDFAgain
} = useOperationDocument(props, emit);
</script>

<template>
  <div class="document">
    <SuccessMessage
      @show-pdf-click="showPDFAgain"
      @final-button-click="resetToFirstStep"
    />
  </div>
</template>

<style scoped lang="scss">
.document {
  &__title {
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: 24px;
    color: map-get($color-common, 'black');
  }

  :deep(.n-date-picker) {
    width: 100%;
  }

  &__halfscreen-form-item {
    width: 50%;
  }

  &__form-group-row {
    display: flex;
    justify-content: space-between;
    gap: 20px;
  }

  &__form-control__full {
    width: 100%;
  }
}

.operation__button {
  padding: 0 114px;
  font-size: 16px;
  font-weight: 600;
  line-height: 24px;
}
</style>
