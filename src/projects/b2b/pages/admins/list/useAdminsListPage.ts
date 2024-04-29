import { useRouter } from 'vue-router';

export default function useAdminsListPage() {
  const router = useRouter();

  const goCreationPage = () =>
    router.push({
      name: 'admins-create'
    });

  return {
    goCreationPage
  };
}
