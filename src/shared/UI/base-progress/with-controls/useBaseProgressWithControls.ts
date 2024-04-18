import { BaseProgressWithControlsProps } from './base-progress-with-controls.types';

export default function useBaseProgressWithControls(
  props: BaseProgressWithControlsProps
) {
  const donePercentage = computed<number>(
    () => {
      const doneSum = props.options?.reduce(
        (acc, option) => option.isDone
          && option.percentage
          ? acc + option.percentage
          : acc,
        0
      );

      return Math.round(doneSum || 0);
    }
  );

  return {
    donePercentage
  };
}
