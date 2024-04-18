import { IResponseData } from '@/shared/types/api.types';
import { ICard, ICardsListFetchPayload, IHumoCard, UntrustedCardStatus } from '@/projects/autopay/shared/types/card.types';
import api from './instance';

export const fetchCards = async (
  payload?: ICardsListFetchPayload
): Promise<IResponseData<ICard>> => {

  const { data } = await api
    .post('autopay/card/corrupted/filter', payload);

  return data as IResponseData<ICard>;
};

export const approveCards = async (
  payload: number[]
) : Promise<IResponseData<UntrustedCardStatus>> => {
  const { data } = await api.post('autopay/card/corrupted/approve', payload);
  return data;
};

export const declineCards = async (
  payload: number[]
) : Promise<IResponseData<UntrustedCardStatus>> => {
  const { data } = await api.post('autopay/card/corrupted/decline', payload);
  return data;
};

export const fetchHumoCards = async (
  payload?: ICardsListFetchPayload
): Promise<IResponseData<IHumoCard>> => {

  const { data } = await api
    .post('cards/corrupted/filter', payload);

  return data;
};

export const approveHumoCards = async (
  payload: number[]
) : Promise<IResponseData<void>> => {
  const { data } = await api.post('cards/corrupted/approve', payload);
  return data as IResponseData<void>;
};

export const declineHumoCards = async (
  payload: number[]
) : Promise<IResponseData<void>> => {
  const { data } = await api.post('cards/corrupted/decline', payload);
  return data as IResponseData<void>;
};
