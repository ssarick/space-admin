import { AuthPanel } from '@/shared/types/auth.types';
import { AuthPanelMenusMap } from '../../app-layout-sider.types';
import useAuditLogsMenu from './useAuditLogsMenu';
import useAutopayMenu from './useAutopayMenu';
import useB2bMenu from './useB2bMenu';
import useB2cMenu from './useB2cMenu';
import useBindedFaceMenu from './useBindedFaceMenu';
import useCashierMenu from './useCashierMenu';
import useControlPanelMenu from './useControlPanelMenu';
import useFileManagerMenu from './useFileManagerMenu';
import useInternalNotificationMenu from './useInternalNotificationMenu';
import useInventoryMenu from './useInventoryMenu';
import useISeeUMenu from './useISeeUMenu';
import useNotificationServiceMenu from './useNotificationServiceMenu';
import useSubsidyMenu from './useSubsidyMenu';

export default function useAppMenusMap(): AuthPanelMenusMap {
  return {
    [AuthPanel.CONTROL_PANEL]: useControlPanelMenu(),
    [AuthPanel.AUTOPAY]: useControlPanelMenu(),
    [AuthPanel.AUTOPAY]: useAutopayMenu(),
    [AuthPanel.B2B]: useB2bMenu(),
    [AuthPanel.B2C]: useB2cMenu(),
    [AuthPanel.FILE_MANAGER]: useFileManagerMenu(),
    [AuthPanel.ISEEU]: useISeeUMenu(),
    [AuthPanel.SUBSIDY]: useSubsidyMenu(),
    [AuthPanel.INVENTORY]: useInventoryMenu(),
    [AuthPanel.NOTIFICATION]: useNotificationServiceMenu(),
    [AuthPanel.CASHIER]: useCashierMenu(),
    [AuthPanel.BINDED_FACE]: useBindedFaceMenu(),
    [AuthPanel.LOGS_AUDIT]: useAuditLogsMenu(),
    [AuthPanel.INTERNAL_NOTIFICATION]: useInternalNotificationMenu()
  };
}
