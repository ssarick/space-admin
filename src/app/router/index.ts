import {
  createRouter,
  createWebHistory,
  RouterScrollBehavior
} from 'vue-router';
import routes from './routes';

interface IScrollPosition {
  top: number
  left: number
}

const routerHistory = createWebHistory();

const scrollBehavior = (
  _,
  __,
  savedPosition: IScrollPosition
) => savedPosition || {
  top: 0,
  left: 0
};

const router = createRouter({
  history: routerHistory,
  routes,
  scrollBehavior: scrollBehavior as RouterScrollBehavior
});

export default router;
