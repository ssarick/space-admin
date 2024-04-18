import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAuthStore } from '@/app/store/auth/useAuthStore';
import { useUserCreationStore } from '@/projects/b2b/app/store/useUserCreationStore';
import { useUserCertificateCreationVariantDialog } from '@/projects/b2b/entities/user-certificate';
import { ApiUser } from '@/projects/b2b/shared/api';
import { IUser } from '@/projects/b2b/shared/types/user.types';

export default function useClientUserAddFinishing() {
  const route = useRoute();
  const router = useRouter();
  const { user } = useAuthStore();
  const businessCode = route.params.businessCode?.toString();
  const userId = +(route.params.userId || 0);
  const userFullName = ref<string | null>(null);
  const userData = ref<IUser | null>(null);
  const isLoading = ref(false);
  const isNeedAddCertificate = ref(false);
  const userCreationStore = useUserCreationStore();

  const { dialogIsActive } = useUserCertificateCreationVariantDialog(
    ref(businessCode)
  );

  async function getUserById() {
    isLoading.value = true;

    const { item } = await ApiUser.getClientUserById({
      path: { branch: user?.branch!, businessCode, userId }
    });

    isLoading.value = false;
    userFullName.value = item.fio;
    userData.value = item;
  }

  function onComplete() {
    userCreationStore.finishUserCreation();

    if (isNeedAddCertificate.value)
      return (dialogIsActive.value = true);

    router.push({
      name: 'client-users',
      params: { businessCode }
    });
  }

  function leavePageIfUserCreationIsntStarted() {
    userCreationStore.userCreationStarted
      || router.push({
        name: 'client-users',
        params: { businessCode }
      });
  }

  leavePageIfUserCreationIsntStarted();

  onMounted(() => {
    getUserById();
  });

  return {
    userFullName,
    isLoading,
    userData,
    isNeedAddCertificate,
    businessCode,
    userId,
    onComplete
  };
}
