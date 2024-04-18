import 'vue-router';
import { Permission } from './b2b/permission.types';
import { IBreadcrumbsConfig } from './breadcrumbs.types';

declare module 'vue-router' {
  export interface RouteMeta {
    breadcrumbsConfig?: IBreadcrumbsConfig
    permission?: Partial<Permission>
    mfoChangeable?: boolean
    keys?: string[]
  }
}
