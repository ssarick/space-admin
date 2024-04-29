import { RouteRecordRaw } from 'vue-router';
import autopayRoutes from '@/projects/autopay/app/router';
import b2bRoutes from '@/projects/b2b/app/router';
import b2cRoutes from '@/projects/b2c/app/router';
import bindedFaceRoutes from '@/projects/binded-face/app/router';
import cashierRoutes from '@/projects/cashier/app/router';
import controlPanelRoutes from '@/projects/control-panel/app/router';
import fileManagersRoutes from '@/projects/file-manager/app/router';
import internalNotificationRoutes from '@/projects/internal-notification/app/router';
import inventoryRoutes from '@/projects/inventory/app/router';
import iSeeURoutes from '@/projects/iseeu/app/router';
import logsAuditRoutes from '@/projects/logs-audit/app/router';
import notificationServiceRoutes from '@/projects/notification-service/app/router';
import subsidyRoutes from '@/projects/subsidy/app/router';

export default [
  {
    path: '/',
    component: () => import('@/app/layouts/root-layout/RootLayout.vue'),
    children: [
      {
        path: '/',
        component: () => import('@/app/guards/auth/AuthGuard.vue'),
        children: [
          {
            path: '/',
            name: 'main',
            component: () => import('@/app/layouts/DefaultLayout.vue'),
            meta: {
              breadcrumbsConfig: {
                exclude: true
              }
            },
            children: [
              ...controlPanelRoutes,
              ...autopayRoutes,
              ...b2cRoutes,
              ...b2bRoutes,
              ...fileManagersRoutes,
              ...iSeeURoutes,
              ...subsidyRoutes,
              ...inventoryRoutes,
              ...notificationServiceRoutes,
              ...cashierRoutes,
              ...bindedFaceRoutes,
              ...logsAuditRoutes,
              ...internalNotificationRoutes,
              {
                path: '/:catchAll(.*)*',
                name: 'not-found',
                component: () => import('@/app/layouts/DefaultLayout.vue'),
                meta: {
                  breadcrumbsConfig: {
                    exclude: true
                  }
                }
              }
            ]
          }
        ]
      }
    ]
  }
] as RouteRecordRaw[];
