import { IResponseData } from '@/shared/types/api.types';
import { Permission } from '@/projects/b2b/shared/types/permission.types';
import api from './instance';

export const fetchPermissions = async ():
  Promise<IResponseData<Permission>> => {
  const { data } = await api
    .get('/api/admins/permissions');

  return data;
};
