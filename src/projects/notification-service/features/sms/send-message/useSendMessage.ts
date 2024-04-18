import { onMounted, reactive, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import { useMessage } from 'naive-ui';
import { usePagination } from '@/shared/composables';
import useTableRef from '@/shared/UI/base-data-table/useTableRef';
import useFormRef from '@/shared/UI/base-form/useFormRef';
import { formValidate } from '@/shared/utils/functions';
import { excludeEmptyObjectValues } from '@/shared/utils/functions/object';
import { ApiNotificationMessages, ApiNotificationTemplates } from '@/projects/notification-service/shared/api';
import {
  MessageTemplateModel, SendMessageInput,
  SendMessageToAllInput,
  SendMessageToOneInput,
  SendRadioInput
} from '@/projects/notification-service/shared/types/send-message.types';
import {
  GroupedMessageStatuses,
  MessageChannel,
  MessageSendingTypes
} from '@/projects/notification-service/shared/utils/constants/enums';
import { regExp } from '@/projects/notification-service/shared/utils/validation';

export default function useSendMessage() {
  const { t } = useI18n();
  const toast = useMessage();
  const tableRef = useTableRef();
  const formRef = useFormRef();
  const router = useRouter();

  const {
    pageCount,
    pageNumber,
    pageSize
  } = usePagination(tableRef);

  const defaultFormValues: SendMessageInput = {
    channel: MessageChannel.SMS,
    templateCode: null,
    priority: null,
    language: null,
    to: null,
    parameters: {},
    file: null
  };

  const sendingType = ref<number>(0);
  const startSendingMessageToAll = ref(false);
  const confirmModalToAll = ref(false);
  const sendingToAllModel = reactive<SendMessageToAllInput>({
    ...defaultFormValues
  });
  const confirmModalToOne = ref(false);
  const sendingToOneModel = reactive<SendMessageToOneInput>({
    ...defaultFormValues
  });
  const sendingLoading = ref(false);
  const selectedTemplate = reactive<MessageTemplateModel>({});
  const templates = ref<MessageTemplateModel[]>();
  const templatesLoading = ref(false);
  const templateModalShow = ref(false);

  const sendingTypes = computed<SendRadioInput[]>(() => [
    {
      id: MessageSendingTypes.TO_GROUP,
      name: t('to-group'),
      title: t('send-grouped')
    },
    {
      id: MessageSendingTypes.TO_CLIENT,
      name: t('to-client'),
      title: t('send-client')
    }
  ]);

  const pageTitle = computed(
    () => sendingTypes.value[sendingType.value].title
  );

  const extractParams = (inputString?: string | null) => {
    const parameters: SendMessageInput['parameters'] = {};
    let match: RegExpExecArray | null;
    while ((match = regExp.params.exec(inputString as string)) !== null) {
      parameters[match[1]] = '';
    }
    return parameters;
  };

  const setTemplateCodeToAll = (payload: SendMessageToAllInput['templateCode']) => {
    sendingToAllModel.templateCode = payload;
  };

  const setTemplateCodeToOne = (payload: SendMessageToOneInput['templateCode']) => {
    sendingToOneModel.templateCode = payload;
  };

  const onConfirmSubmitSendingToAll = async () => {
    const hasError = await formValidate(
      formRef.value
    );
    if (hasError) return;

    confirmModalToAll.value = true;
  };

  const submitSendingToAll = async () => {
    sendingLoading.value = true;

    const sendingMessageObject: SendMessageToAllInput = excludeEmptyObjectValues<SendMessageToAllInput>(sendingToAllModel);

    const {
      item,
      error
    } = await ApiNotificationMessages.sendMessageToAll(sendingMessageObject);

    confirmModalToAll.value = false;
    sendingLoading.value = false;

    if (error) return;
    if (item.status) {
      toast.success(t('Message-sent') + ' !');
      startSendingMessageToAll.value && await ApiNotificationMessages.changeStatusOfGroupedMessage(
        {
          newStatus: GroupedMessageStatuses.IN_PROGRESS,
          massMailingId: item.id
        }
      );
      router.push('grouped-messages');
    }
  };

  const onConfirmSubmitSendingToOne = async () => {
    const hasError = await formValidate(
      formRef.value
    );
    if (hasError) return;

    confirmModalToOne.value = true;
  };

  const submitSendingToOne = async () => {
    sendingLoading.value = true;

    const sendingMessageObject: SendMessageToOneInput = {
      ...excludeEmptyObjectValues<SendMessageToOneInput>(sendingToOneModel),
      to: sendingToOneModel.to?.replace(regExp.clearNumber, '') as string
    };

    const {
      item,
      error
    } = await ApiNotificationMessages.sendMessageToOne(sendingMessageObject);

    confirmModalToOne.value = false;
    sendingLoading.value = false;

    if (error) return;
    if (item.status) {
      toast.success(t('Grouped-message-sent') + ' !');
      router.push('all-messages');
    }
  };

  const fetchSendMessageTemplates = async (payload?: string) => {
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

  const selectTemplate = (template: MessageTemplateModel) => {
    Object.assign(selectedTemplate, template);

    if (sendingType.value === MessageSendingTypes.TO_GROUP) setTemplateCodeToAll(template.code);
    else setTemplateCodeToOne(template.code);

    sendingToOneModel.parameters = extractParams(selectedTemplate.textRu);
    templateModalShow.value = false;
  };

  const handleValuesForParameters = (key: string | number, value: string) => {
    if (sendingToOneModel.parameters) {
      sendingToOneModel.parameters[key] = value;
    }
  };

  const onTemplateSearch = async (payload?: string) => {
    await fetchSendMessageTemplates(payload);
  };

  const showTemplatesModal = () => {
    templateModalShow.value = true;
  };

  const handleCheckedChange = (checked: boolean) => {
    startSendingMessageToAll.value = checked;
  };

  onMounted(fetchSendMessageTemplates);

  return {
    formRef,
    tableRef,
    pageTitle,
    sendingLoading,
    sendingType,
    sendingTypes,
    sendingToAllModel,
    sendingToOneModel,
    templates,
    selectedTemplate,
    templatesLoading,
    templateModalShow,
    confirmModalToOne,
    confirmModalToAll,
    startSendingMessageToAll,
    fetchSendMessageTemplates,
    onTemplateSearch,
    selectTemplate,
    showTemplatesModal,
    submitSendingToAll,
    submitSendingToOne,
    onConfirmSubmitSendingToAll,
    onConfirmSubmitSendingToOne,
    setTemplateCodeToOne,
    setTemplateCodeToAll,
    handleCheckedChange,
    handleValuesForParameters
  };
}
