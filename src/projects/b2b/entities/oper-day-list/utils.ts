import { h } from 'vue';
import {
  NCheckbox,
  NDivider,
  NSwitch,
  NTag
} from 'naive-ui';
import { formatDate } from '@/shared/utils/functions/date';
import { IOperDay } from '@/projects/b2b/shared/types/oper-day.types';
import { IOperDaySwitchOptions } from './oper-day-list.types';

export const renderOperDayState = (
  description?: string | null
) => h(NTag, {
  round: true,
  size: 'small',
  style: {
    whiteSpace: 'normal',
    height: 'auto'
  },
  class: 'p-1',
  bordered: false
}, () => description);

export const renderOperDayDetails = (
  date?: string | null,
  description?: string | null
) => h('div', null, [
  h('p', null, `Дата: ${formatDate(date)}`),
  h(NDivider, {
    class: 'my-1'
  }),
  h('p', null, [
    'Статус: ',
    renderOperDayState(description)
  ])
]);

export const renderOperDaySwitch = (
  row: IOperDay,
  options?: IOperDaySwitchOptions
) => options?.isSwitch
  ? h(
    'div',
    {
      class: 'flex align-items-center'
    },
    {
      default: () => [
        h(NSwitch, {
          class: 'mr-1',
          value: !!options?.state,
          disabled: !!options?.disabled,
          'onUpdate:value': (value: boolean) =>
            options?.onUpdate?.(value, row)
        }),
        h('span', null, options?.state
          ? options?.enabledText
          : options?.disabledText)
      ]
    })
  : h(
    NCheckbox,
    {
      checked: !!options?.state,
      class: 'align-items-center',
      disabled: !!options?.disabled,
      label: options?.state
        ? options?.enabledText
        : options?.disabledText,
      'onUpdate:checked': (value: boolean) =>
        options?.onUpdate?.(value, row)
    });
