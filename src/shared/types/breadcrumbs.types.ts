import { RouteLocationMatched } from 'vue-router';

export interface IBreadcrumbsConfig {
  exclude?: boolean
  locale?: string
  text?: string
}

export interface IBreadcrumbsRoute extends Partial<RouteLocationMatched> {}
