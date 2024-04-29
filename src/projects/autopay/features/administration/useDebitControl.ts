import { onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useDialog, useMessage } from 'naive-ui';
import { ApiAdministration } from '@/projects/autopay/shared/api';
import {
  IDebitControlItem,
  IDebitControlItemValue,
  IDebitControlItemWithOptions,
  ProcessingType
} from '@/projects/autopay/shared/types/administration.types';

export default function useDebitControl() {
  const debitList = ref<IDebitControlItemWithOptions[]>([]);
  const debitListLoading = ref(false);
  const dialog = useDialog();
  const { t } = useI18n();
  const message = useMessage();

  const excludeDebitTypes: ProcessingType[] = [
    ProcessingType.AUTO_PAY_HUMO
  ];

  const mapDebitList = (
    list: IDebitControlItem[]
  ): IDebitControlItemWithOptions[] => list.map(
    item => ({
      ...item,
      loading: false
    })
  );

  const fetchDebitList = async () => {
    debitListLoading.value = true;

    const { items } = await ApiAdministration
      .fetchDebitList();

    debitList.value = mapDebitList(items || [])
      .filter(debit => !excludeDebitTypes
        .includes(debit.processingType!));

    debitListLoading.value = false;
  };

  const findDebitListItem = (
    processingType: ProcessingType
  ) => debitList.value.find(
    item => item.processingType === processingType
  );

  const setDebitListItemProp = <T extends keyof IDebitControlItemWithOptions>(
    processingType: ProcessingType,
    key: T,
    value: IDebitControlItemWithOptions[T]
  ) => {
    const item = findDebitListItem(processingType);

    if (item) item[key] = value;
  };

  const changeDebitListItemState = (
    payload: IDebitControlItemValue
  ) => setDebitListItemProp(
    payload.key,
    'active',
    payload.value
  );

  const setDebitListItemLoading = (
    processingType: ProcessingType,
    loading: boolean
  ) => setDebitListItemProp(
    processingType,
    'loading',
    loading
  );

  const onConfirmCheckDebitListItem = async (
    payload: IDebitControlItemValue
  ) => {
    setDebitListItemLoading(payload.key, true);

    const { error } = await ApiAdministration
      .changeDebitState(payload);

    if (!error) {
      changeDebitListItemState(payload);
      message.success(t('Success'));
    }

    setDebitListItemLoading(payload.key, false);
  };

  const onCheckDebitListItem = async (
    payload: IDebitControlItemValue
  ) => dialog.warning({
    title: t('Подтвердите действие'),
    content: t('Вы уверены в этом?'),
    positiveText: t('Да'),
    negativeText: t('Закрыть'),
    onPositiveClick: () => {
      onConfirmCheckDebitListItem(payload);
    }
  });

  onMounted(() => {
    fetchDebitList();
  });

  return {
    debitList,
    debitListLoading,
    onCheckDebitListItem
  };
}
