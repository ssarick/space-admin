import { GlobalApis, GlobalApisProperties } from '@/shared/types/api.types';

const globalApis: GlobalApis = {
  api: null,
  apiAdmin: null,
  set<
    K extends keyof GlobalApisProperties,
    V extends GlobalApisProperties[K]
  >(key: K, value: V): GlobalApis {
    this[key] = value as never;

    return this;
  }
};

export default globalApis;
