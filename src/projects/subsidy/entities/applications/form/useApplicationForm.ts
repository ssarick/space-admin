import { useVModels } from '@vueuse/core';
import { FormRules } from 'naive-ui';
import useFormRefWithValidate from '@/shared/UI/base-form/useFormRefWithValidate';
import { amountMaskOptions } from '@/shared/utils/mask';
import { ruleRequired } from '@/shared/utils/validation-rules';
import { SubsidyContract } from '@/projects/subsidy/shared/types/application.types';
import { ruleAccount, ruleMfo, rulePinfl } from '@/projects/subsidy/shared/utils/validation-rules';
import { ApplicationFormEmits, ApplicationFormProps } from './application-form.types';

export default function useApplicationForm(
  props: ApplicationFormProps,
  emit: ApplicationFormEmits
) {
  const models = useVModels(props, emit);
  const formUtils = useFormRefWithValidate();
  const amountMask = amountMaskOptions;

  const contractTypeDefaultOptions = computed<
    SubsidyContract[]
  >(() => [ {
    description: props.contractTypeName,
    code: props.contractType
  } ]);

  const formRules: FormRules = {
    pinfl: {
      trigger: [ 'input' ],
      validator: rulePinfl
    },
    accExternal: {
      trigger: [ 'input' ],
      validator: ruleAccount
    },
    amountThisMonthTiyin: {
      trigger: [ 'input' ],
      validator: ruleRequired
    },
    restAmountTiyin: {
      trigger: [ 'input' ],
      validator: ruleRequired
    },
    percentagePaymentDate: {
      trigger: [ 'input' ],
      validator: ruleRequired
    },
    contractType: {
      trigger: [ 'input' ],
      validator: ruleRequired
    },
    mfo: {
      trigger: [ 'input' ],
      validator: ruleMfo
    },
    contractPaymentStartDate: {
      trigger: [ 'input' ],
      validator: ruleRequired
    }
  };

  return {
    ...models,
    ...formUtils,
    amountMask,
    formRules,
    contractTypeDefaultOptions
  };
}
