import { onMounted, reactive, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import { useMessage } from 'naive-ui';
import { useConfirmationDialog } from '@/shared/composables';
import useFormRef from '@/shared/UI/base-form/useFormRef';
import { formValidate } from '@/shared/utils/functions';
import { ApiSubsidyApplication } from '@/projects/subsidy/shared/api';
import { SubsidyApplication, SubsidyApplicationFormModel } from '@/projects/subsidy/shared/types/application.types';
import { ApplicationEditProps } from './application-edit.types';
import SubsidyApplicationMapper from './mappers/application-mapper';

export default function useApplicationEdit(
  props: ApplicationEditProps
) {
  const dataLoading = ref(false);
  const application = ref<SubsidyApplication | null>(null);
  const formRef = useFormRef();
  const router = useRouter();
  const message = useMessage();
  const { t } = useI18n();

  const {
    showConfirmationDialog
  } = useConfirmationDialog(
    onConfirmEdit
  );

  const formModel = reactive<SubsidyApplicationFormModel>({
    pinfl: null,
    accExternal: null,
    amountThisMonthTiyin: null,
    restAmountTiyin: null,
    percentagePaymentDate: null,
    contractType: null,
    mfo: null,
    contractPaymentStartDate: null,
    decision: null,
    creditAmountTiyin: null
  });

  const onSubmit = async () => {
    const hasError = await formValidate(
      formRef.value
    );

    hasError || showConfirmationDialog();
  };

  const fetchApplication = async () => {
    dataLoading.value = true;

    const { item, error } = await ApiSubsidyApplication
      .fetchApplicationItem({
        id: props.subsidyId
      });

    error || Object.assign(
      formModel,
      SubsidyApplicationMapper.toFormModel(item)
    );

    application.value = item;
    dataLoading.value = false;
  };

  async function onConfirmEdit() {
    const { error } = await ApiSubsidyApplication
      .editApplication({
        id: props.subsidyId,
        ...SubsidyApplicationMapper.toUpdatePayload(
          formModel
        )
      });

    if (error) return;

    message.success(t('Success'));
    router.push({ name: 'subsidy-applications' });
  }

  onMounted(fetchApplication);

  return {
    formRef,
    dataLoading,
    formModel,
    application,
    onSubmit
  };
}
