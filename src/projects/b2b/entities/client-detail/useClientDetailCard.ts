import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import {
  IBaseDetailCardBody,
  IBaseDetailCardHead
} from '@/shared/UI/base-detail-card/base-detail-card.types';
import { ClientStateId } from '@/projects/b2b/shared/types/client.types';
import { stateMap } from '@/projects/b2b/shared/utils/constants';
import { IClientDetailCardProps } from './client-detail-card.types';

export default function useClientDetailCard(props: IClientDetailCardProps) {
  const { t } = useI18n();

  const head = computed<IBaseDetailCardHead[]>(() => [
    {
    },
    {
      text: t('Organization-data')
    }
  ]);

  const body = computed<IBaseDetailCardBody[]>(() => [
    {
      title: t('MFO'),
      text: props.data?.branch || ''
    },
    {
      title: t('Client-code'),
      text: props.data?.clientCode || ''
    },
    {
      title: t('INN'),
      text: props.data?.inn || '-'
    },
    {
      title: t('Pinfl'),
      text: props.data?.pinfl || '-'
    },
    {
      title: t('Name-of-the-organization'),
      text: props.data?.clientName || ''
    },
    {
      title: t('Full-name-of-the-director'),
      text: props.data?.ceoName || ''
    },
    {
      title: t('Status'),
      text: stateMap.value[props.data?.stateId!]
        || '-'
    },
    {
      title: t('Reason-for-blocking'),
      text: props.data?.stateReason || '',
      visibility: props.data?.stateId === ClientStateId.BLOCKED
    }
  ]);

  return {
    head,
    body
  };
}
