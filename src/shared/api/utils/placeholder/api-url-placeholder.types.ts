import { ApiUrlPlaceholder } from '@/shared/types/api.types';

export type ApiUrlPlaceholderValueGetter =
  () => string | null | undefined

export type ApiUrlPlaceholderValueGetters = Record<
  ApiUrlPlaceholder, ApiUrlPlaceholderValueGetter
>
