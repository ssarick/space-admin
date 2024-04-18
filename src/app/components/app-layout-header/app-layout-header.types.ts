import { AuthPanel } from '@/shared/types/auth.types';

export interface IAppLayoutHeaderProps {
  disableAuthFeatures?: boolean
}

export type AppLayoutHeaderTelegramLinks = Partial<
  Record<AuthPanel, string>
> & {
  default: string
}
