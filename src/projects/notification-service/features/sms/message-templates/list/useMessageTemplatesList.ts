import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { usePagination } from '@/shared/composables';
import useTableRef from '@/shared/UI/base-data-table/useTableRef';
import { ApiNotificationTemplates } from '@/projects/notification-service/shared/api';
import type {
  MessageTemplateModel
} from '@/projects/notification-service/shared/types/send-message.types';
import { MessageChannel } from '@/projects/notification-service/shared/utils/constants/enums';

export default function useMessageTemplatesList() {
  const router = useRouter();
  const tableRef = useTableRef();
  const {
    pageCount,
    pageNumber,
    pageSize
  } = usePagination(tableRef);

  const templates = ref<MessageTemplateModel[]>();
  const templatesLoading = ref(false);
  const confirmModalShow = ref(false);
  const confirmModalData = ref<MessageTemplateModel>();

  const openTemplatesModal = (payload: boolean) => {
    confirmModalShow.value = payload;
  };

  const setTemplateData = (payload: MessageTemplateModel) => {
    confirmModalData.value = payload;
  };

  const handleTemplateDelete = async () => {
    templatesLoading.value = true;

    await ApiNotificationTemplates.deleteTemplate(
      confirmModalData.value?.id
    );

    templatesLoading.value = false;
    confirmModalShow.value = false;

    await fetchTemplates();
  };

  const fetchTemplates = async (payload?: string) => {
    templatesLoading.value = true;

    const {
      items,
      totalPages,
      error
    } = await ApiNotificationTemplates.fetchAllTemplates({
      channelType: MessageChannel.SMS,
      pageSize: pageSize.value.toString(),
      pageNum: (pageNumber.value - 1).toString(),
      multiFieldSearchQuery: payload
    });

    templatesLoading.value = false;
    if (error) return;
    templates.value = items;
    pageCount.value = totalPages;
  };

  const onTemplateSearch = async (payload?: string) => {
    await fetchTemplates(payload);
  };

  const sendToCreatePage = () => router.push(
    { name: 'message-templates-create' }
  );

  onMounted(fetchTemplates);

  return {
    confirmModalShow,
    confirmModalData,
    templates,
    templatesLoading,
    tableRef,
    fetchTemplates,
    onTemplateSearch,
    sendToCreatePage,
    openTemplatesModal,
    setTemplateData,
    handleTemplateDelete
  };
}
