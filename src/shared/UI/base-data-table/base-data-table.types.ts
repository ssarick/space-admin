import { DataTableColumn, InputProps } from 'naive-ui';
import {
  CreateRowProps,
  DataTableProps,
  RowData
} from 'naive-ui/es/data-table/src/interface';

export interface IDataTableSettings {
  defaultColumnsOrder?: Array<string>
  hiddenColumns?: Array<string>
  renderFunctions?: object
}

export interface IDataTableProps<T = never> {
  pageSize?: number
  pageSizes?: Array<number>
  columns: DataTableColumn<T>[]
  rowProps?: CreateRowProps<T>
  data: RowData[]
  size?: DataTableProps['size']
  loading?: boolean
  singleLine?: boolean
  settings?: IDataTableSettings
  heightMinus?: string | number
  maxHeight?: string | number
  searchInputProps?: Partial<InputProps>
  rowKey?: (row: T) => string | number | null | undefined
  rowClick?: (row: T, index: number, event: PointerEvent) => void
  hidePagination?: boolean
  hasFilteringInput?: boolean
  hideExpandIcon?: boolean
  hideTable?: boolean
}

export interface IDataTableEmit {
  (event: 'update', value?: string)
}
