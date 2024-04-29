import { ComputedRef } from 'vue';
import { RouteLocation, RouteLocationNamedRaw } from 'vue-router';
import { MenuOption } from 'naive-ui';
import { AuthPanel } from '@/shared/types/auth.types';
import { IconName } from '@/shared/types/icon.types';

export interface IAppMenuOption {
  route?: RouteLocationNamedRaw
  label?: string
  key?: string
  icon?: IconName
  visibility?: boolean
  loading?: boolean
  isNew?: boolean
  children?: IAppMenuOption[]
  compareWithCurrentRoute?: (
    menuItem: IAppMenuOption,
    route: RouteLocation
  ) => boolean
}

export interface IAppMenus {
  customMenu: IAppMenuOption[]
  menu: MenuOption[]
}

export type AuthPanelMenusMap = Partial<Record<
  AuthPanel, ComputedRef<IAppMenuOption[]>
>>;
