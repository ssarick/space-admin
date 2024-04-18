import { onMounted, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { useMessage } from 'naive-ui';
import { usePagination } from '@/shared/composables';
import useTableRef from '@/shared/UI/base-data-table/useTableRef';
import useFormRef from '@/shared/UI/base-form/useFormRef';
import { formValidate } from '@/shared/utils/functions';
import { ApiBindedFace } from '../../shared/api';
import { BindedFace, BindedFaceFormModel, BindedFaceStatus } from '../../shared/types/binded-face.types';

export default function useBindedFaceList() {
  const tableRef = useTableRef();
  const formRef = useFormRef();
  const message = useMessage();
  const { t } = useI18n();
  const { pageCount, pageNumber, pageSize } = usePagination(tableRef);

  const showAddModal = ref(false);
  const isLoadingCreateBtn = ref(false);
  const isLoadingBindedTable = ref(false);
  const checkedRadioBtn = ref<BindedFaceStatus>(BindedFaceStatus.ACTIVE);
  const bindedFaceList = ref<BindedFace[]>([]);
  const formData = reactive<BindedFaceFormModel>({
    contragentId: null,
    pinfl: null,
    inn: null
  });

  const handleShowModal = () => (showAddModal.value = true);

  const handleChange = (event: Event) => {
    const status = (event.target as HTMLInputElement).value;
    checkedRadioBtn.value = status as BindedFaceStatus;
  };

  const fetchBindedFaceList = async (searchString?: string) => {
    isLoadingBindedTable.value = true;

    const { items, totalPages } = await ApiBindedFace.fetchBindedList({
      pageSize: pageSize.value,
      pageNumber: pageNumber.value,
      status: checkedRadioBtn.value,
      contragentId: searchString
    });

    isLoadingBindedTable.value = false;

    pageCount.value = totalPages || 1;
    bindedFaceList.value = items;
  };

  const onCreateBindedFace = async () => {
    isLoadingCreateBtn.value = true;

    const { error } = await ApiBindedFace.createBindedFace(formData);

    isLoadingCreateBtn.value = false;

    if (error) return;

    showAddModal.value = false;
    message.success(t('Success'));
    fetchBindedFaceList();
  };

  const onSubmit = async () => {
    const hasError = await formValidate(
      formRef.value
    );

    hasError || onCreateBindedFace();
  };

  watch(checkedRadioBtn, () => {
    fetchBindedFaceList();
  });

  onMounted(fetchBindedFaceList);

  return {
    formData,
    formRef,
    tableRef,
    bindedFaceList,
    showAddModal,
    checkedRadioBtn,
    isLoadingBindedTable,
    isLoadingCreateBtn,
    handleShowModal,
    handleChange,
    fetchBindedFaceList,
    onSubmit
  };
}
