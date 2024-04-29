import { IResponseData } from '@/shared/types/api.types';
import {
  BindedFace,
  BindedFaceFetchPayload,
  BindedFaceFormModel
} from '../types/binded-face.types';
import api from './instance';

export const fetchBindedList = async (
  params?: BindedFaceFetchPayload
): Promise<IResponseData<BindedFace>> => {
  const { data } = await api.get('/get-subjects-list', {
    params: {
      ...params,
      pageNum: params?.pageNumber
    }
  });

  return data;
};

export const createBindedFace = async (
  payload: BindedFaceFormModel
): Promise<IResponseData<BindedFace>> => {
  const { data } = await api.post('/add-subject', payload);

  return data;
};
