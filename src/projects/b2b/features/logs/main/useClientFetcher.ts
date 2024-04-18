import { ref } from 'vue';
import { useAuthStore } from '@/app/store/auth/useAuthStore';
import { ILogsModel } from '@/projects/b2b/pages/logs/logs-page.types';
import { ApiClient } from '@/projects/b2b/shared/api';
import { IClient } from '@/projects/b2b/shared/types/client.types';

export default function useClientFetcher(
  model: ILogsModel
) {
  const clients = ref<IClient[]>([]);
  const clientsLoading = ref(false);
  const { user } = useAuthStore();

  const fetchClients = async () => {
    clientsLoading.value = true;

    const { item } = await ApiClient
      .fetchClientsByAnyCode({
        branch: user?.branch!,
        anyCode: model.anyCode || ''
      });

    clients.value = item?.clientCode ? [ item ] : [];
    clientsLoading.value = false;
  };

  return {
    clients,
    clientsLoading,
    fetchClients
  };
}
