export const isDisabledDatesExceptCurrent = (
  date: number
): boolean => date > Date.now();
