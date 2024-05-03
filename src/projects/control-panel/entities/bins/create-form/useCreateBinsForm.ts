import { useVModels } from '@vueuse/core';
import { FormRules } from 'naive-ui';
import useFormRefWithValidate from '@/shared/UI/base-form/useFormRefWithValidate';
import { ruleRequired } from '@/shared/utils/validation-rules';
import { cardTypeOptions } from '@/projects/control-panel/shared/utils/bins/card-options';
import { legalTypeOptions } from '@/projects/control-panel/shared/utils/bins/legal-options';
import { processingTypeOptions } from '@/projects/control-panel/shared/utils/bins/processing-options';
import {
  CreateBinsFormEmits,
  CreateBinsFormProps
} from './create-bins-form.types';

export default function useCreateBinsForm(
  props: CreateBinsFormProps,
  emit: CreateBinsFormEmits
) {
  const models = useVModels(props, emit);
  const formUtils = useFormRefWithValidate();
  const formRules: FormRules = {
    bankId: {
      trigger: [ 'input' ],
      validator: ruleRequired
    },
    cardBin: {
      trigger: [ 'input' ],
      validator: ruleRequired
    },
    processing: {
      trigger: [ 'input' ],
      validator: ruleRequired
    },
    legalType: {
      trigger: [ 'input' ],
      validator: ruleRequired
    },
    cardType: {
      trigger: [ 'input' ],
      validator: ruleRequired
    },
    processingBankId: {
      trigger: [ 'input' ],
      validator: ruleRequired
    }
  };

  return {
    ...models,
    ...formUtils,
    cardTypeOptions,
    legalTypeOptions,
    processingTypeOptions,
    formRules
  };
}
