import { IPagination } from '@/shared/types/pagination.types';

export interface IPassport {
  serialPrefix: string | null
  serialNumber: string | null
  issueDate: string | null
  expiryDate: string | null
}

export interface IContract {
  id: number | null
}

export interface IContractDetail {
  contractId: number | null
  actualDebt: number | null
  contractDebt: number | null
  borrowerId: number | null
  contractExpiryDate: string | null
}

export interface IContragent extends IContract {
  pinfl: string | null
  inn: string | null
  surname: string | null
  name: string | null
  patronymic: string | null
  dateBirth: string | null
  passport: IPassport | null
  phoneNumber: string | null
}

export interface IContractListSearchPayload extends
  IPagination {
  contractId?: number
}

export interface IContractItemSearchPayload extends
  Pick<IContractListSearchPayload, 'contractId'> {}
