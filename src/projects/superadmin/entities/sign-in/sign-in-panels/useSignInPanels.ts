import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { AuthPanel } from '@/shared/types/auth.types';
import { ILinkListItem } from '@/shared/types/list.types';
import {
  ISignInPanelsEmits, ISignInPanelsProps
} from './sign-in-panels.types';

export default function useSignInPanels(
  props: ISignInPanelsProps,
  emit: ISignInPanelsEmits
) {
  const { t } = useI18n();

  const preparedPanelsMap = computed<
    Partial<Record<AuthPanel, ILinkListItem>>
  >(
    () => ({
      [AuthPanel.B2B]: {
        title: t('B2B'),
        img: [
          '/icons/logo.svg',
          '/icons/uzum-b2b.svg'
        ]
      }
    })
  );

  const panelsList = computed<
    ILinkListItem<AuthPanel>[]
  >(() => createLinksByAvailablePanels(
    props.availablePanels
  ));

  const onSelectPanel = (
    value: ILinkListItem
  ) => emit(
    'select',
    value as ILinkListItem<AuthPanel>
  );

  function createLinksByAvailablePanels(
    availablePanels?: AuthPanel[]
  ): ILinkListItem<AuthPanel>[] {
    return availablePanels?.map(
      panel => preparedPanelsMap.value[panel]
        ? {
          ...preparedPanelsMap.value[panel],
          value: preparedPanelsMap.value[panel]
        } as ILinkListItem<AuthPanel>
        : {
          title: t(AuthPanel[panel]),
          img: [
            '/icons/logo.svg'
          ],
          value: panel
        }
    ) || [];
  }

  return {
    panelsList,
    onSelectPanel
  };
}
