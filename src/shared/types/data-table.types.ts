import { PaginationProps } from 'naive-ui';
import { ToRefValues } from './utility.types';

export interface IDataTablePagination extends PaginationProps {
  page: number
  pageSize: number
  pageCount: number
  onReset: () => void
}

export interface IDataTableExpose {
  pagination: IDataTablePagination
}

export interface DataTableRefPagination {
  tableRef: IDataTableExpose | null
}

type DataTableRefValue = IDataTableExpose
  | DataTableRefPagination
  | null;

export type DataTableRef = ToRefValues<DataTableRefValue>;
