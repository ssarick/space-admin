import print from 'print-js';
import {
  OperationDocumentEmit,
  OperationDocumentProps
} from '@/projects/cashier/features/operation-document/operation-document.types';

export default function useOperationDocument(
  props: OperationDocumentProps,
  emit: OperationDocumentEmit
) {

  const showPDFAgain = () => {
    print({
      printable: props.pdfData,
      type: 'pdf',
      base64: true
    });
  };

  const resetToFirstStep = () => {
    emit('resetToFirstStep');
  };

  return {
    resetToFirstStep,
    showPDFAgain
  };
}
