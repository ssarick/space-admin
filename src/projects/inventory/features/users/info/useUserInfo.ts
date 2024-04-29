import {
  computed,
  onMounted,
  ref
} from 'vue';
import { useI18n } from 'vue-i18n';
import type { IListItem } from '@/shared/types/common.types';
import { formatPhoneNumber } from '@/shared/utils/functions';
import type { UserInfoProps } from '@/projects/inventory/features/users/info/user-info.types';
import { ApiInventoryUsers } from '@/projects/inventory/shared/api';
import type { InventoryUser } from '@/projects/inventory/shared/types/users.types';

export default function useUserInfo(
  props: UserInfoProps
) {
  const { t } = useI18n();
  const user = ref<InventoryUser | null>(null);
  const loading = ref(false);

  const userInfo = computed<IListItem[]>(() => [
    {
      name: t('Full-name-short'),
      subText: user.value?.fullName || '-'
    },
    {
      name: t('Phone-number'),
      subText: formatPhoneNumber(
        user.value?.phoneNumber
      )
    },
    {
      name: t('Login'),
      subText: user.value?.userName || '-'
    },
    {
      name: 'E-mail',
      subText: user.value?.email || '-'
    }
  ]);

  const fetchUser = async () => {
    loading.value = true;

    const {
      result,
      errors
    } = await ApiInventoryUsers.fetchUser(props.userId);

    loading.value = false;
    if (errors) return;
    user.value = result;
  };

  onMounted(fetchUser);

  return {
    userInfo,
    loading
  };
}
