import { onMounted, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { ISelectOption } from '@/shared/types/select.types';
import useFormRef from '@/shared/UI/base-form/useFormRef';
import { formValidate } from '@/shared/utils/functions';
import { ApiInventorySessions } from '@/projects/inventory/shared/api';
import type { InventorySessionFormModel } from '@/projects/inventory/shared/types/sessions.types';

export default function useSessionCreate() {
  const router = useRouter();
  const formRef = useFormRef();
  const formModel = reactive<
    InventorySessionFormModel
  >({
    name: '',
    inventoryUserIds: [],
    officeId: null
  });
  const loading = ref(false);
  const officeOptions = ref<ISelectOption[]>();

  const fetchOffices = async () => {
    const {
      items,
      error
    } = await ApiInventorySessions.fetchInventoryOfficesList();

    if (error) return;
    officeOptions.value = items;
  };

  const handleSubmit = async () => {
    const hasError = await formValidate(
      formRef.value
    );
    if (hasError) return;

    loading.value = true;

    const {
      error
    } = await ApiInventorySessions.createInventorySession(
      {
        name: formModel.name,
        officeId: formModel.officeId,
        inventoryUserIds: formModel.inventoryUserIds
      }
    );

    loading.value = false;
    if (error) return;
    return router.push({ name: 'inventory-sessions' });
  };

  onMounted(fetchOffices);

  return {
    formModel,
    loading,
    formRef,
    officeOptions,
    handleSubmit
  };
}
