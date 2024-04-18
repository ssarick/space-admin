import { IContragent } from '@/projects/autopay/shared/types/contract.types';

export interface IContragentDetailTableProps {
  contragent: IContragent | null
  loading?: boolean
}
