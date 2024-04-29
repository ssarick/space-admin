import { ClientStateId, IClient } from '@/projects/b2b/shared/types/client.types';

export type ClientStateTextMap = {
  [P in ClientStateId]: string;
};

export interface IClientDetailActionsProps {
  client: IClient | null
  businessCode: string
}

export interface IClientDetailActionsEmit {
  (event: 'update:client', value: IClientDetailActionsProps['client']): void
}
