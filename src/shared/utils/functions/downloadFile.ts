import FileSaver from 'file-saver';

export default function downloadFile(
  file: Blob | string,
  fileName?: string | null
) {
  FileSaver.saveAs(file, fileName || undefined);
}

export function downloadBase64ToFile(
  base64: string,
  mimeType: string,
  fileName?: string | null
) {
  downloadFile(
    `data:${mimeType};base64,${base64}`,
    fileName
  );
}
