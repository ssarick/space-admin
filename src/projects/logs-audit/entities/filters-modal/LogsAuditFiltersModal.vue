<script setup lang='ts'>
import {
  NDatePicker,
  NFormItem,
  NGi,
  NGrid
} from 'naive-ui';
import BaseForm from '@/shared/UI/base-form';
import BaseInputGroup from '@/shared/UI/base-input-group';
import BaseModal from '@/shared/UI/base-modal';
import BaseSelect from '@/shared/UI/base-select';
import { DATE_FORMAT } from '@/shared/utils/constants/naive-constants';
import {
  LogsAuditFiltersModalEmits,
  LogsAuditFiltersModalProps
} from './logs-audit-filters-modal.types';
import useLogsAuditFiltersModal from './useLogsAuditFiltersModal';

const props = defineProps<LogsAuditFiltersModalProps>();
const emit = defineEmits<LogsAuditFiltersModalEmits>();

const {
  formRef,
  action,
  service,
  username,
  dateFrom,
  dateTo,
  modelValue,
  validateForm,
  restoreFormValidation,
  handleSubmit,
  rules
} = useLogsAuditFiltersModal(props, emit);

defineExpose({
  validate: validateForm,
  restoreValidation: restoreFormValidation
});
</script>

<template>
  <BaseModal
    v-model="modelValue"
    size="large"
    :title="props.title || 'Фильтры'"
  >
    <BaseForm
      ref="formRef"
      no-prevent-route
      :rules="rules"
      :model="props.model"
      @submit.prevent="handleSubmit"
    >
      <n-grid
        x-gap="32"
        y-gap="8"
        cols="12"
        responsive="screen"
        item-responsive
      >
        <n-gi span="12 m:6">
          <n-form-item
            path="service"
            label="Сервисы"
          >
            <BaseSelect
              v-model="service"
              placeholder=""
              multiple
              :request="props.requestServices"
            />
          </n-form-item>
        </n-gi>

        <n-gi span="12 m:6">
          <n-form-item
            path="username"
            label="Администраторы"
          >
            <BaseSelect
              v-model="username"
              placeholder=""
              multiple
              tag
              :request="props.requestAdmins"
            />
          </n-form-item>
        </n-gi>

        <n-gi span="12 m:6">
          <BaseInputGroup title="Время запроса">
            <n-form-item
              path="dateFrom"
              :show-label="false"
            >
              <n-date-picker
                v-model:value="dateFrom"
                type="date"
                class="w-100"
                :format="DATE_FORMAT"
              />
            </n-form-item>

            <n-form-item
              path="dateTo"
              :show-label="false"
            >
              <n-date-picker
                v-model:value="dateTo"
                type="date"
                class="w-100"
                :format="DATE_FORMAT"
              />
            </n-form-item>
          </BaseInputGroup>
        </n-gi>

        <n-gi span="12 m:6">
          <n-form-item
            path="action"
            label="Действия"
          >
            <BaseSelect
              v-model="action"
              placeholder=""
              multiple
              :request="props.requestActions"
            />
          </n-form-item>
        </n-gi>

        <n-gi span="12 m:6">
          <n-button
            attr-type="submit"
            type="primary"
            block
          >
            {{ props.submitText || 'Применить' }}
          </n-button>
        </n-gi>
      </n-grid>
    </BaseForm>
  </BaseModal>
</template>
