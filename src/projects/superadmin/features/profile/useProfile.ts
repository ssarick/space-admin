import { computed, toRefs } from 'vue';
import { IListItem } from '@/shared/types/common.types';
import { useAuthPanelStore } from '@/app/store/auth/useAuthPanelStore';
import { useAuthStore } from '@/app/store/auth/useAuthStore';

export default function useProfile() {
  const {
    profile,
    userLoading
  } = toRefs(useAuthStore());

  const {
    availablePanels
  } = toRefs(useAuthPanelStore());

  const profileList = computed<IListItem[]>(
    () => [
      {
        name: 'ФИО',
        subText: profile?.value?.name
          || 'Эльдар Романов' // TODO Mock
      },
      {
        name: 'Email',
        subText: profile?.value?.email
          || 'email@kb.uz' // TODO Mock
      },
      {
        name: 'Номер телефона',
        subText: profile?.value?.phone
          || '+998 90 128 44 22' // TODO Mock
      },
      {
        name: 'Должность',
        subText: profile?.value?.role
          || 'Высокая' // TODO Mock
      },
      {
        name: 'Подразделение',
        subText: profile?.value?.subdivision
          || 'Большое' // TODO Mock
      },
      {
        name: 'Локация',
        subText: profile?.value?.location
          || 'ул Навои 22' // TODO Mock
      }
    ]
  );

  return {
    profileList,
    loading: userLoading,
    availablePanels
  };
}
