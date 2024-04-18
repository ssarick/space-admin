import { computed, toRefs } from 'vue';
import { useI18n } from 'vue-i18n';
import { RouteLocationMatched, useRoute, useRouter } from 'vue-router';
import { useMainRoute } from '@/shared/composables/main-route/useMainRoute';
import useBreadcrumbsStore from '@/app/store/useBreadcrumbsStore';

export default function useAppLayoutBreadcrumbs() {
  const route = useRoute();
  const router = useRouter();
  const { t } = useI18n();
  const { mainRoute } = useMainRoute();
  const { breadcrumbs } = toRefs(useBreadcrumbsStore());

  const breadcrumbRoutes = computed<
    Partial<RouteLocationMatched>[]
  >(() => [
    {
      name: typeof mainRoute.value === 'string'
        ? 'main'
        : mainRoute.value.name,
      meta: {
        breadcrumbsConfig: {
          locale: 'main'
        }
      }
    },
    ...route
      .matched
      .filter((innerRoute) => (innerRoute.path !== '/'
        || innerRoute.name === 'main')
        && innerRoute.meta.breadcrumbsConfig?.exclude !== true),
    ...breadcrumbs.value
  ]);

  const openRoute = (
    route: Partial<RouteLocationMatched>
  ) => router.push(route);

  const getRouteText = (
    route: Partial<RouteLocationMatched>
  ): string => route.meta?.breadcrumbsConfig?.text
    || t(
      route.meta?.breadcrumbsConfig?.locale
        || route.name as string
    );

  return {
    openRoute,
    breadcrumbRoutes,
    getRouteText
  };
}
