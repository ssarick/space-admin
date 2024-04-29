import type {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  CreateAxiosDefaults
} from 'axios';
import { Primitive } from '.';

export enum ApiUrlPlaceholder {
  AUTH_PANEL = ':authPanel'
}

export enum ApiEndpoint {
  KC_AUTH = 'KC_AUTH',
  KC = 'KC'
}

export enum ApiResponseCode {
  LOAN_ACCOUNTS_NOT_FOUND_CODE = 10500,
  CONTRACT_NOT_FOUND_CODE = 10509,
  COBORROWER_IDS_NOT_FOUND = 10504
}

export interface IResponseData<T = {}> {
  item: T
  items: T[]
  totalCount: number
  totalPages: number
  error: boolean
}

export interface ApiInstance extends
  AxiosInstance {}

export interface ApiInstanceFactoryConfig extends
  CreateAxiosDefaults {}

export interface ApiErrorItem<T = unknown> {
  message?: string
  params?: T[]
}

export interface IApiError<T = unknown> {
  code?: ApiResponseCode
  message?: string
  error?: ApiErrorItem<T>
}

export interface GlobalApisProperties {
  readonly api: ApiInstance | null
  readonly apiAdmin: ApiInstance | null
}

export interface GlobalApis extends GlobalApisProperties {
  set<
    K extends keyof GlobalApisProperties,
    V extends GlobalApisProperties[K]
  >(key: K, value: V): GlobalApis
}

export interface ApiCreatedResponse {
  id?: number | null
  createdAt?: string | null
}

export type ApiErrorResponse = Partial<AxiosResponse<IResponseData>>
  | AxiosError
  | void;

export type ApiResponseItemsValue = object | Primitive;

export type ApiResponseItemsGetter = (
  response: AxiosResponse
) => ApiResponseItemsValue[];

export type ApiCreatedResponseList = PromiseSettledResult<
  ApiCreatedResponse | null
>;
