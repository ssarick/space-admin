import { HeaderClickInfo } from 'naive-ui/es/collapse/src/interface';
import { globalConfig } from '@/shared/config/global-config';
import { InternalNotificationCollapseListEmits, InternalNotificationCollapseListProps } from './internal-notification-collapse-list.types';

export default function useInternalNotificationCollapseList(
  props: InternalNotificationCollapseListProps,
  emit: InternalNotificationCollapseListEmits
) {
  const observerRef = ref<HTMLElement | null>(null);

  const intersectionObserver = new IntersectionObserver(
    handleIntersectionObserve,
    {
      root: null,
      rootMargin: '0px',
      threshold: 1
    }
  );

  const handleRead = (
    { name }: HeaderClickInfo<number>
  ) => {
    const notification = props.list?.find(
      ({ id }) => id === name
    );

    notification?.isRead || emit('read', name);
  };

  const openFile = (id: number) => window.open(
    globalConfig.apiBaseUrl +
      globalConfig.apiInternalNotificationUrl +
      `/file/${id}`
  );

  const startIntersectionObserver = () => {
    intersectionObserver.observe(observerRef.value!);
  };

  const stopIntersectionObserver = () =>
    intersectionObserver.disconnect();

  function handleIntersectionObserve(
    [ entry ]: IntersectionObserverEntry[]
  ) {
    entry?.isIntersecting && emit('fetch');
  }

  onMounted(startIntersectionObserver);
  onBeforeUnmount(stopIntersectionObserver);

  return {
    observerRef,
    handleRead,
    openFile
  };
}
