import { IContract } from '@/projects/autopay/shared/types/contract.types';

export interface IContractsTableProps {
  contracts: IContract[]
  loading: boolean
}

export interface IContractsTableEmit {
  (
    event: 'updatePagination'
  ): void
}
