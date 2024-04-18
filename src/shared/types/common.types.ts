import { VNode } from 'vue';
import { RouteLocationRaw } from 'vue-router';
import { UploadFileInfo } from 'naive-ui';

export enum DomainShortcuts {
  KAPITALBANK = 'kapitalbank.uz'
}

export enum CustomBoolean {
  YES,
  NO
}

export type ArrayCheckerMethods = 'some'
  | 'every'

export interface IMfo {
  code?: string | null
  name?: string | null
}

export type BaseLink = RouteLocationRaw & {
  text: string
}

export interface IDictionaryCommon<T = string | number> {
  id?: T | null
  name?: string | null
}

export interface IListItem<
  T extends string | number = string | number
> extends IDictionaryCommon<T> {
  className?: ElClassName | null
  subText?: string
    | number
    | (() => VNode)
    | null
  links?: BaseLink[] | null
}

export interface UploadFileEvent {
  file: UploadFileInfo
  fileList: UploadFileInfo[];
}

export type ElClassName = string
  | Record<string, boolean>
  | ElClassName[]

export type CommonSize = 'medium'
  | 'large'
