import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { DomainShortcuts } from '@/shared/types/common.types';
import useFormRef from '@/shared/UI/base-form/useFormRef';
import { formValidate } from '@/shared/utils/functions';
import MaskUtils from '@/shared/utils/mask-utils';
import { ApiAdmin } from '@/projects/b2b/shared/api';
import { IAdminCreationFormModel } from '@/projects/b2b/shared/types/admin.types';

export default function useAdminCreation() {
  const formLoading = ref(false);
  const formRef = useFormRef();
  const router = useRouter();

  const formModel = reactive<
    IAdminCreationFormModel
  >({
    fio: '',
    login: '',
    email: '',
    phone: '',
    branch: '',
    roleId: null
  });

  const goToAdminsList = () =>
    router.push({
      name: 'admins'
    });

  const createAdmin = async () => {
    const hasError = await formValidate(
      formRef.value
    );

    if (hasError) return;

    formLoading.value = true;

    const { error } = await ApiAdmin
      .createAdmin({
        ...formModel,
        phone: MaskUtils.unmaskPhone(
          formModel.phone
        ),
        email: formModel.email +
          `@${DomainShortcuts.KAPITALBANK}`
      });

    error || goToAdminsList();

    formLoading.value = false;
  };

  return {
    formRef,
    createAdmin,
    formModel,
    formLoading
  };
}
