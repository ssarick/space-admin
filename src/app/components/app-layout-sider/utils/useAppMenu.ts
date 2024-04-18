import { computed, toRefs } from 'vue';
import { useAuthPanelStore } from '@/app/store/auth/useAuthPanelStore';
import { IAppMenus } from '../app-layout-sider.types';
import { createMenuList } from './menu-creator';
import useAppMenusMap from './menus/useAppMenusMap';

export default function useAppMenu() {
  const { selectedPanel } = toRefs(useAuthPanelStore());
  const menusMap = useAppMenusMap();

  return computed<IAppMenus>(
    () => {
      const customMenu = menusMap[selectedPanel.value!]
        ?.value;

      return {
        menu: customMenu
          ? createMenuList(customMenu)
          : [],
        customMenu: customMenu || []
      };
    }
  );
}
