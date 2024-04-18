import { computed } from 'vue';
import { Justify } from 'naive-ui/es/space/src/Space';
import { IListItem } from '@/shared/types/common.types';
import { IBaseSimpleTableEmits, IBaseSimpleTableProps } from './base-simple-table.types';

const checkByKeyDefault = 'id';

export default function useBaseSimpleTable(
  props: IBaseSimpleTableProps,
  emit: IBaseSimpleTableEmits
) {
  const checkByKey = computed<string | number>(
    () => props.checkByKey || checkByKeyDefault
  );

  const getRowContentFlexAlign = (
    item: IListItem
  ): Justify => (props.checkable
    && !item?.subText
    && !item?.links?.length)
    ? 'end'
    : 'space-between';

  const isCheckedItem = (
    item: IListItem
  ): boolean => !!props.checkedIds?.some(
    id => id === item[checkByKey.value]
  );

  const checkItem = (
    value: boolean,
    item: IListItem
  ) => {
    const newList = props.checkedIds?.filter(
      id => item[checkByKey.value] !== id
    ) || [];

    if (value) newList.push(item[checkByKey.value]);

    emit('update:checkedIds', newList);
  };

  return {
    isCheckedItem,
    checkItem,
    getRowContentFlexAlign
  };
}
