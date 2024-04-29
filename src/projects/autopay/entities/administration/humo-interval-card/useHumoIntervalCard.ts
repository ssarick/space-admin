import { ref } from 'vue';
import {
  IHumoIntervalCardEmits,
  IHumoIntervalCardProps
} from './humo-interval-card.types';

export default function useHumoIntervalCard(
  _props: IHumoIntervalCardProps,
  _emit: IHumoIntervalCardEmits
) {
  const amount = ref<string>('');

  return {
    amount
  };
}
