import { ref } from 'vue';

export default function useDataTableScrolling() {
  const isTableScrolling = ref(false);
  const tableScrollThreshold = 5;

  const handleScroll = (
    event: Event
  ) => {
    const target = event.target as HTMLElement;

    isTableScrolling.value =
      target.scrollTop >= tableScrollThreshold;
  };

  return {
    handleScroll,
    isTableScrolling
  };
}
