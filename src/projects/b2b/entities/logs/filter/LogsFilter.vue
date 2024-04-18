<script lang="ts" setup>
import { NDatePicker, NSpace } from 'naive-ui';
import BaseInput from '@/shared/UI/base-input';
import BaseSelect from '@/shared/UI/base-select';
import { fieldLimits } from '@/shared/utils/constants/field-limits';
import { isDisabledDatesExceptCurrent } from '@/shared/utils/functions/date-picker';
import { inputAllowLatinicAndNumber, inputAllowLogin, inputAllowOnlyNumber } from '@/shared/utils/input-allow-rules';
import { LogEntityType } from '@/projects/b2b/shared/types/log.types';
import { ILogsFilterEmits, ILogsFilterProps } from './logs-filter.types';
import useLogsFilter from './useLogsFilter';

const props = defineProps<ILogsFilterProps>();
const emit = defineEmits<ILogsFilterEmits>();

const {
  logEntityType,
  logType,
  anyCode,
  userLogin,
  userName,
  userPhone,
  userPidNumber,
  userPidSN,
  logEntityTypeOptions,
  logTypeOptions,
  phoneFieldMask,
  datePeriod,
  onClearDatePeriod,
  onSelectAllDatePeriod,
  datePeriodIsVisible
} = useLogsFilter(props, emit);
</script>

<template>
  <n-space>
    <BaseSelect
      v-model="logType"
      placeholder="Тип логов"
      class="min-field-width"
      :options="logTypeOptions"
    />

    <BaseSelect
      v-model="logEntityType"
      placeholder="Выбор сущности"
      class="min-field-width"
      :options="logEntityTypeOptions"
    />

    <n-date-picker
      v-model:value="datePeriod"
      v-model:show="datePeriodIsVisible"
      type="daterange"
      clearable
      close-on-select
      :is-date-disabled="isDisabledDatesExceptCurrent"
      :actions="null"
    >
      <template #footer>
        <n-space
          justify="end"
        >
          <n-button
            size="small"
            @click="onClearDatePeriod"
          >
            Очистить
          </n-button>

          <n-button
            size="small"
            @click="onSelectAllDatePeriod"
          >
            За весь период
          </n-button>
        </n-space>
      </template>
    </n-date-picker>

    <template v-if="logType !== null">
      <BaseInput
        v-if="logEntityType === LogEntityType.CLIENT"
        v-model="anyCode"
        class="min-field-width"
        :placeholder="`${$t('INN')}/${$t('Pinfl')}/${$t('Client-code')}`"
        :allow-input="inputAllowOnlyNumber"
        :maxlength="fieldLimits.pinfl.maxLength"
      />

      <template
        v-if="logEntityType === LogEntityType.USER"
      >
        <BaseInput
          v-model="userName"
          clearable
          :placeholder="$t('Full-name-short')"
          :maxlength="fieldLimits.fio.maxLength"
        />

        <BaseInput
          v-model="userLogin"
          clearable
          :placeholder="$t('Login')"
          :maxlength="fieldLimits.login.maxLength"
          :allow-input="inputAllowLogin"
        />

        <BaseInput
          v-model="userPhone"
          v-mask:[phoneFieldMask]
          clearable
          :placeholder="$t('Phone')"
        />

        <BaseInput
          v-model="userPidSN"
          clearable
          uppercase
          :placeholder="$t('Document-series')"
          :maxlength="fieldLimits.pidSnOther.maxLength"
          :allow-input="inputAllowLatinicAndNumber"
        />

        <BaseInput
          v-model="userPidNumber"
          clearable
          :placeholder="$t('Document-number')"
          :allow-input="inputAllowOnlyNumber"
          :maxlength="fieldLimits.pidNum.maxLength"
        />
      </template>
    </template>
  </n-space>
</template>
