import {
  computed,
  ref,
  watch
} from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';
import { useMessage } from 'naive-ui';
import { globalConfig } from '@/shared/config/global-config';
import useTableRef from '@/shared/UI/base-data-table/useTableRef';
import { useAuthStore } from '@/app/store/auth/useAuthStore';
import { useClientUserOrganizationSync } from '@/projects/b2b/entities/organization-list';
import { ApiAccount } from '@/projects/b2b/shared/api';
import {
  IAccount,
  IAccountAccess,
  IAccountRelation
} from '@/projects/b2b/shared/types/account.types';
import { IUserOrganization } from '@/projects/b2b/shared/types/user.types';
import { IUserAccessAccountsProps } from './user-access-accounts.types';
import useUserAccessAccountsColumns from './useUserAccessAccountsColumns';

export default function useUserAccessAccounts(
  props: IUserAccessAccountsProps
) {
  const selectedOrganization = ref<
    IUserOrganization | null
  >(null);

  const isLoading = ref(false);
  const { t } = useI18n();
  const route = useRoute();
  const toast = useMessage();
  const tableRef = useTableRef();
  const { user } = useAuthStore();
  const userId = +(route.params.userId || 0);
  const dataTable = ref<IAccount[]>([]);
  const router = useRouter();
  const rowKey = (row: IAccount) => row.accountNumber;

  const businessCode = computed(
    () => selectedOrganization.value?.clientCode || ''
  );

  const { columns } = useUserAccessAccountsColumns(
    dataTable,
    userId,
    tryToToggleAccountAccess,
    toggleAllAccountAccesses,
    props.isEdit
  );

  function resetPagination() {
    if (!tableRef.value?.pagination) return;

    tableRef.value.pagination.page = 1;
    tableRef.value.pagination.pageSize = globalConfig.pageSize;
  }

  async function fetchAccounts() {
    const pagination = tableRef.value?.pagination;

    const pageSize = pagination?.pageSize
      || globalConfig.pageSize;

    const reqData = {
      query: {
        pageNumber: pagination?.page || 1,
        pageSize
      },
      path: {
        branch: user?.branch!,
        businessCode: businessCode.value
      }
    };

    isLoading.value = true;

    const { items, totalPages } = await ApiAccount
      .fetchAccounts(reqData);

    isLoading.value = false;
    dataTable.value = items;

    if (tableRef.value?.pagination) {
      tableRef.value.pagination.pageCount = totalPages;
    }
  }

  function setAccountRelationValueByKey<
    T extends keyof IAccountRelation
  >(
    accountNumber: string,
    key: T,
    value: IAccountRelation[T]
  ) {
    const accountRelations = dataTable
      .value
      .find(row => row.accountNumber === accountNumber)
      ?.accountRelations;

    if (!accountRelations) return;

    const relation = accountRelations
      .find(relation => relation.userId === userId);

    if (relation) return relation[key] = value;

    accountRelations.push({
      userId,
      canPay: 0,
      stateId: 0,
      dateFill: '',
      [key]: value
    });
  }

  async function tryToToggleAccountAccess(
    accountNumber,
    stateId: number,
    canPay?: number
  ) {
    isLoading.value = true;

    const { error } = await ApiAccount.toggleAccess({
      path: {
        branch: user?.branch!,
        businessCode: businessCode.value,
        userId,
        accountNumber: accountNumber
      },
      body: {
        stateId,
        canPay: canPay || 0
      }
    });

    if (!error) {
      toast.success(t('Data-saved') + '!');

      setAccountRelationValueByKey(
        accountNumber, 'stateId', stateId
      );

      canPay !== undefined
        && setAccountRelationValueByKey(
          accountNumber, 'canPay', canPay
        );
    }

    isLoading.value = false;
  }

  function getAllAccountAccesses(
    relation: Partial<IAccountRelation>
  ): IAccountAccess[] {
    const accounts: IAccountAccess[] = [];

    dataTable.value.forEach(
      account => {
        const {
          canPay,
          stateId
        } = account
          .accountRelations
          .find(
            _relation => _relation.userId === userId
          ) || {
          stateId: 0,
          canPay: 0
        };

        accounts.push({
          accountNumber: account.accountNumber,
          canPay,
          stateId,
          ...relation
        } as IAccountAccess);
      }
    );

    return accounts;
  }

  async function toggleAllAccountAccesses(
    relation: Partial<IAccountRelation>
  ): Promise<boolean> {
    isLoading.value = true;

    const { error } = await ApiAccount
      .toggleAllAccess({
        branch: user?.branch!,
        userId,
        businessCode: businessCode.value,
        accounts: getAllAccountAccesses(
          relation
        )
      });

    error || toast.success(t('Data-saved') + '!');

    isLoading.value = false;

    return !error;
  }

  const onCloseModule = () => router.go(-1);

  useClientUserOrganizationSync(
    () => props.clientUser,
    selectedOrganization
  );

  watch([ businessCode ], () => {
    resetPagination();
    fetchAccounts();
  });

  return {
    columns,
    isLoading,
    rowKey,
    dataTable,
    fetchAccounts,
    selectedOrganization,
    onCloseModule,
    tableRef,
    userId
  };
}
