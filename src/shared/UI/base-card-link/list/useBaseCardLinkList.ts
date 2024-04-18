import { ILinkListItem } from '@/shared/types/list.types';
import { IBaseCardLinkListEmits } from './base-card-link-list.types';

export default function useBaseCardLinkList(
  emit: IBaseCardLinkListEmits
) {
  const onClickCardLink = (
    value: ILinkListItem
  ) => emit('select', value);

  return {
    onClickCardLink
  };
}
