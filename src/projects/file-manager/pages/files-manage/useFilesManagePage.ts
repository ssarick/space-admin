import { computed, onBeforeUnmount, watch } from 'vue';
import { useRoute } from 'vue-router';
import useBreadcrumbsStore from '@/app/store/useBreadcrumbsStore';

export default function useFilesManagePage() {
  const {
    setBreadcrumbs
  } = useBreadcrumbsStore();

  const route = useRoute();

  const bucketName = computed<string>(
    () => String(route.params.bucket || '')
  );

  const updateBreadcrumbs = () => {
    setBreadcrumbs(
      bucketName.value
        ? [ {
          name: 'file-manager',
          meta: {
            breadcrumbsConfig: {
              text: bucketName.value
            }
          }
        } ]
        : []
    );
  };

  const resetBreadcrumbs = () => {
    setBreadcrumbs([]);
  };

  watch(
    bucketName,
    updateBreadcrumbs,
    { immediate: true }
  );

  onBeforeUnmount(resetBreadcrumbs);
}
