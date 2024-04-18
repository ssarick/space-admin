import { computed } from 'vue';
import { useVModels } from '@vueuse/core';
import { IListItem } from '@/shared/types/common.types';
import { DATE_TIME_TEXT_FORMAT } from '@/shared/utils/constants/naive-constants';
import { formatDate } from '@/shared/utils/functions/date';
import { LogsAuditDetailsEmits, LogsAuditDetailsProps } from './logs-audit-details.types';

export default function useLogsAuditDetails(
  props: LogsAuditDetailsProps,
  emit: LogsAuditDetailsEmits
) {
  const models = useVModels(props, emit);

  const detailList = computed<IListItem[]>(() => [
    {
      name: 'Логин',
      subText: props.data?.username
    },
    {
      name: 'IP-адрес пользователя',
      subText: props.data?.ipAddress
    },
    {
      name: 'Название сервиса',
      subText: props.data?.serviceName
    },
    {
      name: 'Действие',
      subText: props.data?.actionName
    },
    {
      name: 'Время запроса',
      subText: formatDate(
        props.data?.requestDateTime,
        DATE_TIME_TEXT_FORMAT
      )
    },
    {
      name: 'Время ответа',
      subText: formatDate(
        props.data?.responseDateTime,
        DATE_TIME_TEXT_FORMAT
      )
    },
    {
      name: 'Название браузера',
      subText: props.data?.browserName
    },
    {
      name: 'Версия браузера',
      subText: props.data?.browserVersion
    },
    {
      name: 'Операционная система',
      subText: `${props.data?.os} ${props.data?.osVersion}`
    },
    {
      name: 'Язык браузера',
      subText: props.data?.browserLanguage
    },
    {
      name: 'Временная зона',
      subText: props.data?.timezone
    },
    {
      name: 'Идентификатор браузера',
      subText: props.data?.browserIdentity
    },
    {
      name: 'Cookies',
      subText: props.data?.cookies || '-'
    },
    {
      name: 'HTTP-заголовки',
      subText: props.data?.httpHeaders
        ? JSON.stringify(props.data?.httpHeaders)
        : '-'
    },
    {
      name: 'Реферер',
      subText: props.data?.referer || '-'
    },
    {
      name: 'HTTP-метод',
      subText: props.data?.requestMethod
    },
    {
      name: 'URL запроса',
      subText: props.data?.url
    },
    {
      name: 'Тело запроса',
      subText: props.data?.requestBody || '-'
    },
    {
      name: 'HTTP-код ответа',
      subText: props.data?.responseCode
    },
    {
      name: 'Тело ответа',
      subText: props.data?.responseBody || '-'
    }
  ]);

  return {
    ...models,
    detailList
  };
}
