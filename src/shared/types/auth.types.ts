export enum AuthBrowserStoreKey {
  accessToken = 'accessToken',
  refreshToken = 'refreshToken',
  rememberMe = 'rememberMe',
  panel = 'panel',
  fingerprint = 'fingerprint'
}

export enum AuthGrantType {
  password = 'password',
  refresh_token = 'refresh_token'
}

export enum AuthPanel {
  CONTROL_PANEL = 1,
  AUTOPAY,
  B2C,
  B2B,
  FILE_MANAGER,
  ISEEU,
  SUBSIDY,
  INVENTORY,
  NOTIFICATION,
  CASHIER,
  BINDED_FACE,
  LOGS_AUDIT,
  INTERNAL_NOTIFICATION
}

export enum AuthRole {
  ADMIN = 'admin',
  PARTNER = 'partner',
  APP_ASOKI_CREDIT_HISTORY_JURIDICAL_USER = 'APP_ASOKI_CREDIT_HISTORY_JURIDICAL_USER',
  APP_ASOKI_CREDIT_HISTORY_PHYSICAL_USER = 'APP_ASOKI_CREDIT_HISTORY_PHYSICAL_USER',
  APP_ASOKI_LOAN_CANCEL_USER = 'APP_ASOKI_LOAN_CANCEL_USER',
  APP_ASOKI_LOAN_JURIDICAL_USER = 'APP_ASOKI_LOAN_JURIDICAL_USER',
  APP_ASOKI_LOAN_PHYSICAL_USER = 'APP_ASOKI_LOAN_PHYSICAL_USER',
  APP_ASOKI_USER = 'APP_ASOKI_USER',
  APP_ATM_BUSINESS_USER = 'APP_ATM_BUSINESS_USER',
  APP_AUTOPAYKB24_ADMIN = 'APP_AUTOPAYKB24_ADMIN',
  APP_AUTOPAYKB24_USERS = 'APP_AUTOPAYKB24_USERS',
  APP_BANK_ACCOUNTS_USER = 'APP_BANK_ACCOUNTS_USER',
  APP_BANK_CLIENTS_USER = 'APP_BANK_CLIENTS_USER',
  APP_BANK_DICTIONARIES_USER = 'APP_BANK_DICTIONARIES_USER',
  APP_CARDS_COMMON_USER = 'APP_CARDS_COMMON_USER',
  APP_CARDS_CREATE_CARD_USER = 'APP_CARDS_CREATE_CARD_USER',
  APP_CARDS_WORLD_CARD_BIND_USER = 'APP_CARDS_WORLD_CARD_BIND_USER',
  APP_CARDS_WORLD_CARD_REBIND_USER = 'APP_CARDS_WORLD_CARD_REBIND_USER',
  APP_CASHBOX_USER = 'APP_CASHBOX_USER',
  APP_COUNTER_PARTY_CHECK_EXT_USER = 'APP_COUNTER_PARTY_CHECK_EXT_USER',
  APP_DEPOSITS_USER = 'APP_DEPOSITS_USER',
  APP_EIMZO_BUS = 'APP_EIMZO_BUS',
  APP_EVENT_LOGGER_ADMIN = 'APP_EVENT_LOGGER_ADMIN',
  APP_EVENT_LOGGER_USER = 'APP_EVENT_LOGGER_USER',
  APP_FERUZ_USER = 'APP_FERUZ_USER',
  APP_FILE_STORAGE = 'APP_FILE_STORAGE',
  APP_FOREX_USER = 'APP_FOREX_USER',
  APP_HUMO_EXT_USER = 'APP_HUMO_EXT_USER',
  APP_INTERNAL_NOTIFICATION_ADMIN = 'APP_INTERNAL_NOTIFICATION_ADMIN',
  APP_LOANS_USER = 'APP_LOANS_USER',
  APP_MORTGAGE_SUBSIDY_EXT_USER = 'APP_MORTGAGE_SUBSIDY_EXT_USER',
  APP_MUNIS_EXT_USER = 'APP_MUNIS_EXT_USER',
  APP_MY_ID_EXT_USER = 'APP_MY_ID_EXT_USER',
  APP_NOTIFICATION_ORCHESTRATOR_USER = 'APP_NOTIFICATION_ORCHESTRATOR_USER',
  APP_OTP_EXT_USER = 'APP_OTP_EXT_USER',
  APP_PAYMENTS_USER = 'APP_PAYMENTS_USER',
  APP_PLEDGE_REGISTRY_RECORD_EXT_USER = 'APP_PLEDGE_REGISTRY_RECORD_EXT_USER',
  APP_RELATED_PARTIES_BUSINESS_USER = 'APP_RELATED_PARTIES_BUSINESS_USER',
  APP_SALARY_USER = 'APP_SALARY_USER',
  APP_SCORING_EXT_USER = 'APP_SCORING_EXT_USER',
  APP_SWIFTS_USER = 'APP_SWIFTS_USER',
  APP_TIETO_EXT_USER = 'APP_TIETO_EXT_USER',
  APP_TPP_EXT_USER = 'APP_TPP_EXT_USER',
  APP_UZCARD_EXT_USER = 'APP_UZCARD_EXT_USER',
  APP_ZEBRA_ADMIN = 'APP_ZEBRA_ADMIN',
  B2C_CARD_TICKET = 'B2C_CardTicket',
  B2C_CLIENT_DATA = 'b2c_clientdata',
  CENTRAL_GOV_EXT_F1 = 'CENTRAL_GOV_EXT_F1',
  CENTRAL_GOV_EXT_F2 = 'CENTRAL_GOV_EXT_F2',
  CENTRAL_GOV_EXT_GCP = 'CENTRAL_GOV_EXT_GCP',
  CENTRAL_GOV_EXT_MIB = 'CENTRAL_GOV_EXT_MIB',
  DEFAULT_ROLES_AUTH = 'default-roles-auth',
  UMA_AUTHORIZATION = 'uma_authorization',
  APP_LOGS_AUDIT_USER = 'APP_LOGS_AUDIT_USER'
}

export enum AuthPanelEvent {
  CHANGE,
  LOAD
}

export interface ISignInParams {
  username: string
  password: string
  login?: string
}

export interface ISignUpParams {
  username: string
  password: string
  login?: string
}

export interface IAuthRefreshParams {
  refresh_token: string
}

export interface ISignOutParams extends IAuthRefreshParams {}

export interface IAuthClientParams {
  grant_type: AuthGrantType
  client_id: string
  client_secret: string
  scope: string
}

export interface ISignInFormModel extends ISignInParams {
  rememberMe?: boolean
}

export interface IAuthResponse {
  access_token: string | null
  expires_in: number | null
  refresh_expires_in: number | null
  refresh_token: string | null
  token_type: string | null
  'not-before-policy': number | null
  session_state: string | null
  scope: string | null
}

export interface IAuthToken {
  value: string
  expires?: Date
}

export interface IAuthedUserAccess {
  roles: AuthRole[]
}

export interface IAuthedUser {
  sub: string
  email_verified: boolean
  realm_access: IAuthedUserAccess
  name: string
  preferred_username: string
  given_name: string
  family_name: string
  email: string
  branch?: string
  role?: string
  roleId?: string | number
}

export interface AdminJwtPayload extends IAuthedUser {}

export interface IProfile extends IAuthedUser {
  phone?: string
  location?: string
  subdivision?: string
}

export interface ILogin {
  accessToken: string | null
  refreshToken: string | null
  userId: number | null
  name: string | null
  branch: string | null
  role: string | null
  sessionId: number | null
  roleId?: IAuthedUser['roleId'] | null
  refreshTokenExpiry: string | null
}

export interface IRefreshAuthParams
  extends Pick<ILogin, 'accessToken' | 'refreshToken'> {}

export interface IAuthPanelEventListenerOptions {
  authPanel?: AuthPanel
  listener: VoidFunction
}

export type AuthPanelEventListeners = Partial<
  Record<AuthPanelEvent, IAuthPanelEventListenerOptions[]>
>;

export type AuthPanelRoles = Partial<
  Record<AuthPanel, AuthRole[]>
>;
