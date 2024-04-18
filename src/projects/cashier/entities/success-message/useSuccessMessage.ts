import { SuccessMessageEmits } from '@/projects/cashier/entities/success-message/success-message.types';

export function useSuccessMessage(
  emit: SuccessMessageEmits
) {
  const handleButtonClick = () => {
    emit('finalButtonClick');
  };

  const handlePdfClick = () => {
    emit('showPdfClick');
  };

  return {
    handleButtonClick,
    handlePdfClick
  };
}
