import { useVModels } from '@vueuse/core';
import type { MessageTemplateModel } from '@/projects/notification-service/shared/types/send-message.types';
import type {
  SendMessageTemplatesListEmits,
  SendMessageTemplatesListProps
} from './send-message-templates.types';

export default function useSendMessageTemplatesList(
  props: SendMessageTemplatesListProps,
  emit: SendMessageTemplatesListEmits
) {
  const models = useVModels(props, emit);

  const handleClickOnTemplate = () => {
    emit('handleTemplateSelectModal');
  };

  const handleClickOnSelectedTemplate = (payload: MessageTemplateModel) => {
    emit('sendingTemplateCode', payload);
  };

  return {
    models,
    handleClickOnTemplate,
    handleClickOnSelectedTemplate
  };
}
