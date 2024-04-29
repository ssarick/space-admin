import { useRouter } from 'vue-router';
import { ApiCreatedResponse, ApiCreatedResponseList } from '@/shared/types/api.types';
import { AuthPanel } from '@/shared/types/auth.types';
import { NonNullableObjectValues } from '@/shared/types/utility.types';
import useFormRef from '@/shared/UI/base-form/useFormRef';
import { formValidate } from '@/shared/utils/functions';
import { ApiInternalNotificationCreate } from '../../shared/api';
import { InternalNotificationCreateServiceModel } from '../../shared/types/internal-notification.types';
import { InternalNotificationCreateModel } from './internal-notification-create.types';

export default function useInternalNotificationCreate() {
  const submitLoading = ref(false);
  const formRef = useFormRef();
  const router = useRouter();

  const formModel = reactive<
    InternalNotificationCreateModel
  >({
    version: '',
    services: [ createService() ]
  });

  const servicesDeletable = computed<boolean>(
    () => formModel.services.length > 1
  );

  const uploadNotificationFile = async (
    id: number,
    file: File
  ): Promise<boolean> => {
    const { error } = await ApiInternalNotificationCreate
      .uploadFile({
        id,
        file
      });

    return !error;
  };

  const createNotification = async (
    {
      file,
      service,
      ...payload
    }: NonNullableObjectValues<
      InternalNotificationCreateServiceModel
    >
  ): Promise<ApiCreatedResponse | null> => {
    const { item } = await ApiInternalNotificationCreate
      .create({
        ...payload,
        service: AuthPanel[service],
        version: formModel.version
      });

    if (!item?.id) return null;

    file && await uploadNotificationFile(item.id, file);

    return item;
  };

  const handleCreateNotifications = async ():
  Promise<ApiCreatedResponseList[]> => {
    submitLoading.value = true;

    const validatedServices = formModel.services as
      NonNullableObjectValues<
        InternalNotificationCreateServiceModel
      >[];

    const result = await Promise.allSettled(
      validatedServices.map(createNotification)
    );

    submitLoading.value = false;

    return result;
  };

  const checkCreatedResponsesForHasErrors = (
    responses: ApiCreatedResponseList[]
  ): boolean => !responses.every(
    response => response?.status === 'fulfilled'
      && !!response.value?.id
  );

  const handleSubmit = async () => {
    const hasError = await formValidate(formRef.value);

    if (hasError) return;

    const responses = await handleCreateNotifications();

    const responseHasError = checkCreatedResponsesForHasErrors(
      responses
    );

    responseHasError || router.push({
      name: 'notification'
    });
  };

  const handleAddService = () =>
    formModel.services.push(createService());

  const handleDeleteService = (index: number) => {
    formModel.services.splice(index, 1);
  };

  function createService():
  InternalNotificationCreateServiceModel {
    return {
      service: null,
      text: '',
      title: '',
      file: null
    };
  }

  return {
    submitLoading,
    formModel,
    formRef,
    servicesDeletable,
    handleSubmit,
    handleAddService,
    handleDeleteService
  };
}
