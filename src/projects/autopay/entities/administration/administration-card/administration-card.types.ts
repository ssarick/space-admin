import { PropType } from 'vue';
import { tagProps } from 'naive-ui';
import { IAdministationTypes, WithdrawalCircleCode } from '@/projects/autopay/shared/types/administration.types';

export interface IAdministrationCardProps {
  administrationInfo: IAdministationTypes
}

export interface AdministrationStatus {
  type: typeof tagProps['type']['type'] extends
    PropType<infer U> ? U : string
  name: string
}

export interface IAdministrationCardEmits {
  (e: 'turnOn'),
  (e: 'pause'),
  (e: 'renew'),
  (e: 'stop'),
}

export type AdministrationStatusesMap = Partial<
  Record<WithdrawalCircleCode, AdministrationStatus>
>
