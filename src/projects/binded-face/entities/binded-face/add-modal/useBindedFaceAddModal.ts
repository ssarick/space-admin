import { useVModels } from '@vueuse/core';
import { FormRules } from 'naive-ui';
import useFormRefWithValidate from '@/shared/UI/base-form/useFormRefWithValidate';
import { ruleRequired } from '@/shared/utils/validation-rules';
import { rulesMix } from '@/shared/utils/validation-rules-generator';
import { ruleContrAgent, ruleInn, rulePinfl } from '@/projects/binded-face/shared/utils/validation-rules';
import {
  BindedFaceAddModalEmits,
  BindedFaceAddModalProps
} from './binded-face-add-modal.types';

export default function useBindedFaceAddModal(
  props: BindedFaceAddModalProps,
  emit: BindedFaceAddModalEmits
) {
  const models = useVModels(props, emit);
  const formUtils = useFormRefWithValidate();

  const toggleModelValue = () => {
    models.modelValue!.value = !models.modelValue!.value;
  };

  const formRules: FormRules = {
    contragentId: {
      trigger: [ 'input' ],
      validator: rulesMix(
        ruleRequired,
        ruleContrAgent
      ),
      required: true
    },
    pinfl: {
      trigger: [ 'input' ],
      validator: rulesMix(
        ruleRequired,
        rulePinfl
      ),
      required: true
    },
    inn: {
      trigger: [ 'input' ],
      validator: rulesMix(
        ruleInn,
        rulePinfl
      ),
      required: true
    }
  };

  const handleSubmit = () => {
    emit('submit');
  };

  return {
    ...models,
    ...formUtils,
    toggleModelValue,
    handleSubmit,
    formRules
  };
}
