import { AuthPanel } from '@/shared/types/auth.types';

export const mainRouteNames: Record<AuthPanel, string> = {
  [AuthPanel.CONTROL_PANEL]: 'terminals-list',
  [AuthPanel.AUTOPAY]: 'dashboard',
  [AuthPanel.B2B]: 'users',
  [AuthPanel.B2C]: '',
  [AuthPanel.FILE_MANAGER]: 'file-manager',
  [AuthPanel.ISEEU]: 'entity',
  [AuthPanel.SUBSIDY]: 'subsidy-applications',
  [AuthPanel.INVENTORY]: 'inventory-users',
  [AuthPanel.CASHIER]: 'cashier-operations',
  [AuthPanel.NOTIFICATION]: 'all-messages',
  [AuthPanel.BINDED_FACE]: 'binded-face-list',
  [AuthPanel.LOGS_AUDIT]: 'logs-audit-list',
  [AuthPanel.INTERNAL_NOTIFICATION]: 'notification-create'
};
