import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import useFormRef from '@/shared/UI/base-form/useFormRef';
import { formValidate } from '@/shared/utils/functions';
import { ApiNotificationTemplates } from '@/projects/notification-service/shared/api';
import type { MessageTemplateInputForm } from '@/projects/notification-service/shared/types/send-message.types';

export default function useCreateMessageTemplate () {
  const formRef = useFormRef();
  const router = useRouter();
  const formModel = reactive<MessageTemplateInputForm>({
  });
  const loading = ref(false);

  const handleSubmitCreateTemplateMessage = async () => {
    const hasError = await formValidate(
      formRef.value
    );

    if (hasError) return;

    loading.value = true;

    const { error } = await ApiNotificationTemplates.createTemplate({
      ...formModel,
      channel: 'SMS'
    });

    loading.value = false;

    if (error) return;
    return router.push({
      name: 'message-templates'
    });
  };

  return {
    handleSubmitCreateTemplateMessage,
    formModel,
    formRef,
    loading
  };
}
