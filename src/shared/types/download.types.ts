export enum DownloadType {
  EXCEL_BASE64
}

export type DownloadHandler = (
  data: Blob | string,
  filename?: string
) => void;

export type DownloadHandlersByType = {
  [P in DownloadType]: DownloadHandler
};

export interface IDownloadConfig {
  excelBase64Prefix: string
}
