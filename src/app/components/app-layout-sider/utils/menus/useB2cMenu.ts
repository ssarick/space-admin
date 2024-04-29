import { computed, ComputedRef } from 'vue';
import { IAppMenuOption } from '../../app-layout-sider.types';

export default function useB2cMenu():
ComputedRef<IAppMenuOption[]> {
  return computed<IAppMenuOption[]>(() => []);
}
