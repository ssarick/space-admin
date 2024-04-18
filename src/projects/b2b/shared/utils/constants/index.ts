import { computed } from 'vue';
import i18n from '@/shared/plugins/i18n';
import { UserStateId } from '@/projects/b2b/shared/types/user.types';

export const stateMap = computed(() => ({
  [UserStateId.BLOCKED]: i18n.global.t('Blocked'),
  [UserStateId.ACTIVE]: i18n.global.t('Active')
}));
