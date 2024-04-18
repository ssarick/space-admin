import { useRoute, useRouter } from 'vue-router';

export default function useClientUsersAddingPage() {
  const route = useRoute();
  const router = useRouter();
  const { businessCode } = route.params;
  const onCancel = () => router.go(-1);

  const onNext = () =>
    router.push({
      name: 'client-user-create',
      params: {
        businessCode
      }
    });

  return {
    onCancel,
    onNext
  };
}
