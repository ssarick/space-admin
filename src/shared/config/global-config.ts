export const globalConfig = {
  isDevEnv: import.meta.env.DEV,
  debounceInMS: 500,
  pageSize: 10,
  searchMinLength: 3,
  apiAuthUrl: import.meta.env.VITE_API_AUTH_URL,
  apiAdminUrl: import.meta.env.VITE_API_ADMIN_URL,
  apiAuthClientId: import.meta.env.VITE_API_AUTH_CLIENT_ID,
  apiAuthClientSecret: import.meta.env.VITE_API_AUTH_CLIENT_SECRET,
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL,
  apiAutopayUrl: import.meta.env.VITE_API_AUTOPAY_URL,
  apiB2bUrl: import.meta.env.VITE_API_B2B_URL,
  apiFileManagerUrl: import.meta.env.VITE_API_FILE_MANAGER_URL,
  apiInventoryUrl: import.meta.env.VITE_API_INVENTORY_URL,
  apiNotificationServiceUrl: import.meta.env.VITE_API_NOTIFICATION_SERVICE,
  apiSubsidy: import.meta.env.VITE_API_SUBSIDY,
  apiBindedFaceUrl: import.meta.env.VITE_API_BINDED_FACE,
  apiLogsAuditUrl: import.meta.env.VITE_API_LOGS_AUDIT,
  apiCashierUzcardUrl: import.meta.env.VITE_API_CASHIER_UZCARD_URL,
  apiCashierHumoUrl: import.meta.env.VITE_API_CASHIER_HUMO_URL,
  apiBankDictionariesUrl: import.meta.env.VITE_API_BANK_DICTIONARIES_URL,
  apiCashboxUrl: import.meta.env.VITE_API_CASHBOX_URL,
  apiBankClientsUrl: import.meta.env.VITE_API_BANK_CLIENTS_URL,
  apiInternalNotificationUrl: import.meta.env.VITE_API_INTERNAL_NOTIFICATION_URL,
  amount: {
    remainderLength: 2
  },
  semver: {
    maxLength: 3
  },
  pollingDelayInSec: 5,
  internalNotification: {
    pollingDelayInSec: 10
  }
} as const;
