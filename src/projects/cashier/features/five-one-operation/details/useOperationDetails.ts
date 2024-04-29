import { IResponseData } from '@/shared/types/api.types';
import useFormRef from '@/shared/UI/base-form/useFormRef';
import AmountFormatter from '@/shared/utils/amount-formatter';
import { FIELD_MASK } from '@/shared/utils/constants/field-mask';
import { formValidate } from '@/shared/utils/functions';
import { regExp } from '@/shared/utils/regular-expressions';
import {
  OperationDetailFormValues,
  OperationTypeEmits
} from '@/projects/cashier/features/five-one-operation/details/operation-details.types';
import {
  defaultValues,
  rules
} from '@/projects/cashier/features/five-one-operation/details/utils';
import { RRNData } from '@/projects/cashier/pages/five-one-operation/five-one-operation.types';
import {
  getCurrencyRate,
  getHumoRrn,
  getUzcardRrn
} from '@/projects/cashier/shared/api/rrn-payment';
import {
  currencyOptions,
  paymentTypeOptions,
  rnnTypeOptions
} from '@/projects/cashier/shared/models';
import { RrnHumoResponse, RrnUzcardResponse } from '@/projects/cashier/shared/types/rrn-payment.types';

export default function useOperationDetails(
  emit: OperationTypeEmits
) {
  const formRef = useFormRef();
  const operationDetailFormValues = ref<OperationDetailFormValues>({
    paymentTypeChosenOption: defaultValues.paymentType,
    currencyChosenOption: defaultValues.currency,
    chosenRnnOption: defaultValues.rrnType,
    rrnNumber: '',
    manualPayment: false,
    paidSum: '',
    formattedSellSum: ''
  });
  const currentCurrencyRate = ref<number>();
  const choosenCurrencyLabel = ref<string>();
  const isModalActive = ref<boolean>(false);
  const rrnSum = ref<string>();
  const rrnFieldMask = FIELD_MASK.rrn;
  const isPaidSumShown = computed(() => {
    return !operationDetailFormValues.value.manualPayment
      || Number(operationDetailFormValues.value.paymentTypeChosenOption);
  });
  const isPaidSumDisabled = computed(() => {
    return Boolean(!operationDetailFormValues.value.manualPayment
      && Number(operationDetailFormValues.value.paymentTypeChosenOption));
  });

  const closeModal = () => {
    isModalActive.value = false;
  };

  const showModal = (manualPaymentValue: boolean) => {
    if (manualPaymentValue) isModalActive.value = true;
    resetSumFields();
    resetRRNFields();
  };

  const fetchCurrency = async () => {
    const currencyCode = currencyOptions.find(currency =>
      currency.value === operationDetailFormValues.value.currencyChosenOption
    );

    choosenCurrencyLabel.value = currencyCode?.label;

    if (currencyCode) {
      const { item } = await getCurrencyRate(currencyCode.label);
      currentCurrencyRate.value = item.sellRateCash;
    }
  };

  const fetchRRNAmount = async () => {
    let data: IResponseData<RrnHumoResponse | RrnUzcardResponse>;

    if (operationDetailFormValues.value.chosenRnnOption === defaultValues.rrnType) {
      data = await getHumoRrn(operationDetailFormValues.value.rrnNumber);
    } else {
      data = await getUzcardRrn(operationDetailFormValues.value.rrnNumber);
    }

    const { item } = data;

    if (item.hasOwnProperty('data')) {
      rrnSum.value = String((item as RrnHumoResponse).data[0].totalAmount);
    } else {
      rrnSum.value = String((item as RrnUzcardResponse).amount);
    }
  };

  const fetchRRNDataAndPutToPaidSum = async () => {
    await fetchRRNAmount();

    if (rrnSum.value
      && currentCurrencyRate.value) {
      const formattedPaidSum = Number(String(rrnSum.value)
        .replace(regExp.space, ''));

      operationDetailFormValues.value.paidSum =
        ((formattedPaidSum / currentCurrencyRate.value) * 100).toFixed(2);
    } else {
      operationDetailFormValues.value.paidSum = '';
    }
  };

  const fillTheSellSum = () => {
    if (operationDetailFormValues.value.paidSum
      && currentCurrencyRate.value) {
      const formattedPaidSum = Number(String(operationDetailFormValues.value.paidSum)
        .replace(regExp.space, ''));

      operationDetailFormValues.value.formattedSellSum =
        ((formattedPaidSum * currentCurrencyRate.value) / 100).toFixed(2);
    } else {
      operationDetailFormValues.value.formattedSellSum = '';
    }
  };

  const resetSumFields = () => {
    operationDetailFormValues.value.paidSum = '';
    operationDetailFormValues.value.formattedSellSum = '';
  };

  const resetRRNFields = () => {
    operationDetailFormValues.value.rrnNumber = '';
    operationDetailFormValues.value.chosenRnnOption = defaultValues.rrnType;
  };

  const resetAllRRNData = () => {
    operationDetailFormValues.value.rrnNumber = '';
    resetSumFields();
  };

  const fetchAndPutDataByRRNCode = async () => {
    await fetchCurrency();
    await fetchRRNDataAndPutToPaidSum();
    fillTheSellSum();
  };

  const fetchCurrencyAndFillTheSum = async () => {
    await fetchCurrency();
    fillTheSellSum();
  };

  const validateAndEmitToNextStep = async () => {
    const hasError = await formValidate(formRef.value!);
    if (hasError) return;

    const RRNFields: RRNData = {
      rrn: operationDetailFormValues.value.rrnNumber,
      processingTypeId: Number(operationDetailFormValues.value.chosenRnnOption),
      currencyId: Number(operationDetailFormValues.value.currencyChosenOption),
      amount: AmountFormatter.multiplyAndRound(AmountFormatter.toAmount(operationDetailFormValues.value.paidSum)),
      paymentType: Number(operationDetailFormValues.value.paymentTypeChosenOption),
      manualAmountFlag: operationDetailFormValues.value.manualPayment
    };
    emit('moveToNextStep', RRNFields);
  };

  const emitToPreviousStep = () => {
    emit('moveToPreviousStep');
  };

  return {
    choosenCurrencyLabel,
    paymentTypeOptions,
    currencyOptions,
    rnnTypeOptions,
    rules,
    isModalActive,
    rrnFieldMask,
    formRef,
    operationDetailFormValues,
    isPaidSumShown,
    isPaidSumDisabled,
    validateAndEmitToNextStep,
    emitToPreviousStep,
    closeModal,
    showModal,
    fetchRRNDataAndPutToPaidSum,
    fetchAndPutDataByRRNCode,
    fetchCurrency,
    fetchCurrencyAndFillTheSum,
    resetRRNFields,
    resetSumFields,
    resetAllRRNData
  };
}

