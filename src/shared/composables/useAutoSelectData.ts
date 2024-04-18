import { Ref, watchEffect } from 'vue';

export default function useAutoSelectData<T>(
  item: Ref<T>,
  list: Ref<T[]>
) {
  const unwatch = watchEffect(() => {
    if (list.value[0]) {
      [ item.value ] = list.value;

      try {
        unwatch();
      } catch {}
    }
  });
}
