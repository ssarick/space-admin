import { RouteParamValue } from 'vue-router';

export interface InventoryUser {
  fullName?: string | null
  userName?: string | null
  email?: string | null
  phoneNumber?: string | null
  stateId?: number | null
  id?: number | null
  createdDate?: string | null
}

export interface InventoryPaginationPayload {
  page?: number | null
  count?: number | null
  id?: string | RouteParamValue[]
  type?: string
}

export interface InventoryItemsApiResponse<T = {}> {
  httpStatus: number
  errors: boolean | [] | {}
  result: {
    pagesCount: number
    rowsCount: number
    items: T[]
  }
}

export interface InventoryApiResponse<T> {
  httpStatus: number
  errors: boolean | [] | {}
  result: T
}

export interface InventoryUserDetail extends
  Omit<InventoryUser, 'phoneNumber' | 'userName' > {}

export interface InventoryUserCreatePayload extends
  Omit<InventoryUser, 'id' | 'createdAt' | 'stateId'> {
  password?: string | null
}

export interface InventoryUserFormModel extends
  Partial<InventoryUserCreatePayload> {}
