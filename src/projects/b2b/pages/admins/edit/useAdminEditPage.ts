import { useRoute } from 'vue-router';

export default function useAdminEditPage() {
  const route = useRoute();
  const adminId = +(route.params.id || 0);

  return {
    adminId
  };
}
