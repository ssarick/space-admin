import { createI18n } from 'vue-i18n';
import { config } from '@vue/test-utils';
import { vMaska } from 'maska';
import { create, NButton, NInput, NText } from 'naive-ui';

const naive = create({
  components: [
    NButton,
    NInput,
    NText
  ]
});

config.global.directives.maska = vMaska;

config.global.plugins = [
  naive,
  createI18n({})
];

config.global.mocks = {
  $t: () => {},
  t: () => {}
};

config.plugins.VueWrapper.install(instance => {
  instance.findByTestId = <T extends Node>(
    testId: string
  ) => instance.find<T>(`[data-test="${testId}"]`);

  return instance;
});
