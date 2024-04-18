export interface EntityFilters {
  name?: string | null
  openDate?: string | null
  pinfl?: string | null
}

export interface EntityFiltersModel extends EntityFilters {}

export interface EntityClient {
  mfo?: string | null
  inn?: string | null
  clientCode?: string | null
  name?: string | null
  openDate?: string | null
  closeDate?: string | null
  state?: string | null
}
