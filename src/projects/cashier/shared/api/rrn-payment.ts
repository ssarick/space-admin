import { IResponseData } from '@/shared/types/api.types';
import { CashboxSellPayload } from '@/projects/cashier/pages/five-one-operation/five-one-operation.types';
import {
  BrvCountResponse,
  BrvSumResponse,
  CashboxBuyPayload
} from '@/projects/cashier/pages/five-three-operation/five-three-operation.types';
import { ClientInfoPayload } from '@/projects/cashier/shared/types/client-info.types';
import {
  ClientInfo,
  Country,
  CurrencyRate,
  DocumentTypes,
  PrintableInquiry,
  RrnHumoResponse,
  RrnUzcardResponse
} from '@/projects/cashier/shared/types/rrn-payment.types';
import {
  bankClientsInstance,
  bankDictionariesInstance,
  cashboxInstance,
  cashierHumoInstance,
  cashierUzcardInstance
} from './instance';

export const getUzcardRrn = async (
  rrnNumber: string
): Promise<IResponseData<RrnUzcardResponse>> => {
  const { data } = await cashierUzcardInstance.get(
    '/transaction/get-transaction-status-by-rrn',
    {
      params: {
        rrn: rrnNumber
      }
    }
  );

  return data;
};

export const getHumoRrn = async (
  rrnNumber: string
): Promise<IResponseData<RrnHumoResponse>> => {
  const { data } = await cashierHumoInstance.get(
    '/transaction/get-transaction-status-by-rrn',
    {
      params: {
        rrn: rrnNumber
      }
    }
  );

  return data;
};

export const getCurrencyRate = async (
  currencyCode: string
): Promise<IResponseData<CurrencyRate>> => {
  const { data } = await bankDictionariesInstance.get(
    '/common/get-exchange-rate',
    {
      params: {
        CurrencyCode: currencyCode,
        BankId: '01158'
      }
    }
  );

  return data;
};

export const getBrvSum = async (
): Promise<IResponseData<BrvSumResponse>> => {
  const { data } = await bankDictionariesInstance.get(
    '/cashbox/get-last-valid-reference-calculation-value'
  );

  return data;
};

export const getBrvCount = async (
): Promise<IResponseData<BrvCountResponse>> => {
  const { data } = await bankDictionariesInstance.get(
    '/cashbox/get-last-valid-exchange-regulatory-rule'
  );

  return data;
};

export const getClientInfoByDocument = async (
  payload: ClientInfoPayload
): Promise<IResponseData<ClientInfo>> => {
  const { data } = await bankClientsInstance.get(
    '/common/get-business-partner-information',
    {
      params: payload
    }
  );

  return data;
};

export const getDocumentTypes = async (): Promise<IResponseData<DocumentTypes>> => {
  const { data } = await bankDictionariesInstance.get(
    '/common/get-active-personal-document-types',
    {
      params: {
        pageNum: 1,
        pageSize: 11
      }
    }
  );

  return data;
};

export const getCountries = async (): Promise<IResponseData<Country>> => {
  const { data } = await bankDictionariesInstance.get(
    '/common/get-countries-info'
  );

  return data;
};

export const submitCashboxBuy = async (
  payload: CashboxBuyPayload
): Promise<IResponseData<PrintableInquiry>> => {
  const { data } = await cashboxInstance.post(
    '/exchange/buy-currency',
    payload
  );

  return data;
};

export const submitCashboxSell = async (
  payload: CashboxSellPayload
): Promise<IResponseData<PrintableInquiry>> => {
  const { data } = await cashboxInstance.post(
    '/exchange/sell-currency',
    payload
  );

  return data;
};
