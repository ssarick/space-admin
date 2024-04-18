import { stringify } from 'qs';
import { globalConfig } from '@/shared/config/global-config';
import { ApiInstance, ApiInstanceFactoryConfig } from '@/shared/types/api.types';
import BaseApiRequestInterceptor from '../interceptor/base/base-api-request-interceptor';
import BaseApiResponseInterceptor from '../interceptor/base/base-api-response-interceptor';

export default class ApiFactory {

  protected apiInstance: ApiInstance | null = null;

  protected successRequestInterceptor:
    BaseApiRequestInterceptor | null = null;

  protected successResponseInterceptor:
    BaseApiResponseInterceptor | null = null;

  protected errorResponseInterceptor:
    BaseApiResponseInterceptor | null = null;

  constructor(
    protected apiInstanceFactory: (
      config?: ApiInstanceFactoryConfig
    ) => ApiInstance
  ) {}

  setSuccessRequestInterceptor(
    interceptor: BaseApiRequestInterceptor | null
  ): this {
    this.successRequestInterceptor = interceptor;

    return this;
  }

  setSuccessResponseInterceptor(
    interceptor: BaseApiResponseInterceptor | null
  ): this {
    this.successResponseInterceptor = interceptor;

    return this;
  }

  setErrorResponseInterceptor(
    interceptor: BaseApiResponseInterceptor | null
  ): this {
    this.errorResponseInterceptor = interceptor;

    return this;
  }

  protected setRequestInterceptors(): this {
    this.apiInstance?.interceptors.request.use(
      this.successRequestInterceptor
        ?.intercept
        ?.bind(this.successRequestInterceptor)
    );

    return this;
  }

  protected setResponseInterceptors(): this {
    this.apiInstance?.interceptors.response.use(
      this.successResponseInterceptor
        ?.intercept
        .bind(this.successResponseInterceptor) as never,
      this.errorResponseInterceptor
        ?.intercept
        ?.bind(this.errorResponseInterceptor)
    );

    return this;
  }

  protected createApiInstance(
    baseUrlOrConfig: string | ApiInstanceFactoryConfig
  ): this {
    const baseURL: string = this.getBaseUrl(
      baseUrlOrConfig
    );

    const config: ApiInstanceFactoryConfig =
      typeof baseUrlOrConfig === 'string'
        ? {}
        : baseUrlOrConfig;

    this.apiInstance = this.apiInstanceFactory({
      ...config,
      baseURL,
      paramsSerializer: params => stringify(
        params, { arrayFormat: 'repeat' }
      )
    });

    return this;
  }

  hasProtocol(
    baseUrl: string
  ): boolean {
    return baseUrl.slice(0, 4) === 'http';
  }

  getBaseUrl(
    baseUrlOrConfig: string | ApiInstanceFactoryConfig = ''
  ): string {
    let baseUrlArg: string | undefined =
      typeof baseUrlOrConfig === 'string'
        ? baseUrlOrConfig
        : baseUrlOrConfig?.baseURL;

    baseUrlArg = baseUrlArg || '';

    if (this.hasProtocol(baseUrlArg))
      return baseUrlArg;

    return globalConfig.apiBaseUrl + baseUrlArg;
  }

  create(
    baseUrlOrConfig: string | ApiInstanceFactoryConfig = ''
  ): ApiInstance {
    this
      .createApiInstance(baseUrlOrConfig)
      .setRequestInterceptors()
      .setResponseInterceptors();

    return this.apiInstance!;
  }

}
