import { ref } from 'vue';
import { defineStore } from 'pinia';
import { IBreadcrumbsRoute } from '@/shared/types/breadcrumbs.types';

const useBreadcrumbsStore = defineStore(
  'breadcrumbs',
  () => {
    const breadcrumbs = ref<IBreadcrumbsRoute[]>([]);

    const setBreadcrumbs = (
      value: IBreadcrumbsRoute[]
    ) => {
      breadcrumbs.value = value;
    };

    return {
      breadcrumbs,
      setBreadcrumbs
    };
  }
);

export default useBreadcrumbsStore;
