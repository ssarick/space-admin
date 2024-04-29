import { IHumoCard } from '@/projects/autopay/shared/types/card.types';

export interface ITransactionListProps {
  columns: []
}
export interface IUntrustedCardsListProps {
  cards: IHumoCard[]
  loading: boolean
  checkedValues: number[]
}

export interface IUntrustedCardsListEmits {
  (e: 'update')
  (e: 'rowClick', row: IHumoCard)
}
