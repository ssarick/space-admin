export interface IndividualFilters {
  name?: string | null
  birthDate?: string | null
  pinfl?: string | null
  cutFio?: string | null
}

export interface IndividualFiltersModel extends IndividualFilters {}

export interface IndividualClient {
  name?: string | null
  rp?: string | null
  address?: string | null
  account?: string | null
  branchCode?: string | null
  branch?: string | null
}
