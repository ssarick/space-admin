<script setup lang="ts">
import BaseButton from '@/shared/UI/base-button';
import BaseIcon from '@/shared/UI/base-icon';
import { SuccessMessageEmits } from '@/projects/cashier/entities/success-message/success-message.types';
import { useSuccessMessage } from '@/projects/cashier/entities/success-message/useSuccessMessage';

const emit = defineEmits<SuccessMessageEmits>();

const {
  handleButtonClick,
  handlePdfClick
} = useSuccessMessage(emit);
</script>

<template>
  <div class="success-message">
    <div class="success-message__icon-wrapper">
      <BaseIcon
        icon="check"
        size="60"
        color="white"
      />
    </div>

    <div class="success-message__title">
      {{$t('Successfully')}}
    </div>

    <div class="success-message__text">
      {{$t('documents-are-transfered-to-documents-of-day')}}
    </div>

    <BaseButton
      type="primary"
      class="px-18"
      @click="handleButtonClick"
    >
      {{ $t('ok') }}
    </BaseButton>
    <BaseButton
      type="link"
      class="mt-1 underline"
      @click="handlePdfClick"
    >
      {{ $t('show-pdf') }}
    </BaseButton>
  </div>
</template>

<style scoped lang="scss">
.success-message {
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;

  &__title {
    font-size: 24px;
    font-weight: 700;
    line-height: 30px;
    margin-bottom: 8px;
  }

  &__text {
    font-size: 14px;
    font-weight: 500;
    line-height: 20px;
    margin-bottom: 38px;
  }

  &__icon-wrapper {
    margin-bottom: 16px;
    width: 120px;
    height: 120px;
    background-color: map-get($color-common, 'green');
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}

:deep(.underline .n-button__content) {
  text-decoration: underline !important;
  color: map-get($color-quaternary, 'darker');
}
</style>
