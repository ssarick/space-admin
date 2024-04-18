import { DateTimeField } from '@/shared/types/date.types';
import { IExcelFormInputs, IFilterFormInputs } from '@/projects/autopay/shared/types/transaction.types';

export const formValueFields: IFilterFormInputs = {
  contractId: null,
  cardHolderId: null,
  amountFrom: null,
  amountTo: null,
  transactionStatus: '',
  dateFrom: null,
  dateTo: null,
  processingType: '',
  b2Completed: null,
  passport: '',
  panMaskedLastNumbers: null,
  timeFrom: null,
  timeTo: null
};

export const formValuesNaming = {
  contractId: 'Договор ID',
  cardHolderId: 'Клиент ID',
  amountFrom: 'Сумма от',
  amountTo: 'Сумма до',
  transactionStatus: 'Статус',
  dateFrom: 'Дата от',
  dateTo: 'Дата до',
  processingType: 'Источник',
  b2Completed: 'АБС B2',
  passport: 'Паспорт',
  panMaskedLastNumbers: 'Последние цифры номера карты',
  timeFrom: 'Время от',
  timeTo: 'Время до'
};

export const excelValueFields: IExcelFormInputs = {
  contractId: null,
  amountFrom: null,
  amountTo: null,
  dateFrom: null,
  dateTo: null,
  processingTypes: [],
  timeFrom: null,
  timeTo: null
};

export const dateTimeFields: DateTimeField = {
  dateFrom: {
    timeField: 'timeFrom',
    timeDefaultValue: '00:00:00'
  },
  dateTo: {
    timeField: 'timeTo',
    timeDefaultValue: '23:59:59'
  }
};

export const amountFields = [ 'amountFrom', 'amountTo' ];
