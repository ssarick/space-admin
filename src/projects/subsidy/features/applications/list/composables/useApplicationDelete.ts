import { useI18n } from 'vue-i18n';
import { useMessage } from 'naive-ui';
import { useConfirmationDialog } from '@/shared/composables';
import { ApiSubsidyApplication } from '@/projects/subsidy/shared/api';
import { SubsidyApplicationInternal } from '@/projects/subsidy/shared/types/application.types';
import { SubsidyApplicationControls } from '../application-list.types';

export default function useApplicationDelete(
  applicationControls: SubsidyApplicationControls
) {
  const message = useMessage();
  const { t } = useI18n();

  const { showConfirmationDialog: deleteApplication } = useConfirmationDialog(
    confirmDeleteApplication
  );

  const findApplication = (
    id: number
  ): SubsidyApplicationInternal | undefined => applicationControls
    .applications
    .value
    .find(item => item.id === id);

  const requestDeleteApplication = async (
    application: SubsidyApplicationInternal
  ): Promise<boolean> => {
    application.loadingForDelete = true;

    const { error } = await ApiSubsidyApplication
      .deleteApplication({
        id: application.id!
      });

    application.loadingForDelete = false;

    return !error;
  };

  async function confirmDeleteApplication(id: number) {
    const application = findApplication(id);

    if (!application) return;

    const isSuccess = await requestDeleteApplication(
      application
    );

    if (isSuccess) {
      applicationControls.resetFilters();
      applicationControls.fetchApplications();
      message.success(t('Success'));
    }
  }

  return {
    deleteApplication
  };
}
