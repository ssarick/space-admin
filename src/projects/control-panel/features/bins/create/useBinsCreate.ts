import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import useFormRef from '@/shared/UI/base-form/useFormRef';
import { formValidate } from '@/shared/utils/functions';
import { BinsInfoFormModel } from '@/projects/control-panel/shared/types/bins.types.ts';

export default function useBinsCreate() {
  const router = useRouter();
  const formRef = useFormRef();
  const loading = ref(false);

  const formModel = reactive<
    BinsInfoFormModel
  >({
    partner: '',
    name: '',
    port: null,
    operationType: '',
    merchantId: ''
  });

  const handleSubmit = async () => {

    const hasError = await formValidate(
      formRef.value
    );

    if (hasError) return;

    loading.value = true;

    // const {
    //   error
    // } = await ApiInventoryUsers.createInventoryUser(
    //   {
    //     ...formModel,
    //     email: `${formModel.email}@${DomainShortcuts.KAPITALBANK}`
    //   }
    // );

    loading.value = false;

    // if (error) return;

    return router.push({
      name: 'bins-list'
    });
  };

  return {
    formModel,
    loading,
    formRef,
    handleSubmit
  };
}
