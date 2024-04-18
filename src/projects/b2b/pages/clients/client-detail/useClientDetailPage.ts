import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useAuthStore } from '@/app/store/auth/useAuthStore';
import { ApiClient } from '@/projects/b2b/shared/api';
import { IClient } from '@/projects/b2b/shared/types/client.types';

export default function useClientDetailPage() {
  const route = useRoute();
  const { user } = useAuthStore();
  const businessCode = route.params.businessCode?.toString();
  const isLoading = ref(false);
  const clientData = ref<IClient | null>(null);

  async function getClientById() {
    isLoading.value = true;

    const { item } = await ApiClient.fetchClientById({
      path: { branch: user?.branch!, businessCode }
    });

    isLoading.value = false;
    clientData.value = item;
  }

  onMounted(() => {
    getClientById();
  });

  return {
    isLoading,
    clientData,
    businessCode
  };
}
