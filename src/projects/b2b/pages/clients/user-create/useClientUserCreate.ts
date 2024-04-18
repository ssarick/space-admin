import { reactive } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';
import { FormRules, useMessage } from 'naive-ui';
import useFormRef from '@/shared/UI/base-form/useFormRef';
import { FIELD_MASK, FIELD_MASK_PREFIX } from '@/shared/utils/constants/field-mask';
import { formValidate } from '@/shared/utils/functions';
import MaskUtils from '@/shared/utils/mask-utils';
import { ruleRequired } from '@/shared/utils/validation-rules';
import { useAuthStore } from '@/app/store/auth/useAuthStore';
import { ApiUser } from '@/projects/b2b/shared/api';
import { IUser } from '@/projects/b2b/shared/types/user.types';
import {
  checkPidSn,
  ruleEmail,
  ruleLogin,
  rulePhone,
  rulePhrase,
  rulePidNum,
  ruleRequiredWithNumber
} from '@/projects/b2b/shared/utils/validation-rules';

export default function useClientUserCreate() {
  const router = useRouter();
  const { t } = useI18n();
  const route = useRoute();
  const formRef = useFormRef();
  const toast = useMessage();
  const { user } = useAuthStore();
  const businessCode = route.params.businessCode?.toString();
  const phoneFieldMask = FIELD_MASK.phone;

  const form = reactive<IUser>({
    fio: null,
    pidTypeId: null,
    pidSn: null,
    pidNum: null,
    phone: FIELD_MASK_PREFIX.phone,
    email: null,
    phrase: null,
    login: null
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
        value, form.pidTypeId
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

  async function tryToUserCreate() {
    return await ApiUser.userCreate({
      path: {
        branch: user?.branch!,
        businessCode
      },
      body: {
        ...form,
        phone: MaskUtils.unmaskPhone(
          form.phone
        )
      }
    });
  }

  async function onNextStep() {
    const vError = await formValidate(formRef.value);

    if (vError) return;

    const { error, item } = await tryToUserCreate();

    if (error) return;

    toast.success(t('User-created'));

    router.push({
      name: 'client-user-access-permissions',
      params: {
        businessCode,
        userId: item.userId
      }
    });
  }

  const onCancel = () => router.go(-1);

  return {
    onNextStep,
    form,
    router,
    formRules,
    phoneFieldMask,
    formRef,
    onCancel
  };
}
