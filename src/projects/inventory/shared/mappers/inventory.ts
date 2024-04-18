import type { IResponseData } from '@/shared/types/api.types';
import type { ISelectOption } from '@/shared/types/select.types';
import type {
  InventorySelectOptions,
  InventorySession
} from '@/projects/inventory/shared/types/sessions.types';
import type {
  InventoryApiResponse,
  InventoryItemsApiResponse,
  InventoryUserDetail
} from '@/projects/inventory/shared/types/users.types';

export class InventoryMapper {
  static mapToInventoryUsersData(
    apiResponse: InventoryItemsApiResponse)
    : IResponseData<InventoryUserDetail> {

    return {
      item: apiResponse.result.items[0],
      items: apiResponse.result.items,
      totalCount: apiResponse.result.rowsCount,
      totalPages: apiResponse.result.pagesCount,
      error: apiResponse.errors !== null
    };
  }

  static mapToInventorySessionsData(
    apiResponse: InventoryItemsApiResponse)
    : IResponseData<InventorySession> {

    return {
      item: apiResponse.result.items[0],
      items: apiResponse.result.items,
      totalCount: apiResponse.result.rowsCount,
      totalPages: apiResponse.result.pagesCount,
      error: apiResponse.errors !== null
    };
  }

  static mapInventoryUsers(
    apiResponse: InventoryApiResponse<InventorySelectOptions[]>) {

    return apiResponse.result.map((item: InventorySelectOptions) => {

      const selectOptions: ISelectOption = {
        label: item.fullName,
        subLabel: item.email,
        value: item.id
      };

      return selectOptions;
    });
  }

  static mapInventoryOffices(
    apiResponse: InventoryApiResponse<InventorySelectOptions[]>) {

    return apiResponse.result.map((item: InventorySelectOptions) => {

      const selectOptions: ISelectOption = {
        label: item.name,
        value: item.id
      };

      return selectOptions;
    });
  }
}
