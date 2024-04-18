import { IBaseDetailCardBody } from './base-detail-card.types';

export default function useBaseDetailCard() {
  const checkBodyRowIsVisible = (bodyRow: IBaseDetailCardBody): boolean =>
    bodyRow.visibility !== false;

  return {
    checkBodyRowIsVisible
  };
}
