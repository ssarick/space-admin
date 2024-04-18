import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useAuthStore } from '@/app/store/auth/useAuthStore';
import { ApiUser } from '@/projects/b2b/shared/api';
import { IUser } from '@/projects/b2b/shared/types/user.types';

export default function useClientUserFetch() {
  const user = ref<IUser | null>(null);
  const userLoading = ref(false);
  const route = useRoute();
  const { user: authedUser } = useAuthStore();
  const businessCode = route.params.businessCode?.toString();
  const userId = +(route.params.userId || 0);

  const loadUser = async () => {
    userLoading.value = true;

    const { item, error } = await ApiUser.getClientUserById({
      path: {
        branch: authedUser?.branch!,
        businessCode,
        userId
      }
    });

    error || (user.value = item);

    userLoading.value = false;
  };

  onMounted(loadUser);

  return {
    user,
    userLoading
  };
}
