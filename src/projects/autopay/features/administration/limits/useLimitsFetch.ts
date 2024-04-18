import { onMounted, ref } from 'vue';
import { ApiAdministration } from '@/projects/autopay/shared/api';
import { ILimit, ILimitWithOptions } from '@/projects/autopay/shared/types/administration.types';

export default function useLimitsFetch() {
  const limitList = ref<ILimitWithOptions[]>([]);
  const limitListLoading = ref(false);

  const mapLimits = (
    list: ILimit[]
  ): ILimitWithOptions[] => list.map(
    item => ({
      ...item,
      loading: false
    })
  );

  const fetchLimitList = async () => {
    limitListLoading.value = true;

    const { items } = await ApiAdministration
      .fetchLimits();

    limitList.value = mapLimits(items || []);
    limitListLoading.value = false;
  };

  onMounted(() => {
    fetchLimitList();
  });

  return {
    limitList,
    limitListLoading
  };
}
