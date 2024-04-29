import {
  computed,
  h,
  Ref
} from 'vue';
import { useI18n } from 'vue-i18n';
import { DataTableColumns, NCheckbox } from 'naive-ui';
import { useCheckboxColumnTitle } from '@/shared/composables';
import { ArrayCheckerMethods } from '@/shared/types/common.types';
import { IAccount, IAccountRelation } from '@/projects/b2b/shared/types/account.types';

export default function useUserAccessAccountsColumns(
  accounts: Ref<IAccount[]>,
  userId: number,
  toggleAccountAccess: (
    accountNumber: string,
    stateId: number,
    canPay?: number
  ) => void,
  toggleAllAccountAccesses: (
    relation: Partial<IAccountRelation>
  ) => Promise<boolean>,
  isEdit?: boolean
) {
  const { t } = useI18n();

  const hasTruthyUserAccountRelationKey = (
    keys: (keyof IAccountRelation)[]
  ) => (
    relation: IAccountRelation
  ) => relation.userId === userId
    ? keys.some(key => relation[key])
    : true;

  const hasTruthyAccountRelationKey = (
    keys: (keyof IAccountRelation)[],
    method: ArrayCheckerMethods = 'every'
  ) => computed<boolean>(
    () => accounts.value[method](
      account => account.accountRelations[method](
        hasTruthyUserAccountRelationKey(keys)
      )
    )
  );

  const hasViewAccessToPartialAccounts =
    hasTruthyAccountRelationKey(
      [ 'stateId', 'canPay' ], 'some'
    );

  const hasFullAccessToPartialAccounts =
    hasTruthyAccountRelationKey(
      [ 'canPay' ], 'some'
    );

  const hasFullAccessToAllAccounts =
    hasTruthyAccountRelationKey(
      [ 'canPay' ]
    );

  const hasViewAccessToAllAccounts =
    hasTruthyAccountRelationKey(
      [ 'stateId', 'canPay' ]
    );

  const setAllAccountsRelationValue = (
    payload: Partial<IAccountRelation>
  ) => accounts.value.forEach(
    account => account.accountRelations.forEach(
      relation => relation.userId === userId
        && Object.assign(relation, payload)
    )
  );

  const onCheckFullAccess = async () => {
    const newValue = hasFullAccessToAllAccounts
      .value ? 0 : 1;

    const newRelation: Partial<IAccountRelation> = {
      canPay: newValue,
      stateId: newValue
    };

    const success = await toggleAllAccountAccesses(
      newRelation
    );

    success && setAllAccountsRelationValue(
      newRelation
    );
  };

  const onCheckViewAccess = async () => {
    const newRelation: Partial<IAccountRelation> = {
      stateId: hasViewAccessToAllAccounts
        .value ? 0 : 1
    };

    const success = await toggleAllAccountAccesses(
      newRelation
    );

    success
      && setAllAccountsRelationValue(newRelation);
  };

  const columns = computed<DataTableColumns<IAccount>>(() => [
    {
      title: t('Mfo'),
      key: 'branch'
    },
    {
      title: t('Account-number'),
      key: 'accountNumber'
    },
    {
      title: useCheckboxColumnTitle(
        t('Viewing'),
        hasViewAccessToAllAccounts,
        onCheckViewAccess,
        hasViewAccessToPartialAccounts,
        true
      ),
      key: 'viewing',
      render(row: IAccount) {
        const relation = row
          .accountRelations
          ?.find(
            (fAccount) => +fAccount.userId === userId
          );

        return [
          h(NCheckbox, {
            size: 'large',
            checked: !!(relation?.stateId
              || relation?.canPay),
            onUpdateChecked(v: boolean) {
              toggleAccountAccess(row.accountNumber, Number(v));
            },
            disabled: !isEdit
          })
        ];
      }
    },
    {
      title: useCheckboxColumnTitle(
        t('Full-access'),
        hasFullAccessToAllAccounts,
        onCheckFullAccess,
        hasFullAccessToPartialAccounts,
        true
      ),
      key: 'full-access',
      render(row: IAccount) {
        return [
          h(NCheckbox, {
            size: 'large',
            checked: !!row.accountRelations?.find((fAccount) => {
              return +fAccount.userId === userId;
            })?.canPay,
            onUpdateChecked(v) {
              toggleAccountAccess(row.accountNumber, Number(v), Number(v));
            },
            disabled: !isEdit
          })
        ];
      }
    }
  ]);

  return {
    columns
  };
}
