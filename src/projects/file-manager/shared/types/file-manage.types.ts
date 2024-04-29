import { Primitive } from '@/shared/types';
import { IPagination } from '@/shared/types/pagination.types';

export enum FileManageExtension {
  doc,
  docx,
  xls,
  xlsx,
  csv,
  pdf,
  txt,
  png,
  jpg,
  jpeg,
  default
}

export enum FileManageFilterKey {
  bucket = 'bucket',
  folder = 'folder',
  filename = 'filename',
  createdAt = 'createdAt',
  updatedAt = 'updatedAt',
  signed = 'signed'
}

export enum FileManageFilterOperation {
  eq = 'eq',
  cn = 'cn'
}

export enum FileManageEntityType {
  FOLDER,
  FILE
}

export enum FileManageSignType {
  UNSIGNED = 'UNSIGNED',
  SIGNED_WITH_FILE = 'SIGNED_WITH_FILE',
  SIGNED_WITHOUT_FILE = 'SIGNED_WITHOUT_FILE'
}

export enum FileManageSortType {
  desc = 'desc',
  asc = 'asc'
}

export interface IFileManageFilters {
  uploadDate?: number | null
  updatedDate?: number | null
  signFact?: number | null
  search?: string | null
  bucketId?: string | null
}

export interface IFileManageItem {
  bucket?: string | null
  name?: string | null
  fileType?: FileManageSignType | null
  folder?: string | null
  signed?: boolean | null
  description?: string | null
  createdAt?: string | null
  updatedAt?: string | null
  deleteAt?: string | null
}

export interface IFileManageBucket {
  name?: string | null
}

export interface IFileManageDownloadableContent {
  name?: string | null
  content?: string | null
  mimeType?: string | null
}

export interface IFileManageDownloadable {
  fileContent?: IFileManageDownloadableContent | null
  signContent?: IFileManageDownloadableContent | null
  params?: object | null
  description?: string | null
  signed?: boolean
}

export interface IFileManageFiltersFormModel extends
  Omit<IFileManageFilters, 'bucketId'> {}

export interface IFileManageDownloadPayload {
  bucket: string
  folder: string
  filename: string
}

export interface IFileManageFilterCriteria {
  key: FileManageFilterKey
  value?: Primitive
  operation: FileManageFilterOperation
}

export interface IFileManageFetchPayload extends IPagination {
  searchCriteria: IFileManageFilterCriteria[]
}

export interface IFileManageFolderPayload extends IPagination {
  bucketId: string
  sort?: FileManageSortField
  'name.dir'?: FileManageSortType
}

export interface IFileManageFilterUtils {
  filtersModel: IFileManageFilters
  getFoldersFilters: () => IFileManageFolderPayload
  getFilesFilters: () => IFileManageFetchPayload
  getFolderFilesFilters: (
    folder: IFileManageGeneralEntity<
      FileManageEntityType.FOLDER
    >
  ) => IFileManageFetchPayload
}

export interface IFileManageFilterUtilsForFetcher extends
  IFileManageFilterUtils {}

export interface IFileManageGeneralEntity<
  T extends FileManageEntityType
> {
  id?: string | null
  name?: string | null
  data?: IFileManageEntities[T]
  type: T
  key?: string | number | null
  loading?: boolean
  expanded?: boolean
  children?: FileManageEntity[]
}

interface IFileManageEntities {
  [FileManageEntityType.FILE]: IFileManageItem
  [FileManageEntityType.FOLDER]: undefined
}

export type FileManageSortField = keyof IFileManageItem;

export type FileManageEntity = {
  [P in keyof IFileManageEntities]: IFileManageGeneralEntity<P>
}[FileManageEntityType];
