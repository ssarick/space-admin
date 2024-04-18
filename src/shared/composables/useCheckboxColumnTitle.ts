import { h, Ref } from 'vue';
import { NCheckbox, NSpace, NText } from 'naive-ui';

export default function useCheckboxColumnTitle(
  title: string,
  checked: Ref<boolean>,
  onCheck: (value: boolean) => void,
  indeterminate?: Ref<boolean>,
  hidden?: boolean
) {
  return () => hidden ? title : h(
    NSpace,
    {
      align: 'center',
      wrap: false,
      style: { cursor: 'pointer' },
      onClick: () => onCheck?.(
        !checked.value
      )
    },
    () => [
      h(
        NCheckbox,
        {
          checked: checked.value,
          indeterminate: !checked.value
            && indeterminate?.value
        }
      ),
      h(NText, null, () => title)
    ]
  );
}
