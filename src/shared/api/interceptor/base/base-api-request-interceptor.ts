import { InternalAxiosRequestConfig } from 'axios';

export default abstract class BaseApiRequestInterceptor {

  abstract intercept(
    config: InternalAxiosRequestConfig
  ): Promise<InternalAxiosRequestConfig>;

}
