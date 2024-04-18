import { computed, reactive } from 'vue';
import { FormRules } from 'naive-ui';
import useFormRefWithValidate from '@/shared/UI/base-form/useFormRefWithValidate';
import { FIELD_MASK } from '@/shared/utils/constants/field-mask';
import MaskUtils from '@/shared/utils/mask-utils';
import { ruleRequired } from '@/shared/utils/validation-rules';
import { IDocumentType } from '@/projects/b2b/shared/types/document.types';
import { IUser, UserStateId } from '@/projects/b2b/shared/types/user.types';
import {
  checkPidSn,
  ruleEmail,
  ruleLogin,
  rulePhone,
  rulePhrase,
  rulePidNum,
  ruleRequiredWithNumber
} from '@/projects/b2b/shared/utils/validation-rules';
import { IUserInfoCardProps } from './user-info-card.types';

export default function useUserInfoCard(
  props: IUserInfoCardProps
) {
  const phoneFieldMask = FIELD_MASK.phone;

  const userEditableData = reactive({
    ...(props.data || {})
  }) as Required<IUser>;

  const userIsBlocked = computed(() => {
    return props.data?.stateId === UserStateId.BLOCKED;
  });

  const isForm = computed<boolean>(() =>
    !!(props.data && props.isEdit));

  const documentTypeDefault = computed<IDocumentType>(() => ({
    id: userEditableData.pidTypeId || 0,
    name: userEditableData.pidTypeName || ''
  }));

  const { formRef, validateForm, restoreFormValidation } =
    useFormRefWithValidate();

  const getFormData = (): Required<IUser> => ({
    ...userEditableData,
    phone: MaskUtils.unmaskPhone(
      userEditableData.phone
    )
  });

  const formRules: FormRules = {
    fio: {
      trigger: [ 'blur' ],
      validator: ruleRequired
    },
    pidTypeId: {
      trigger: [ 'blur' ],
      validator: ruleRequiredWithNumber
    },
    pidSn: {
      trigger: [ 'blur' ],
      validator: (_, value: string) => checkPidSn(
        value, userEditableData.pidTypeId
      )
    },
    pidNum: {
      trigger: [ 'blur' ],
      validator: rulePidNum
    },
    phone: {
      trigger: [ 'blur' ],
      validator: rulePhone
    },
    email: {
      trigger: [ 'blur' ],
      validator: ruleEmail
    },
    phrase: {
      trigger: [ 'blur' ],
      validator: rulePhrase
    },
    login: {
      trigger: [ 'blur' ],
      validator: ruleLogin
    }
  };

  return {
    userIsBlocked,
    formRef,
    validateForm,
    isForm,
    restoreFormValidation,
    documentTypeDefault,
    userEditableData,
    getFormData,
    formRules,
    phoneFieldMask
  };
}
