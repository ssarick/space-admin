import { computed, ref, watch } from 'vue';
import { useConfirmationDialog } from '@/shared/composables';
import { ApiSubsidyApplication } from '@/projects/subsidy/shared/api';
import { SubsidyApplicationWithSentStatus, SubsidySentStatus } from '@/projects/subsidy/shared/types/application.types';
import { SubsidyApplicationsMinfinControls } from '../application-list.types';

export default function useMinfinSender(
  minfinControls: SubsidyApplicationsMinfinControls
) {
  const minfinModalIsActive = ref(false);

  const minfinApplications = ref<
    SubsidyApplicationWithSentStatus[]
  >([]);

  const canSendToMinfin = computed<boolean>(
    () => !!minfinControls.selectedApplicationIds.value.length
  );

  const {
    showConfirmationDialog
  } = useConfirmationDialog(
    confirmSendToMinfin,
    'Внимание'
  );

  const handleSendToMinfin = () => {
    showConfirmationDialog(undefined, {
      content: 'Вы действительно хотите отправить заявки в Минфин?'
    });
  };

  const toggleMinfinModal = () =>
    minfinModalIsActive.value = !minfinModalIsActive.value;

  const setMinfinApplications = (
    statuses: SubsidySentStatus[]
  ) => {
    minfinApplications.value = statuses.reduce<
      SubsidyApplicationWithSentStatus[]
    >(
      (acc, sentStatus) => {
        const application = minfinControls
          .applications
          .value
          .find(item => item.id === sentStatus.id);

        application && acc.push({
          ...application,
          loadingForSent: false,
          sentStatus
        });

        return acc;
      },
      []
    );
  };

  const updateMinfinApplication = (
    payload: SubsidyApplicationWithSentStatus
  ) => {
    for (const application of minfinApplications.value) {
      if (application.id === payload.id) {
        Object.assign(application, payload);

        break;
      }
    }
  };

  const resetMinfin = () => {
    minfinControls.selectedApplicationIds.value = [];

    minfinControls.fetchApplications();
  };

  async function confirmSendToMinfin() {
    const { items, error } = await ApiSubsidyApplication
      .sendToMinfin({
        ids: minfinControls.selectedApplicationIds.value
      });

    if (error) return;

    setMinfinApplications(items);
    toggleMinfinModal();
  }

  watch(
    minfinModalIsActive,
    () => minfinModalIsActive.value || resetMinfin()
  );

  return {
    canSendToMinfin,
    handleSendToMinfin,
    minfinModalIsActive,
    minfinApplications,
    toggleMinfinModal,
    updateMinfinApplication
  };
}
