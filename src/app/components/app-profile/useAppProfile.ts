import { toRefs } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/app/store/auth/useAuthStore';

export default function useAppProfile() {
  const router = useRouter();

  const {
    user,
    userLoading
  } = toRefs(useAuthStore());

  // TODO {goToProfile} deactivated no api yet
  const goToProfile = () => 1 || router.push({
    name: 'profile'
  });

  return {
    user,
    userLoading,
    goToProfile
  };
}
