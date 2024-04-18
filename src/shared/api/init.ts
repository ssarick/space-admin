import apiAdminInstance from './request/admin-instance';
import globalApis from './request/global';
import apiInstance from './request/instance';

export const initGlobalApis = () => {
  globalApis
    .set('api', apiInstance)
    .set('apiAdmin', apiAdminInstance);
};
