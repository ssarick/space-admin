import apiFactory from '@/shared/api/factory';
import { globalConfig } from '@/shared/config/global-config';

export default apiFactory.create(
  globalConfig.apiBankClientsUrl
);
