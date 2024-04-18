import { useRoute } from 'vue-router';

export default function useApplicationEditPage() {
  const route = useRoute();
  const subsidyId = +route.params.subsidyId;

  return {
    subsidyId
  };
}
