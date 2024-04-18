import 'axios';
import { ApiResponseCode } from './api.types';

declare module 'axios' {
  export interface AxiosRequestConfig {
    logoutOnError?: boolean
    skipRefreshTokenHandling?: boolean
    retryCount?: number
    passError?: boolean
    hideErrorMessage?: boolean
    endpoint?: ApiEndpoint
    hideErrorMessageForCodes?: ApiResponseCode[]
  }
}
