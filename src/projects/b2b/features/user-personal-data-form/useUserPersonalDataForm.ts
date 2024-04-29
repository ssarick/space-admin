import {
  computed,
  reactive,
  ref,
  toRef
} from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';
import { useDialog, useMessage } from 'naive-ui';
import useFormRef from '@/shared/UI/base-form/useFormRef';
import { formValidate } from '@/shared/utils/functions';
import { ruleRequired } from '@/shared/utils/validation-rules';
import { useAuthStore } from '@/app/store/auth/useAuthStore';
import { ApiUser } from '@/projects/b2b/shared/api';
import {
  IUser,
  UserBlockingReason,
  UserStateId
} from '@/projects/b2b/shared/types/user.types';
import { IUserPersonalDataFormProps } from './user-personal-data-form.types';

export default function useUserPersonalDataForm(
  props: IUserPersonalDataFormProps
) {
  const toast = useMessage();
  const { t } = useI18n();
  const isLoadingClientUserChangeStatus = ref(false);
  const route = useRoute();
  const { loadUserData } = props;
  const userData = toRef(props, 'userData');
  const { user } = useAuthStore();
  const userId = +(route.params?.userId || 0);
  const dialog = useDialog();
  const saveIsLoading = ref(false);
  const passwordResetIsLoading = ref(false);
  const router = useRouter();
  const formRef = useFormRef<Required<IUser>>();
  const clientUserBlockingFormRef = ref(null);

  const userChangeableReasons: UserBlockingReason[] = [
    UserBlockingReason.CONFIRM_ATTEMPTS,
    UserBlockingReason.PASSWORD_ATTEMPTS
  ];

  const clientUserBlockingForm = reactive({
    reasonId: null
  });

  const isLoading = computed(() => !userData.value?.login);

  const clientUserBlockingRules = {
    reasonId: {
      trigger: [ 'change', 'blur' ],
      validator: ruleRequired
    }
  };

  const userIsBlocked = computed(() => {
    return userData.value?.stateId === UserStateId.BLOCKED;
  });

  const userStateChangeable = computed(() => props.isEdit
    || userChangeableReasons.includes(
      props.userData?.stateReasonId!
    ));

  async function changeClientStatus(stateId: number) {
    isLoadingClientUserChangeStatus.value = true;

    const body = {
      stateId,
      stateReasonId: clientUserBlockingForm
        .reasonId || 0
    };

    if (props.businessCode) {
      await ApiUser.changeClientUserStatus({
        path: {
          branch: user?.branch!,
          businessCode: props.businessCode,
          userId: userId
        },
        body
      });
    } else {
      await ApiUser.changeUserStatus({
        path: {
          userId
        },
        body
      });
    }

    isLoadingClientUserChangeStatus.value = false;
  }

  async function onChangeUserStatus() {
    if (userIsBlocked.value) return onBeforeUnblockClient();

    const validateError = await formValidate(clientUserBlockingFormRef.value);

    if (validateError) return;
    onBeforeBlockClient();
  }

  const onBeforeUnblockClient = () => {
    dialog.warning({
      title: t('User-unblocking-confirm'),
      positiveText: t('Unblock'),
      negativeText: t('Cancel'),
      positiveButtonProps: {
        type: 'warning',
        ghost: true
      },
      negativeButtonProps: {
        type: 'default'
      },
      onPositiveClick: async () => {
        await onUnblockClient();
        await loadUserData();
        toast.success(t('User-unblocked') + '!');
      }
    });
  };

  const onBeforeBlockClient = () => {
    dialog.warning({
      title: t('User-blocking-confirm'),
      positiveText: t('Block'),
      negativeText: t('Cancel'),
      positiveButtonProps: {
        type: 'error',
        ghost: true
      },
      negativeButtonProps: {
        type: 'default'
      },
      onPositiveClick: async () => {
        await onBlockClient();
        await loadUserData();
        toast.warning(t('User-blocked') + '!');
      }
    });
  };

  const onBlockClient = async () => changeClientStatus(UserStateId.BLOCKED);

  const onUnblockClient = async () => {
    clientUserBlockingForm.reasonId = null;

    return changeClientStatus(UserStateId.ACTIVE);
  };

  const onSaveUserData = async () => {
    const formHasError = await formValidate(formRef.value);
    const formData = formRef.value?.getFormData?.();

    if (formHasError || !formData) return;

    saveIsLoading.value = true;

    const { error } = await ApiUser.updateUser({
      userId,
      fio: formData.fio,
      pidTypeId: formData.pidTypeId,
      pidSn: formData.pidSn,
      pidNum: formData.pidNum,
      phone: formData.phone,
      email: formData.email,
      phrase: formData.phrase,
      login: formData.login
    });

    saveIsLoading.value = false;

    if (!error) {
      loadUserData();
      toast.success(t('Data-saved'));
    }
  };

  const onResetPassword = async () => {
    passwordResetIsLoading.value = true;

    const { error } = await ApiUser.resetUserPassword({
      userId
    });

    error || toast.success(t('Password-changed'));

    passwordResetIsLoading.value = false;
  };

  const onBeforeResetPassword = () => {
    dialog.warning({
      title: t('Confirm-reset-password'),
      positiveText: t('Reset-password'),
      negativeText: t('Cancel'),
      positiveButtonProps: {
        type: 'warning',
        ghost: true
      },
      negativeButtonProps: {
        type: 'default'
      },
      onPositiveClick: () => {
        onResetPassword();
      }
    });
  };

  const onCloseModule = () => router.go(-1);

  return {
    userData,
    onChangeUserStatus,
    clientUserBlockingForm,
    clientUserBlockingRules,
    clientUserBlockingFormRef,
    userIsBlocked,
    isLoadingClientUserChangeStatus,
    saveIsLoading,
    formRef,
    onSaveUserData,
    onBeforeResetPassword,
    passwordResetIsLoading,
    onCloseModule,
    isLoading,
    userStateChangeable
  };
}
