import axios from 'axios';
import ApiErrorResponseInterceptor from '../interceptor/api-error-response-interceptor';
import ApiSuccessRequestInterceptor from '../interceptor/api-success-request-interceptor';
import ApiSuccessResponseInterceptor from '../interceptor/api-success-response-interceptor';
import ApiLogoutManager from '../manager/api-logout-manager';
import ApiMessageManager from '../manager/api-message-manager';
import ApiPassErrorManager from '../manager/api-pass-error-manager';
import ApiRefreshTokenManager from '../manager/api-refresh-token-manager';
import ApiRetryManager from '../manager/api-retry-manager';
import ApiFactory from './api-factory';

export default new ApiFactory(axios.create)
  .setSuccessRequestInterceptor(
    new ApiSuccessRequestInterceptor()
  )
  .setSuccessResponseInterceptor(
    new ApiSuccessResponseInterceptor()
  )
  .setErrorResponseInterceptor(
    new ApiErrorResponseInterceptor([
      new ApiRetryManager(),
      new ApiLogoutManager(),
      new ApiRefreshTokenManager(),
      new ApiPassErrorManager(),
      new ApiMessageManager()
    ])
  );
