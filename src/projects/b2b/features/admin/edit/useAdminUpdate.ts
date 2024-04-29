import { Ref, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useMessage } from 'naive-ui';
import { DomainShortcuts } from '@/shared/types/common.types';
import useFormRef from '@/shared/UI/base-form/useFormRef';
import { formValidate } from '@/shared/utils/functions';
import MaskUtils from '@/shared/utils/mask-utils';
import { ApiAdmin } from '@/projects/b2b/shared/api';
import { IAdmin, IAdminUpdatePayload } from '@/projects/b2b/shared/types/admin.types';

export default function useAdminUpdate(
  admin: Ref<IAdmin | null>
) {
  const adminEditLoading = ref(false);
  const adminDataFormRef = useFormRef();
  const { t } = useI18n();
  const toast = useMessage();

  const getAdminUpdateData = ():
  IAdminUpdatePayload => ({
    branch: admin.value?.branch!,
    email: admin.value?.email
      ? (admin.value.email +
        `@${DomainShortcuts.KAPITALBANK}`)
      : '',
    fio: admin.value?.fio!,
    id: admin.value?.id!,
    login: admin.value?.login!,
    phone: MaskUtils.unmaskPhone(
      admin.value?.phone
    ),
    roleId: admin.value?.userRoleId!
  });

  const updateAdminData = async () => {
    if (!admin.value?.id) return;

    adminEditLoading.value = true;

    const { error } = await ApiAdmin
      .updateAdmin(getAdminUpdateData());

    error || toast.success(t('Success'));

    adminEditLoading.value = false;
  };

  const onBeforeUpdateAdminData = async () => {
    const hasError = await formValidate(
      adminDataFormRef.value
    );

    if (hasError) return;

    await updateAdminData();
  };

  return {
    onBeforeUpdateAdminData,
    adminDataFormRef,
    adminEditLoading
  };
}
