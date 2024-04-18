import { computed, ComputedRef } from 'vue';
import { useI18n } from 'vue-i18n';
import { IAppMenuOption } from '../../app-layout-sider.types';

export default function useAutopayMenu():
  ComputedRef<IAppMenuOption[]> {
  const { t } = useI18n();

  return computed<IAppMenuOption[]>(() => [
    {
      label: t('dashboard'),
      icon: 'dashboard',
      key: 'dashboard-wrapper',
      children: [
        {
          label: t('by-auto-debit'),
          key: 'dashboard'
        },
        {
          label: t('on-the-site'),
          key: 'dashboard-manual'
        }
      ]
    },
    {
      label: t('Transactions'),
      icon: 'transactions',
      key: 'transactions',
      children: [
        {
          label: t('by-auto-debit'),
          key: 'transaction-list'
        },
        {
          label: t('on-the-site'),
          key: 'transaction-manual'
        }
      ]
    },
    {
      label: t('card-untrusted-list-wrapper'),
      key: 'card-untrusted-list-wrapper',
      icon: 'untrusted-cards',
      children: [
        {
          label: t('card-untrusted-list'),
          key: 'card-untrusted-list'
        },
        {
          label: t('card-untrusted-list-humo'),
          key: 'card-untrusted-list-humo'
        }
      ]
    },
    {
      label: t('Contracts'),
      key: 'contract-list',
      icon: 'contracts'
    },
    {
      label: t('Administration'),
      key: 'administration',
      icon: 'administration'
    }
  ]);
}
