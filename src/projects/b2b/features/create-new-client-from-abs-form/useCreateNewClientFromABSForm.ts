import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/app/store/auth/useAuthStore';
import { ApiClient } from '@/projects/b2b/shared/api';
import { IClient } from '@/projects/b2b/shared/types/client.types';

export default function useCreateNewClientFromABSForm() {
  const router = useRouter();
  const { user } = useAuthStore();
  const searchValue = ref('');
  const isLoading = ref(false);
  const isAddUserAfterCreation = ref(false);
  const clientData = ref<IClient | null>(null);

  const searchButtonDisabled = computed(() =>
    searchValue.value.length !== 8);

  async function onSearchClient() {
    isLoading.value = true;

    const { item } = await ApiClient.fetchClientById({
      path: {
        branch: user?.branch!,
        businessCode: searchValue.value
      }
    });

    isLoading.value = false;
    clientData.value = item || null;
  }

  async function tryToCreateClient() {
    const businessCode = clientData.value?.clientCode || '';

    const { error } = await ApiClient.addNewClientToClientBranch({
      path: {
        branch: user?.branch!,
        businessCode
      }
    });

    if (error) return;

    router.push(
      isAddUserAfterCreation.value
        ? {
          name: 'client-users-add',
          params: {
            businessCode
          }
        }
        : {
          name: 'clients'
        }
    );
  }

  return {
    searchValue,
    onSearchClient,
    tryToCreateClient,
    isLoading,
    clientData,
    isAddUserAfterCreation,
    searchButtonDisabled
  };
}
