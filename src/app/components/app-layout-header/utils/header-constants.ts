import { AuthPanel } from '@/shared/types/auth.types';
import { AppLayoutHeaderTelegramLinks } from '../app-layout-header.types';

export const headerTelegramLinks:
AppLayoutHeaderTelegramLinks = {
  [AuthPanel.AUTOPAY]: 'https://t.me/c/2090592000/7',
  [AuthPanel.CASHIER]: 'https://t.me/c/2090592000/3',
  [AuthPanel.NOTIFICATION]: 'https://t.me/c/2090592000/9',
  [AuthPanel.BINDED_FACE]: 'https://t.me/c/2090592000/10',
  [AuthPanel.INVENTORY]: 'https://t.me/c/2090592000/2',
  [AuthPanel.SUBSIDY]: 'https://t.me/c/2090592000/6',
  [AuthPanel.FILE_MANAGER]: 'https://t.me/c/2090592000/5',
  default: 'https://t.me/+rtQqQZxyURdhNDMy'
};
