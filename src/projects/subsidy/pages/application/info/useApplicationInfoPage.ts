import { useRoute } from 'vue-router';

export default function useApplicationInfoPage() {
  const route = useRoute();
  const subsidyId = +route.params.subsidyId;

  return {
    subsidyId
  };
}
