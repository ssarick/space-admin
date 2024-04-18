import { useRouter } from 'vue-router';

export default function useCashierOperation () {
  const router = useRouter();
  const selectedOperation = ref<string>();

  const handleSelectOperationType = (operationType: string) => {
    selectedOperation.value = operationType;
    router.push({
      name: operationType
    });
  };

  return {
    selectedOperation,
    handleSelectOperationType
  };
}
