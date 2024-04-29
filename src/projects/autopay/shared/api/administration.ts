import { IResponseData } from '@/shared/types/api.types';
import { NonNullableObjectValues } from '@/shared/types/utility.types';
import { getResponseItemsFromPromiseResult } from '@/shared/utils/functions';
import {
  IAdministationTypes,
  IAdministrationActionResponseError,
  IDebitControlItem,
  IDebitControlItemValue,
  ILimit,
  LimitType
} from '@/projects/autopay/shared/types/administration.types';
import api from './instance';

const autopayLimitTypes: LimitType[] = [
  LimitType.AUTOPAY_CARD_LIMIT
];

const isAutopayLimitType = (
  limitType: LimitType
) => autopayLimitTypes
  .includes(limitType);

export const getInfo = async ():Promise<IResponseData<IAdministationTypes>> => {
  const { data } = await api.get('general/info');
  return data;
};

export const startProcessing = async (): Promise<IResponseData<IAdministrationActionResponseError>> => {
  const { data } = await api.post('general/start');
  return data;
};

export const blockQueue = async (): Promise<IResponseData<IAdministrationActionResponseError>> => {
  const { data } = await api.put('general/blocking');
  return data;
};

export const unblockQueue = async (): Promise<IResponseData<IAdministrationActionResponseError>> => {
  const { data } = await api.put('general/unblocking');
  return data;
};

const fetchDebitGeneralList = async (): Promise<
  IResponseData<IDebitControlItem>
> => {
  const { data } = await api
    .get('processing_state/general');

  return data;
};

export const fetchDebitList = async (): Promise<
  IResponseData<IDebitControlItem>
> => {
  const [
    autopayList
  ] = await Promise
    .allSettled([
      fetchDebitGeneralList()
    ]);

  return {
    items: [
      ...getResponseItemsFromPromiseResult(
        autopayList
      )
    ],
    error: false
  } as IResponseData<IDebitControlItem>;
};

export const changeDebitState = async (
  { key, value }: IDebitControlItemValue
): Promise<IResponseData<void>> => {
  const valueText = value
    ? 'enable'
    : 'disable';

  const { data } = await api
    .put(
      'processing_state/general' +
        `/${valueText}/${key}`
    );

  return data;
};

const fetchAutopayLimits = async (): Promise<
  IResponseData<ILimit>
> => {
  const { data } = await api
    .get('limits/autopay');

  return data;
};

const fetchGeneralLimits = async (): Promise<
  IResponseData<ILimit>
> => {
  const { data } = await api
    .get('limits/general');

  return data;
};

export const fetchLimits = async (): Promise<
  IResponseData<ILimit>
> => {
  const [
    autopayLimits,
    generalLimits
  ] = await Promise
    .allSettled([
      fetchAutopayLimits(),
      fetchGeneralLimits()
    ]);

  return {
    items: [
      ...getResponseItemsFromPromiseResult(
        autopayLimits
      ),
      ...getResponseItemsFromPromiseResult(
        generalLimits
      )
    ],
    error: false
  } as IResponseData<ILimit>;
};

const changeAutopayLimit = async (
  payload: NonNullableObjectValues<ILimit>
): Promise<IResponseData<void>> => {
  const { data } = await api
    .put('limits/autopay', undefined, {
      params: {
        amount: payload.limit,
        type: payload.type
      }
    });

  return data;
};

const changeGeneralLimit = async (
  payload: NonNullableObjectValues<ILimit>
): Promise<IResponseData<void>> => {
  const { data } = await api
    .put('limits/general', undefined, {
      params: {
        amount: payload.limit,
        type: payload.type
      }
    });

  return data;
};

export const changeLimit = async (
  payload: NonNullableObjectValues<ILimit>
): Promise<IResponseData<void>> => {
  const data = await (
    isAutopayLimitType(payload.type)
      ? changeAutopayLimit
      : changeGeneralLimit
  )(payload);

  return data;
};
