import { h, VNode } from 'vue';
import { RouterLink } from 'vue-router';
import { MenuOption, NSkeleton, NSpace } from 'naive-ui';
import BaseIcon from '@/shared/UI/base-icon';
import NumberUtils from '@/shared/utils/number';
import { createIconRenderer } from '@/shared/utils/render-icon';
import { IAppMenuOption } from '../app-layout-sider.types';

const renderSiderIcon = createIconRenderer({
  size: 24
});

const renderLabelWithNewBadge = (
  label?: string
): VNode => h(
  NSpace,
  {
    align: 'center',
    justify: 'space-between',
    wrapItem: false
  },
  [
    label,
    h(BaseIcon, {
      icon: 'new-badge',
      size: 24
    })
  ]
);

const createMenuItem = ({
  route,
  key,
  icon,
  loading,
  label,
  isNew,
  children
}: IAppMenuOption): MenuOption => {
  const resultRoute = route
    ? route
    : (key && !children && { name: key });

  return loading
    ? {
      label: () => h(NSkeleton, {
        size: 'medium',
        sharp: false
      }),
      key: NumberUtils.uniqueString
    }
    : {
      label: () =>
        h(
          resultRoute ? RouterLink as never : 'p',
          {
            to: resultRoute,
            class: 'text-link'
          },
          {
            default: () => isNew
              ? renderLabelWithNewBadge(label)
              : label
          }
        ),
      key: key || label,
      icon: icon && renderSiderIcon(icon)
    };
};

export const createMenuList = (
  options: IAppMenuOption[]
): MenuOption[] => {
  const menu: MenuOption[] = [];

  options.forEach(item => {
    if (item.visibility === false) return;

    const resultItem = createMenuItem(item);

    if (item.children)
      resultItem.children = createMenuList(item.children);

    menu.push(resultItem);
  });

  return menu;
};
