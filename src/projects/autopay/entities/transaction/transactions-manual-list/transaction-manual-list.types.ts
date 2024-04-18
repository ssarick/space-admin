import { ITransaction } from '@/projects/autopay/shared/types/transaction.types';

export interface ITransactionManualListTableProps {
  loading: boolean
  transactions: ITransaction[]
}
export interface ITransactionManualListTableEmits {
  (e: 'update', value?: string | null)
  (e: 'searchUpdate')
  (event: 'delete', value: ITransaction)
}
