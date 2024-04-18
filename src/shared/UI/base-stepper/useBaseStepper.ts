import { ref, Slot } from 'vue';
import { useVModels } from '@vueuse/core';
import { StepEmits, StepProps } from '@/shared/types/base-stepper.types';

export default function useBaseStepper(
  props: StepProps,
  emit: StepEmits
) {
  const models = useVModels(props, emit);
  const stepRef = ref<Slot | null>(null);
  const onBackButton = () => emit('backButton');
  const onNextButton = () => emit('nextButton');

  return {
    onBackButton,
    onNextButton,
    stepRef,
    ...models
  };
}
