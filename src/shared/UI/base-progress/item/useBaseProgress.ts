import { BaseProgressProps } from './base-progress.types';

export default function useBaseProgress(
  props: BaseProgressProps
) {
  const calcPercentageByIndex = (
    currentIndex: number
  ): number => {
    let percentage = 0;
    const optionsCount = props.options?.length || 0;

    if (optionsCount) {
      for (let index = 0; index < optionsCount; index++) {
        const option = props.options![index];

        percentage += option.percentage || 0;

        if (index === currentIndex) break;
      }
    }

    return percentage;
  };

  return {
    calcPercentageByIndex
  };
}
