import { saveAs } from 'file-saver';
import {
  DownloadHandlersByType,
  DownloadType,
  IDownloadConfig
} from '../types/download.types';

const downloadConfig: IDownloadConfig = {
  excelBase64Prefix: 'data:application/vnd.'
    + 'openxmlformats-officedocument.'
    + 'spreadsheetml.sheet;base64,'
};

const downloadHandlersByType: DownloadHandlersByType = {
  [DownloadType.EXCEL_BASE64]: (
    data: string | Blob,
    filename?: string
  ) => {
    if (typeof data !== 'string') {
      throw new Error(
        'Data must be string type' +
          'for DownloadType.EXCEL_BASE64'
      );
    }

    saveAs(
      downloadConfig.excelBase64Prefix + data,
      filename
    );
  }
};

export const downloadFile = (
  downloadType: DownloadType,
  data: string | Blob,
  filename?: string
) => {
  const handler =
     downloadHandlersByType[downloadType];

  if (!handler) {
    throw new Error(
      'Handler for "DownloadType: '
        + `${downloadType}" not found`
    );
  }

  handler(data, filename);
};
