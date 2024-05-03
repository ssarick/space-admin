/// <reference types="vite/client" />

interface ImportMetaEnv {
  // API url
  readonly VITE_API_BASE_URL: string
  readonly VITE_API_CONTROL_PANEL_URL: string
  readonly VITE_API_AUTOPAY_URL: string
  readonly VITE_API_B2B_URL: string
  readonly VITE_API_FILE_MANAGER_URL: string
  readonly VITE_API_SUBSIDY: string
  readonly VITE_API_NOTIFICATION_SERVICE: string
  readonly VITE_API_LOGS_AUDIT: string
  readonly VITE_API_INVENTORY_URL: string
  readonly VITE_API_AUTH_URL: string
  readonly VITE_API_ADMIN_URL: string
  readonly VITE_API_CASHIER_HUMO_URL: string
  readonly VITE_API_CASHIER_UZCARD_URL: string
  readonly VITE_API_BANK_DICTIONARIES_URL: string
  readonly VITE_API_CASHBOX_URL: string
  readonly VITE_API_BANK_CLIENTS_URL: string
  readonly VITE_API_BINDED_FACE: string
  readonly VITE_API_INTERNAL_NOTIFICATION_URL: string

  // API Auth client id
  readonly VITE_API_AUTH_CLIENT_ID: string

  // API Auth client secret
  readonly VITE_API_AUTH_CLIENT_SECRET: string
}
