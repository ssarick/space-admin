import { RouteRecordRaw } from 'vue-router';
import { PermissionAction, PermissionTarget } from '@/projects/b2b/shared/types/permission.types';

export default [
  {
    path: 'clients',
    name: 'clients-wrapper',
    component: () => import('@/app/layouts/RouterViewLayout.vue'),
    meta: {
      breadcrumbsConfig: {
        locale: 'Clients'
      },
      permission: {
        [PermissionTarget.CLIENT]: [
          PermissionAction.READ
        ]
      }
    },
    redirect: {
      name: 'clients'
    },
    children: [
      {
        path: '',
        name: 'clients',
        component: () => import('@/projects/b2b/pages/clients/main/ClientsPage.vue'),
        meta: {
          breadcrumbsConfig: {
            exclude: true
          },
          permission: {
            [PermissionTarget.CLIENT]: [
              PermissionAction.READ
            ]
          }
        }
      },
      {
        path: 'create',
        name: 'client-create',
        component: () => import('@/projects/b2b/pages/clients/ClientCreatePage.vue'),
        meta: {
          breadcrumbsConfig: {
            locale: 'Creating-a-new-client'
          },
          permission: {
            [PermissionTarget.CLIENT]: [
              PermissionAction.CREATE
            ]
          }
        }
      },
      {
        path: ':businessCode/user/create',
        name: 'client-user-create',
        component: () =>
          import('@/projects/b2b/pages/clients/user-create/ClientUserCreatePage.vue'),
        meta: {
          breadcrumbsConfig: {
            locale: 'Adding-a-user'
          },
          permission: {
            [PermissionTarget.CLIENT]: [
              PermissionAction.CREATE
            ]
          },
          mfoChangeable: false
        }
      },
      {
        path: ':businessCode',
        name: 'client-detail',
        component: () =>
          import('@/projects/b2b/pages/clients/client-detail/ClientDetailPage.vue'),
        meta: {
          breadcrumbsConfig: {
            locale: 'Client-data'
          },
          permission: {
            [PermissionTarget.CLIENT]: [
              PermissionAction.READ
            ]
          }
        }
      },
      {
        path: ':businessCode/users',
        name: 'client-users',
        component: () => import('@/projects/b2b/pages/clients/users/ClientUsersPage.vue'),
        meta: {
          breadcrumbsConfig: {
            locale: 'Users'
          },
          permission: {
            [PermissionTarget.CLIENT]: [
              PermissionAction.READ
            ]
          }
        }
      },
      {
        path: ':businessCode/users/add',
        name: 'client-users-add',
        component: () => import('@/projects/b2b/pages/clients/users-adding/ClientUsersAddingPage.vue'),
        meta: {
          breadcrumbsConfig: {
            locale: 'Adding-a-user'
          },
          permission: {
            [PermissionTarget.CLIENT]: [
              PermissionAction.CREATE
            ]
          },
          mfoChangeable: false
        }
      },
      {
        path: ':businessCode/users/:userId/access-permissions',
        name: 'client-user-access-permissions',
        component: () =>
          import('@/projects/b2b/pages/clients/ClientUserAccessPermissionsListPage.vue'),
        meta: {
          breadcrumbsConfig: {
            locale: 'Access-rights'
          },
          permission: {
            [PermissionTarget.CLIENT]: [
              PermissionAction.CREATE
            ]
          },
          mfoChangeable: false
        }
      },
      {
        path: ':businessCode/users/:userId/access-accounts',
        name: 'client-user-access-accounts',
        component: () =>
          import(
            '@/projects/b2b/pages/clients/user-access-account/ClientUserAccessAccountsPage.vue'
          ),
        meta: {
          breadcrumbsConfig: {
            locale: 'Access-rights-to-accounts'
          },
          permission: {
            [PermissionTarget.CLIENT]: [
              PermissionAction.CREATE
            ]
          },
          mfoChangeable: false
        }
      },
      {
        path: ':businessCode/users/:userId/add-finishing',
        name: 'client-user-add-finishing',
        component: () =>
          import(
            '@/projects/b2b/pages/clients/user-add-finishing/ClientUserAddFinishingPage.vue'
          ),
        meta: {
          permission: {
            [PermissionTarget.CLIENT]: [
              PermissionAction.CREATE
            ]
          },
          mfoChangeable: false
        }
      },
      {
        path: ':businessCode/users/:userId/certificate/creation',
        name: 'client-user-certificate-creation',
        component: () =>
          import(
            '@/projects/b2b/pages/clients/certificate-creation/UserCertificateCreationPage.vue'
          ),
        meta: {
          breadcrumbsConfig: {
            locale: 'Adding-new-certificate'
          },
          permission: {
            [PermissionTarget.CLIENT]: [
              PermissionAction.CREATE
            ]
          },
          mfoChangeable: false
        }
      },
      {
        path: ':businessCode/users/:userId/certificate/attach',
        name: 'client-user-certificate-attach',
        component: () =>
          import(
            '@/projects/b2b/pages/clients/certificate-add-existing/UserCertificateAddExistingPage.vue'
          ),
        meta: {
          breadcrumbsConfig: {
            locale: 'Add-an-existing-certificate'
          },
          permission: {
            [PermissionTarget.CLIENT]: [
              PermissionAction.CREATE
            ]
          },
          mfoChangeable: false
        }
      }
    ]
  }
] as RouteRecordRaw[];
