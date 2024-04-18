import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import { Step } from '@/shared/types/base-stepper.types';
import {
  FIVE_THREE_OPERATION, OperationFiveThreeFields
} from '@/projects/cashier/pages/five-three-operation/five-three-operation.types';

export default function useFiveThreeOperation() {
  const { t } = useI18n();
  const router = useRouter();

  const operationFiveThreeData = ref<OperationFiveThreeFields>();
  const pdfData = ref<string>();
  const activeStep = ref<FIVE_THREE_OPERATION>(FIVE_THREE_OPERATION.DETAILS);
  const steps = computed<
    Step<FIVE_THREE_OPERATION>[]>(() => [
      {
        label: t('details'),
        key: FIVE_THREE_OPERATION.DETAILS,
        isFilled: false,
        isDisabled: true
      },
      {
        label: t('buyer'),
        key: FIVE_THREE_OPERATION.BUYER,
        isFilled: false,
        isDisabled: true
      },
      {
        label: t('document'),
        key: FIVE_THREE_OPERATION.DOCUMENT,
        isFilled: false,
        isDisabled: true
      }
    ]);
  const pageTitle = router.currentRoute.value.name;

  const fillDataAndGoToNextStep = (payload: OperationFiveThreeFields) => {
    operationFiveThreeData.value = payload;
    moveToNextStep();
  };

  const moveToNextStep = () => {
    const activeStepIndex = steps.value.findIndex(
      step => step.key === activeStep.value);

    if (activeStepIndex === -1) return;

    activeStep.value = steps.value[activeStepIndex + 1].key;
    steps.value[activeStepIndex].isFilled = true;
  };

  const moveToPreviousStep = () => {
    const activeStepIndex = steps.value.findIndex(
      step => step.key === activeStep.value);

    if (activeStepIndex === -1) return;

    activeStep.value = steps.value[activeStepIndex - 1].key;
    steps.value[activeStepIndex].isFilled = true;
  };

  const moveToSelectOperationPage = () => {
    return router.push({
      name: 'cashier-operations'
    });
  };

  const resetToFirstStep = () => {
    activeStep.value = steps.value[0].key;
    pdfData.value = undefined;
    return moveToSelectOperationPage();
  };

  const getPDF = (value: string) => {
    pdfData.value = value;
  };

  return {
    pageTitle,
    steps,
    activeStep,
    operationFiveThreeData,
    pdfData,
    getPDF,
    moveToSelectOperationPage,
    moveToNextStep,
    moveToPreviousStep,
    fillDataAndGoToNextStep,
    resetToFirstStep
  };
}
