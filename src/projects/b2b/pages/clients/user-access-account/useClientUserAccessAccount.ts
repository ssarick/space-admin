import { computed, h, onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';
import { DataTableColumns, NCheckbox, useMessage } from 'naive-ui';
import { globalConfig } from '@/shared/config/global-config';
import useTableRef from '@/shared/UI/base-data-table/useTableRef';
import { useAuthStore } from '@/app/store/auth/useAuthStore';
import { useUserCreationStore } from '@/projects/b2b/app/store/useUserCreationStore';
import { ApiAccount, ApiUser } from '@/projects/b2b/shared/api';
import { IAccount } from '@/projects/b2b/shared/types/account.types';

export default function useClientUserAccessAccount() {
  const { t } = useI18n();
  const route = useRoute();
  const toast = useMessage();
  const tableRef = useTableRef();
  const { user } = useAuthStore();
  const businessCode = route.params.businessCode?.toString();
  const userId = +(route.params.userId || 0);
  const userFullName = ref<string | null>(null);
  const dataTable = ref<IAccount[]>([]);
  const rowKey = (row: IAccount) => row.accountNumber;
  const userCreationStore = useUserCreationStore();
  const router = useRouter();

  const columns = computed<DataTableColumns<IAccount>>(() => [
    {
      title: t('Account-number'),
      key: 'accountNumber'
    },
    {
      title: t('Viewing'),
      key: 'viewing',
      fixed: 'right',
      width: '200px',
      render(row: IAccount) {
        return [
          h(NCheckbox, {
            size: 'large',
            checked: !!row.accountRelations?.find((fAccount) => {
              return +fAccount.userId === +userId;
            })?.stateId,
            onUpdateChecked(v: boolean) {
              tryToToggleAccountAccess(row.accountNumber, Number(v));
            }
          })
        ];
      }
    },
    {
      title: t('Full-access'),
      key: 'full-access',
      fixed: 'right',
      width: '200px',
      render(row: IAccount) {
        return [
          h(NCheckbox, {
            size: 'large',
            checked: !!row.accountRelations?.find((fAccount) => {
              return +fAccount.userId === +userId;
            })?.canPay,
            onUpdateChecked(v) {
              tryToToggleAccountAccess(row.accountNumber, Number(v), Number(v));
            }
          })
        ];
      }
    }
  ]);

  const isLoading = ref(false);

  async function getUserById() {
    const { item } = await ApiUser.getClientUserById({
      path: { branch: user?.branch!, businessCode, userId }
    });
    userFullName.value = item.fio;
  }

  async function fetchAccounts() {
    isLoading.value = true;

    const pagination = tableRef.value?.pagination;

    const pageSize = pagination?.pageSize
      || globalConfig.pageSize;

    const {
      totalPages,
      items
    } = await ApiAccount.fetchAccounts({
      query: {
        pageNumber: pagination?.page || 1,
        pageSize
      },
      path: {
        branch: user?.branch!,
        businessCode
      }
    });

    isLoading.value = false;
    dataTable.value = items;

    if (tableRef.value?.pagination) {
      tableRef.value.pagination.pageCount = totalPages;
    }
  }

  async function tryToToggleAccountAccess(
    accountNumber,
    stateId: number,
    canPay?: number
  ) {
    const { error } = await ApiAccount.toggleAccess({
      path: {
        branch: user?.branch!,
        businessCode,
        userId,
        accountNumber: accountNumber
      },
      body: {
        stateId,
        canPay: canPay || 0
      }
    });
    if (error) return;

    toast.success(t('Data-saved') + '!');
    fetchAccounts();
  }

  function onNext() {
    userCreationStore.startUserCreation();

    router.push({
      name: 'client-user-add-finishing',
      params: { businessCode, userId }
    });
  }

  onMounted(() => {
    getUserById();
    fetchAccounts();
  });

  return {
    userFullName,
    columns,
    isLoading,
    rowKey,
    dataTable,
    fetchAccounts,
    businessCode,
    userId,
    onNext,
    tableRef
  };
}
