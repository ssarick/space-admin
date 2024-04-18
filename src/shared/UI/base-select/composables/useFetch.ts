import { BaseSelectProps } from '../base-select.types';

export default function useFetch(
  props: BaseSelectProps,
  searchString: Ref<string | null>
) {
  const remote = ref(!!props.request);
  const optionsData = ref(props.options || []);
  const loading = ref(false);
  const pageSize = 20;
  const isNeedFetch = ref(true);
  const heightOneSelectItem = 50;
  let pageNumber = 1;
  let pages = 0;

  const fetchData = async () => {
    if (!remote.value) return;

    const { items, totalPages } = await props.request!({
      ...props.params,
      [props.searchFieldName || '']: searchString.value,
      pageSize,
      pageNumber
    });
    pages = totalPages;

    return items;
  };

  const clear = () => {
    if (remote.value) {
      optionsData.value = [];
      pageNumber = 1;
      isNeedFetch.value = true;
    }
  };

  const handleScroll = async (e: Event) => {
    if (loading.value) return;

    const currentTarget = e.currentTarget as HTMLElement;

    const scrollOffsetHeight =
      currentTarget.scrollTop +
      currentTarget.offsetHeight +
      heightOneSelectItem;

    const isCurPageLessThanTotalPages = pageNumber < pages;

    const shouldFetch =
      scrollOffsetHeight >= currentTarget.scrollHeight &&
      isCurPageLessThanTotalPages;

    if (shouldFetch) {
      pageNumber++;
      loading.value = true;
      const res = await fetchData();
      loading.value = false;
      optionsData.value.push(...res);
    }
  };

  async function loadData(isInitialRequest?: boolean) {
    if (remote.value && isNeedFetch.value) {
      loading.value = true;
      optionsData.value = await fetchData();
      loading.value = false;

      if (isInitialRequest) {
        searchString.value = null;
      } else {
        isNeedFetch.value = false;
      }
    }
  }

  return {
    loading,
    remote,
    optionsData,
    handleScroll,
    loadData,
    clear
  };
}
