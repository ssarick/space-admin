import {
  AuthPanel,
  AuthPanelRoles,
  AuthRole
} from '@/shared/types/auth.types';

export const authPanelRoles: AuthPanelRoles = {
  [AuthPanel.CONTROL_PANEL]: [
    AuthRole.PARTNER
  ],
  [AuthPanel.AUTOPAY]: [
    AuthRole.APP_AUTOPAYKB24_ADMIN,
    AuthRole.APP_AUTOPAYKB24_USERS
  ],
  [AuthPanel.CASHIER]: [
    AuthRole.APP_CASHBOX_USER
  ],
  [AuthPanel.FILE_MANAGER]: [
    AuthRole.APP_FILE_STORAGE
  ],
  [AuthPanel.INTERNAL_NOTIFICATION]: [
    AuthRole.APP_INTERNAL_NOTIFICATION_ADMIN
  ],
  [AuthPanel.INVENTORY]: [
    AuthRole.APP_ZEBRA_ADMIN
  ],
  [AuthPanel.LOGS_AUDIT]: [
    AuthRole.APP_LOGS_AUDIT_USER
  ],
  [AuthPanel.NOTIFICATION]: [
    AuthRole.APP_NOTIFICATION_ORCHESTRATOR_USER
  ],
  [AuthPanel.SUBSIDY]: [
    AuthRole.APP_MORTGAGE_SUBSIDY_EXT_USER
  ]
};
