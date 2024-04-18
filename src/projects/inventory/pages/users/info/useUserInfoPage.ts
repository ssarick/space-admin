import { useRoute } from 'vue-router';

export default function useUserInfoPage() {
  const router = useRoute();
  const userId = +router.params.userId;

  return {
    userId
  };
}
