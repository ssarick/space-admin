import { useRouter } from 'vue-router';

export default function useLogsPage() {
  const router = useRouter();

  const goHistoryPage = () =>
    router.push({ name: 'logs-history' });

  return {
    goHistoryPage
  };
}
