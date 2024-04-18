import { ref } from 'vue';
import { IHumoInterval } from '@/projects/autopay/shared/types/administration.types';

export default function useHumoInterval() {
  const humoIntervalList = ref<IHumoInterval[]>([
    {
      id: 1,
      name: 'Text'
    },
    {
      id: 2,
      name: 'Text'
    },
    {
      id: 3,
      name: 'Text'
    }
  ]);

  const humoIntervalChecked = ref<number | null>(1);
  const humoIntervalListLoading = ref(false);

  const onCheckHumoIntervalListItem = (
    payload: IHumoInterval
  ) => {
    console.warn(payload);
  };

  return {
    humoIntervalList,
    humoIntervalChecked,
    humoIntervalListLoading,
    onCheckHumoIntervalListItem
  };
}
