import { computed, onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';
import { useDialog } from 'naive-ui';
import { useAuthStore } from '@/app/store/auth/useAuthStore';
import { ApiClient } from '@/projects/b2b/shared/api';
import { IClient } from '@/projects/b2b/shared/types/client.types';

export default function useClientUsers() {
  const router = useRouter();
  const route = useRoute();
  const { t } = useI18n();
  const dialog = useDialog();
  const client = ref<IClient | null>(null);
  const clientLoading = ref(false);
  const { user } = useAuthStore();

  const businessCode = String(
    route.params.businessCode || ''
  );

  const prevRoute = computed(
    () => ({
      name: 'client-detail',
      params: {
        businessCode: client.value?.clientCode
      }
    })
  );

  function onAddUser() {
    dialog.warning({
      title: t('Adding-a-user'),
      positiveText: t('Select-from-the-list'),
      negativeText: t('Create-a-new-one'),
      positiveButtonProps: {
        type: 'success',
        ghost: true
      },
      negativeButtonProps: {
        type: 'default'
      },
      onPositiveClick: () => {
        router.push({
          name: 'client-users-add',
          params: { businessCode }
        });
      },
      onNegativeClick: () => {
        router.push({
          name: 'client-user-create',
          params: { businessCode }
        });
      }
    });
  }

  const fetchClient = async () => {
    clientLoading.value = true;

    const { error, item } = await ApiClient
      .fetchClientById({
        path: {
          branch: user?.branch!,
          businessCode
        }
      });

    error || (client.value = item);

    clientLoading.value = false;
  };

  onMounted(() => {
    fetchClient();
  });

  return {
    onAddUser,
    client,
    clientLoading,
    prevRoute
  };
}
