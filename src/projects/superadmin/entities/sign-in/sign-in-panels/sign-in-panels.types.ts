import { AuthPanel } from '@/shared/types/auth.types';
import { ILinkListItem } from '@/shared/types/list.types';

export interface ISignInPanelsProps {
  availablePanels?: AuthPanel[]
}

export interface ISignInPanelsEmits {
  (
    event: 'select',
    value: ILinkListItem<AuthPanel>
  )
}
