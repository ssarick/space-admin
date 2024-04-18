import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { DomainShortcuts } from '@/shared/types/common.types';
import useFormRef from '@/shared/UI/base-form/useFormRef';
import { formValidate } from '@/shared/utils/functions';
import { ApiInventoryUsers } from '@/projects/inventory/shared/api';
import type { InventoryUserFormModel } from '@/projects/inventory/shared/types/users.types';

export default function useUserCreate() {
  const router = useRouter();
  const formRef = useFormRef();
  const loading = ref(false);

  const formModel = reactive<
    InventoryUserFormModel
  >({
    email: '',
    fullName: '',
    userName: '',
    password: undefined,
    phoneNumber: ''
  });

  const handleSubmit = async () => {

    const hasError = await formValidate(
      formRef.value
    );

    if (hasError) return;

    loading.value = true;

    const {
      error
    } = await ApiInventoryUsers.createInventoryUser(
      {
        ...formModel,
        email: `${formModel.email}@${DomainShortcuts.KAPITALBANK}`
      }
    );

    loading.value = false;

    if (error) return;

    return router.push({ name: 'inventory-users' });
  };

  return {
    formModel,
    loading,
    formRef,
    handleSubmit
  };
}
