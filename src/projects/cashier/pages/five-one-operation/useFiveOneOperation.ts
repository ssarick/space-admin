import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import { Step } from '@/shared/types/base-stepper.types';
import {
  FIVE_ONE_OPERATION,
  RRNData
} from '@/projects/cashier/pages/five-one-operation/five-one-operation.types';

export default function useFiveOneOperation() {
  const { t } = useI18n();
  const router = useRouter();

  const RRNFields = ref<RRNData>();

  const activeStep = ref<FIVE_ONE_OPERATION>(FIVE_ONE_OPERATION.DETAILS);

  const steps = computed<Step<FIVE_ONE_OPERATION>[]>(() => [
    {
      label: t('details'),
      key: FIVE_ONE_OPERATION.DETAILS,
      isFilled: false,
      isDisabled: true
    },
    {
      label: t('buyer'),
      key: FIVE_ONE_OPERATION.BUYER,
      isFilled: false,
      isDisabled: true
    },
    {
      label: t('document'),
      key: FIVE_ONE_OPERATION.DOCUMENT,
      isFilled: false,
      isDisabled: true
    }
  ]);

  const pdfData = ref<string>();

  const pageTitle = router.currentRoute.value.name;

  const fillRRNDataAndGoToNextStep = (RRNData: RRNData) => {
    RRNFields.value = RRNData;
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
    RRNFields,
    pdfData,
    getPDF,
    moveToSelectOperationPage,
    moveToNextStep,
    moveToPreviousStep,
    fillRRNDataAndGoToNextStep,
    resetToFirstStep
  };
}
