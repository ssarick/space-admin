import { IResponseData } from '@/shared/types/api.types';
import { IContract, IContractDetail } from '@/projects/autopay/shared/types/contract.types';

export default class ContractMapper {

  static toContracts(
    contracts: number[]
  ): IContract[] {
    return contracts.map(id => ({
      id
    }));
  }

  static detailToContracts(
    contract: IContractDetail
  ): IContract[] {
    return [
      {
        id: contract.contractId || 0
      }
    ];
  }

  static detailToContractsResponse(
    data: IResponseData<IContractDetail>
  ): IResponseData<IContract> {
    return {
      item: {
        id: data.item.contractId
      },
      items: data.item.contractId
        ? ContractMapper
          .detailToContracts(data.item)
        : [],
      totalCount: 1,
      totalPages: 1,
      error: false
    };
  }

}
