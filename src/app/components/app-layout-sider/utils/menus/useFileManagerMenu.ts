import { computed, ComputedRef } from 'vue';
import { useFileManagerBucketsStore } from '@/projects/file-manager/app/store/useFileManagerBucketsStore';
import { IAppMenuOption } from '../../app-layout-sider.types';

export default function useFileManagerMenu():
ComputedRef<IAppMenuOption[]> {
  const skeletonsCount = 5;
  const bucketsStore = useFileManagerBucketsStore();

  return computed<IAppMenuOption[]>(
    () => bucketsStore.loading
      ? new Array(skeletonsCount)
        .fill(undefined)
        .map(() => ({
          loading: true
        }))
      : bucketsStore
        .buckets
        .map(item => ({
          key: `file-manager-${item.name}`,
          icon: 'folder',
          label: item.name!,
          route: {
            name: 'file-manager',
            params: {
              bucket: item.name || ''
            }
          },
          compareWithCurrentRoute: (
            menuItem: IAppMenuOption,
            route
          ) => route.params.bucket === menuItem
            .route
            ?.params
            ?.bucket
        }))
  );
}
