import { IUntrustedModalFilterValuesForm } from '@/projects/autopay/entities/untrusted-card/untrusted-card-filter-modal/untrusted-cards-filter-modal.types';

export const formValueFields: IUntrustedModalFilterValuesForm = {
  contractId: null,
  clientId: null,
  ownerFullName: '',
  genesisFullName: '',
  similarityFrom: null,
  similarityTo: null,
  status: '',
  check: ''
};

export const formValueNamings = {
  contractId: 'Договор ID',
  clientId: 'Владелец ID',
  ownerFullName: 'ФИО Владельца',
  genesisFullName: 'ФИО по Cards',
  similarityFrom: 'Совпадение от',
  similarityTo: 'Совпадение до',
  status: 'Cтатус'
};

export const numberValues = [
  'contractId',
  'clientId',
  'similarityFrom',
  'similarityTo'
];
