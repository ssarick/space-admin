import { computed, h } from 'vue';
import { useI18n } from 'vue-i18n';
import {
  DataTableColumn,
  NButton,
  NPopover
} from 'naive-ui';
import { StatusColor } from '@/shared/types/status.types';
import { BaseStatusItem } from '@/shared/UI/base-status';
import renderIcon from '@/shared/utils/render-icon';
import { ApiSubsidyApplication } from '@/projects/subsidy/shared/api';
import { SubsidyApplicationWithSentStatus } from '@/projects/subsidy/shared/types/application.types';
import { ApplicationsMinfinModalEmits } from '../applications-sent-statuses.types';

export default function useTableControls(
  emit: ApplicationsMinfinModalEmits
) {
  const { t } = useI18n();

  const getStatusConfig = (
    row: SubsidyApplicationWithSentStatus
  ) => row.sentStatus?.success
    ? {
      label: t('Success'),
      color: StatusColor.GREEN
    }
    : {
      label: 'Ошибка',
      color: StatusColor.RED
    };

  const tableColumns = computed<
    DataTableColumn<SubsidyApplicationWithSentStatus>[]
  >(() => [
    {
      width: 144,
      title: 'ПИНФЛ',
      key: 'pinfl'
    },
    {
      width: 210,
      title: 'Счет',
      key: 'accExternal'
    },
    {
      title: 'Статус отправки',
      key: 'statusName',
      width: 100,
      render: (row: SubsidyApplicationWithSentStatus) => h(
        BaseStatusItem,
        {
          ...getStatusConfig(row),
          type: 'filled'
        }
      )
    },
    {
      title: '',
      key: 'actions',
      fixed: 'right',
      align: 'center',
      width: '100px',
      render: (row: SubsidyApplicationWithSentStatus) => {
        const disabled = row.sentStatus?.success!;

        return h(
          NPopover,
          {
            placement: 'top',
            disabled
          },
          {
            trigger: () => h(NButton, {
              onClick: () => resendApplication(row),
              type: 'primary',
              size: 'small',
              circle: true,
              loading: row.loadingForSent,
              quaternary: true,
              disabled,
              renderIcon: renderIcon('renew')
            }),
            default: () => h('span', null, 'Повторить')
          }
        );
      }
    }
  ]);

  const tableRowKey = (
    row: SubsidyApplicationWithSentStatus
  ) => row.id;

  const useApplicationUpdater = (
    currentApplication: SubsidyApplicationWithSentStatus
  ) => (
    newApplication: SubsidyApplicationWithSentStatus
  ) => emit('updateApplication', {
    ...currentApplication,
    ...newApplication
  });

  async function resendApplication(
    application: SubsidyApplicationWithSentStatus
  ) {
    const updateApplication = useApplicationUpdater(
      application
    );

    updateApplication({
      loadingForSent: true
    });

    const { items } = await ApiSubsidyApplication
      .sendToMinfin({
        ids: [ application.id! ]
      });

    updateApplication({
      loadingForSent: false,
      sentStatus: items?.[0] ?? application.sentStatus
    });
  }

  return {
    tableColumns,
    tableRowKey
  };
}
