import { RouteRecordRaw } from 'vue-router';

export default [
  {
    path: 'profile',
    name: 'profile',
    component: () => import('@/projects/superadmin/pages/profile/ProfilePage.vue')
  }
] as RouteRecordRaw[];
