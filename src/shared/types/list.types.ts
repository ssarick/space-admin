import { RouteLocationRaw } from 'vue-router';
import { Primitive } from '.';

export interface ISwitchListItemValue<T = string> {
  key: T
  value: boolean
}

export interface ISwitchListItemOptions {
  label?: string
  loading?: boolean
}

export interface ILinkListItem<T = unknown> {
  value?: T
  img?: string[]
  to?: RouteLocationRaw
  title?: string
}

export type SwitchListItem = ISwitchListItemOptions & {
  [P in string]: Primitive | SwitchListItem
};
