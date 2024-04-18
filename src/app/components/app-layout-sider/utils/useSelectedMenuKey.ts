import { computed, ComputedRef } from 'vue';
import { useRoute } from 'vue-router';
import { MenuOption } from 'naive-ui';
import { IAppMenuOption, IAppMenus } from '../app-layout-sider.types';

export default function useSelectedMenuKey(
  menuOptions: ComputedRef<IAppMenus>
) {
  const route = useRoute();

  const findCustomMenuItem = (
    menuItem: MenuOption,
    menu: IAppMenuOption[] = menuOptions.value.customMenu
  ): IAppMenuOption | undefined => {
    for (const item of menu) {
      if (item.key === menuItem.key) return item;

      if (item.children) {
        const children = findCustomMenuItem(
          menuItem, item.children
        );

        if (children) return children;
      }
    }
  };

  const compareRouteWithMenu = (
    menuItem: MenuOption
  ): boolean => {
    if (route.name === menuItem.key) return true;

    const customMenuItem = findCustomMenuItem(menuItem);

    return customMenuItem
      ? !!customMenuItem.compareWithCurrentRoute?.(
        customMenuItem, route
      )
      : false;
  };

  const selectedKey = computed<MenuOption['key']>(() => {
    for (const menuOption of menuOptions.value.menu) {
      let matchedCount = route.matched.length - 1;

      while (matchedCount--) {
        const menuChildren = menuOption
          .children
          ?.find(menuChildren => compareRouteWithMenu(
            menuChildren
          ));

        if (menuChildren)
          return menuChildren.key;
        else if (compareRouteWithMenu(menuOption)
          || route.matched[matchedCount]?.name === menuOption.key)
          return menuOption.key;
      }
    }

    return 'main';
  });

  return {
    selectedKey
  };
}
