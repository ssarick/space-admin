import { ITransaction } from '@/projects/autopay/shared/types/transaction.types';

export interface ITransactionListTableProps {
  loading: boolean
  transactions: ITransaction[]
}
export interface ITransactionListTableEmits {
  (e: 'update', value?: string | null): void
  (e: 'searchUpdate') : void
  (event: 'delete', value: ITransaction)
}
