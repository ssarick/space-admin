<script lang="ts" setup>
import { StepEmits, StepProps } from '@/shared/types/base-stepper.types';
import useBaseStepper from './useBaseStepper';

const props = defineProps<StepProps>();
const emit = defineEmits<StepEmits>();

const { stepRef, activeStep } = useBaseStepper(props, emit);
</script>

<template>
  <div class="step-wrapper--entity">
    <div class="steps-wrapper__header">
      <div
        v-for="step in steps"
        :key="step.key"
        class="steps-wrapper__step"
        :class="{
          'steps-wrapper__step-filled': step.isFilled,
          'steps-wrapper__step-active': step.key === activeStep,
        }"
      >
        <div class="steps-wrapper__step__text">
          {{ step.label }}
        </div>

        <div class="steps-wrapper__step__line"></div>
      </div>
    </div>
    <div ref="stepRef">
      <div
        v-for="step in steps"
        :key="step.key"
      >
        <slot
          v-if="step.key === activeStep"
          :name="step.key"
        />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.step-wrapper--entity {
  padding-top: 32px;
}

.steps-wrapper__header {
  display: flex;
  gap: 8px;
  margin-bottom: 32px;
  align-items: end;
}

.steps-wrapper__step {
  width: 100%;

  &-filled {
    color: map-get($color-common, 'black-dark');

    .steps-wrapper__step__line {
      background-color: map-get($color-common, 'yellow-light');
    }

    .steps-wrapper__step__text{
      color: map-get($color-common, 'black-dark');
    }
  }

  &-active {
    .steps-wrapper__step__line {
      background-color: map-get($color-primary, 'main');
    }

    .steps-wrapper__step__text{
      color: map-get($color-common, 'black-dark');
    }
  }

  &__text {
    font-size: 14px;
    font-weight: 600;
    line-height: 20px;
    margin-bottom: 12px;
  }

  &__line {
    height: 6px;
    border-radius: 8px;
    background-color: map-get($color-common, 'whitesmoke');
  }
}

.step-wrapper__buttons {
  margin-top: 3.2rem;

  &-back {
    margin-right: 1.5rem;
  }
}
</style>
