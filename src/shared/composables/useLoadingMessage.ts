import { h, VNodeChild } from 'vue';
import { NButton } from 'naive-ui';
import DATE_SHORTCUTS from '../utils/constants/date-shortcuts';
import renderIcon from '../utils/render-icon';
import { toast } from '../utils/toast';

export default function useLoadingMessage(
  renderContent?: () => VNodeChild,
  onDestroy?: () => void
) {
  const loadingMessage = toast.value?.create(
    () => h(
      'div', {
        class: [
          'color-common_black',
          'flex',
          'align-items-center'
        ]
      },
      [
        h('div', undefined, [
          renderContent && renderContent()
        ]),
        h(
          NButton,
          {
            secondary: true,
            size: 'small',
            class: [
              'ml-2',
              'custom-message__close-button',
              'custom-icon',
              'color-common_black'
            ],
            renderIcon: renderIcon('close', {
              size: '20px'
            }),
            onClick: () => {
              onDestroy && onDestroy();
              loadingMessage?.destroy();
            }
          }
        )
      ]
    ),
    {
      type: 'loading',
      duration: DATE_SHORTCUTS.MS_IN_HOURS * 24
    }
  );

  return {
    loadingMessage
  };
}
