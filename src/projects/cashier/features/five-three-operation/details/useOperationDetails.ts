import useFormRef from '@/shared/UI/base-form/useFormRef';
import AmountFormatter from '@/shared/utils/amount-formatter';
import { formValidate } from '@/shared/utils/functions';
import { regExp } from '@/shared/utils/regular-expressions';
import {
  OperationDetailFormValues,
  OperationTypeEmits
} from '@/projects/cashier/features/five-three-operation/details/operation-details.types';
import {
  defaultValues,
  rules
} from '@/projects/cashier/features/five-three-operation/details/utils';
import { OperationFiveThreeFields } from '@/projects/cashier/pages/five-three-operation/five-three-operation.types';
import { getCurrencyRate } from '@/projects/cashier/shared/api/rrn-payment';
import {
  currencyOptions,
  paymentTypeOptions
} from '@/projects/cashier/shared/models';

export default function useOperationDetails(
  emit: OperationTypeEmits
) {
  const formRef = useFormRef();
  const operationDetailFormValues = ref<
    OperationDetailFormValues
  >({
    paymentTypeChosenOption: defaultValues.paymentType,
    currencyChosenOption: defaultValues.currency,
    paidSum: '',
    convertedSum: ''
  });
  const currentCurrencyRate = ref<number>();
  const choosenCurrencyLabel = ref<string>();

  const fetchCurrency = async () => {
    const currencyCode = currencyOptions.find(currency =>
      currency.value === operationDetailFormValues.value.currencyChosenOption
    );

    choosenCurrencyLabel.value = currencyCode?.label;

    if (currencyCode) {
      const { item } = await getCurrencyRate(currencyCode.label);
      currentCurrencyRate.value = item.buyRateCash;
    }
  };

  const fillTheSellSum = () => {
    if (operationDetailFormValues.value.paidSum
      && currentCurrencyRate.value) {
      const convertedSum = Number(String(operationDetailFormValues.value.paidSum)
        .replace(regExp.space, ''));

      operationDetailFormValues.value.convertedSum =
        (convertedSum * currentCurrencyRate.value / 100).toFixed(2);
    } else {
      operationDetailFormValues.value.convertedSum = '';
    }
  };

  const resetSumFields = () => {
    operationDetailFormValues.value.paidSum = '';
    operationDetailFormValues.value.convertedSum = '';
  };

  const fetchCurrencyAndFillTheSum = async () => {
    await fetchCurrency();
    fillTheSellSum();
  };

  const validateAndEmitToNextStep = async () => {
    const hasError = await formValidate(formRef.value!);
    if (hasError) return;

    const OperationFields: OperationFiveThreeFields = {
      currencyId: Number(operationDetailFormValues.value.currencyChosenOption),
      amount: AmountFormatter.multiplyAndRound(AmountFormatter.toAmount(operationDetailFormValues.value.paidSum)),
      paymentType: Number(operationDetailFormValues.value.paymentTypeChosenOption),
      convertedAmount: AmountFormatter.toAmount(operationDetailFormValues.value.convertedSum)
    };

    emit('moveToNextStep', OperationFields);
  };

  const emitToPreviousStep = () => {
    emit('moveToPreviousStep');
  };

  return {
    choosenCurrencyLabel,
    paymentTypeOptions,
    currencyOptions,
    formRef,
    rules,
    operationDetailFormValues,
    validateAndEmitToNextStep,
    emitToPreviousStep,
    fetchCurrencyAndFillTheSum,
    resetSumFields
  };
}

