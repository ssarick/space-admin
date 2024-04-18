import { IContractDetail } from '@/projects/autopay/shared/types/contract.types';

export interface IContractDetailTableProps {
  contract: IContractDetail | null
  loading?: boolean
  coborrowers: number[]
}
