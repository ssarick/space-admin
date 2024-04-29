import { Ref, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useMessage } from 'naive-ui';
import { NonNullableObjectValues } from '@/shared/types/utility.types';
import { ApiAdministration } from '@/projects/autopay/shared/api';
import {
  ILimit,
  ILimitWithOptions,
  LimitType
} from '@/projects/autopay/shared/types/administration.types';

export default function useLimitsEdit(
  limitList: Ref<ILimitWithOptions[]>
) {
  const limitEditModalIsOpen = ref(false);
  const message = useMessage();
  const { t } = useI18n();

  const limitForEdit = ref<
    ILimitWithOptions | null
  >(null);

  const onEditLimitItem = (
    limit: ILimitWithOptions
  ) => {
    limitForEdit.value = limit;
    limitEditModalIsOpen.value = true;
  };

  const getLimitByType = (
    limitType: LimitType
  ) => limitList.value.find(
    item => item.type === limitType
  );

  const setLimitProp = <T extends keyof ILimitWithOptions>(
    limitType: LimitType | null,
    key: T,
    value: ILimitWithOptions[T]
  ) => {
    if (!limitType) return;

    const limit = getLimitByType(limitType);

    if (limit) limit[key] = value;
  };

  const setLimitForEditLoading = (
    limitType: LimitType | null,
    value: boolean
  ) => setLimitProp(
    limitType,
    'loading',
    value
  );

  const onConfirmEditLimit = async (
    limit: ILimit
  ) => {
    setLimitForEditLoading(
      limit.type, true
    );

    const { error } = await ApiAdministration
      .changeLimit(
        limit as NonNullableObjectValues<ILimit>
      );

    if (!error) {
      setLimitProp(limit.type, 'limit', limit.limit);
      message.success(t('Success'));
    }

    setLimitForEditLoading(
      limit.type, false
    );
  };

  return {
    limitEditModalIsOpen,
    limitForEdit,
    onEditLimitItem,
    onConfirmEditLimit
  };
}
