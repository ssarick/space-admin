import { AxiosError } from 'axios';
import { ApiErrorResponse } from '@/shared/types/api.types';
import { useAuthStore } from '@/app/store/auth/useAuthStore';
import BaseApiErrorManager from './base/base-api-error-manager';

export default class ApiLogoutManager extends BaseApiErrorManager {
  checkIfErrorResponseItFits(error: AxiosError): boolean {
    return !!error.config?.logoutOnError;
  }

  async handleErrorResponse(): Promise<ApiErrorResponse> {
    await useAuthStore().signOut();
  }
}
