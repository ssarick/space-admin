import { ISelectOption } from '@/shared/types/select.types';
import { CURRENCIES } from '@/projects/cashier/shared/types/currency.types';

export const currencyOptions: ISelectOption<CURRENCIES>[] = [
  {
    label: 'USD',
    value: CURRENCIES.USD
  },
  {
    label: 'EUR',
    value: CURRENCIES.EUR
  },
  {
    label: 'RUB',
    value: CURRENCIES.RUB
  },
  {
    label: 'KZT',
    value: CURRENCIES.KZT
  },
  {
    label: 'GBP',
    value: CURRENCIES.GBP
  },
  {
    label: 'CHF',
    value: CURRENCIES.CHF
  },
  {
    label: 'JPY',
    value: CURRENCIES.JPY
  }
];
