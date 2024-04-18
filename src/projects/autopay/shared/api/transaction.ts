import { IResponseData } from '@/shared/types/api.types';
import {
  ITransaction, ITransactionCancelPayload,
  ITransactionListFetchPayload,
  ITransactionsImportToExcelPayload
} from '@/projects/autopay/shared/types/transaction.types';
import api from './instance';

export const fetchTransactions = async (
  payload?: ITransactionListFetchPayload
): Promise<IResponseData<ITransaction>> => {
  const { data } = await api
    .post('payment/filter', payload);

  return data as IResponseData<ITransaction>;
};

export const importTransactionsToExcel = async (
  payload: ITransactionsImportToExcelPayload
): Promise<Blob> => {
  const { data } = await api
    .post('payment/report', payload, {
      responseType: 'blob'
    });

  return data as Blob;
};

export const fetchTransactionsManual = async (
  payload?: ITransactionListFetchPayload
): Promise<IResponseData<ITransaction>> => {

  const { data } = await api
    .post('payment/filter-manual', payload);

  return data as IResponseData<ITransaction>;
};

export const importTransactionsManualToExcel = async (
  payload: ITransactionsImportToExcelPayload
): Promise<Blob> => {
  const { data } = await api
    .post('payment/report-manual', payload, {
      responseType: 'blob'
    });

  return data as Blob;
};

export const cancelTransaction = async (
  payload: ITransactionCancelPayload
): Promise<IResponseData> => {
  const { data } = await api
    .put('payment/manual-revert', payload);

  return data;
};
