import { RouteRecordRaw } from 'vue-router';

export default [
  {
    path: 'list',
    name: 'logs-audit-list',
    component: () => import(
      '@/projects/logs-audit/pages/list/LogsAuditPage.vue'
    ),
    meta: {
      breadcrumbsConfig: {
        locale: 'LOGS_AUDIT'
      }
    }
  }
] as RouteRecordRaw[];
