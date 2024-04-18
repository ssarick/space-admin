import { RouteRecordRaw } from 'vue-router';

export default [
  {
    path: 'users',
    name: 'inventory-users-wrapper',
    component: () => import('@/app/layouts/RouterViewLayout.vue'),
    meta: {
      breadcrumbsConfig: {
        locale: 'Users'
      }
    },
    redirect: {
      name: 'inventory-users'
    },
    children: [
      {
        path: '',
        name: 'inventory-users',
        component: () => import(
          '@/projects/inventory/pages/users/list/UsersListPage.vue'
        ),
        meta: {
          breadcrumbsConfig: {
            exclude: true
          }
        }
      },
      {
        path: 'create',
        name: 'inventory-users-create',
        component: () => import(
          '@/projects/inventory/pages/users/create/UserCreatePage.vue'
        ),
        meta: {
          breadcrumbsConfig: {
            locale: 'Creation'
          }
        }
      },
      {
        path: ':userId',
        name: 'inventory-users-info',
        component: () => import(
          '@/projects/inventory/pages/users/info/UserInfoPage.vue'
        ),
        meta: {
          breadcrumbsConfig: {
            locale: 'Info'
          }
        }
      }
    ]
  }
] as RouteRecordRaw[];
