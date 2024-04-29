import { h } from 'vue';
import { IconProps } from 'naive-ui';
import { IconName } from '../types/icon.types';
import BaseIcon from '../UI/base-icon';

export default function renderIcon(
  icon: IconName,
  iconWrapperProps: IconProps = {
  }
) {
  return () => h(BaseIcon, {
    icon,
    ...iconWrapperProps
  });
}

export function createIconRenderer(
  iconWrapperProps: IconProps = {
  }
) {
  return (icon: IconName) =>
    renderIcon(icon, iconWrapperProps);
}
