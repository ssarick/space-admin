<script setup lang='ts'>
import {
  NFormItem,
  NGi,
  NGrid } from 'naive-ui';
import BaseForm from '@/shared/UI/base-form';
import BaseInputGroup from '@/shared/UI/base-input-group';
import BaseModal from '@/shared/UI/base-modal';
import BaseSelect from '@/shared/UI/base-select';
import { inputAllowOnlyNumber } from '@/shared/utils/input-allow-rules';
import {
  IUntrustedCardsFilterList,
  IUntrustedCardsModalEmits
} from '@/projects/autopay/entities/untrusted-card/untrusted-card-filter-modal/untrusted-cards-filter-modal.types';
import useUntrustedFilterModal from '@/projects/autopay/entities/untrusted-card/untrusted-card-filter-modal/useUntrustedFilterModal';

const props = defineProps<IUntrustedCardsFilterList>();
const emit = defineEmits<IUntrustedCardsModalEmits>();

const {
  isModalOpen,
  rules,
  formRef,
  statusOptions,
  onFilterSubmit
} = useUntrustedFilterModal(props, emit);
</script>

<template>
  <BaseModal
    v-model="isModalOpen"
    title="Фильтры"
    size="large"
  >
    <BaseForm
      ref="formRef"
      :model="formValues"
      :rules="rules"
      @submit.prevent="onFilterSubmit"
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
            class="form-item"
            label="Договор ID"
            path="contractId"
          >
            <n-input
              placeholder=""
              :allow-input="inputAllowOnlyNumber"
              :value="formValues.contractId"
              @update:value="emit('update:contractId', $event)"
            />
          </n-form-item>
        </n-gi>

        <n-gi span="12 m:6">
          <n-form-item
            class="form-item"
            label="Владелец ID"
            path="ownerId"
          >
            <n-input
              placeholder=""
              :allow-input="inputAllowOnlyNumber"
              :value="formValues.clientId"
              @update:value="emit('update:clientId', $event)"
            />
          </n-form-item>
        </n-gi>

        <n-gi span="12 m:6">
          <n-form-item
            class="form-item"
            label="Статус"
            path="phone"
          >
            <BaseSelect
              placeholder=""
              :value="formValues.status"
              :options="statusOptions"
              @update:value="emit('update:status', $event)"
            />
          </n-form-item>
        </n-gi>

        <n-gi span="12 m:6">
          <BaseInputGroup title="Совпадение">
            <n-form-item
              path="similarityFrom"
              :show-label="false"
            >
              <n-input
                placeholder="От"
                :allow-input="inputAllowOnlyNumber"
                :value="formValues.similarityFrom"
                @update:value="emit('update:similarityFrom', $event)"
              />
            </n-form-item>

            <n-form-item
              path="similarityTo"
              :show-label="false"
            >
              <n-input
                placeholder="До"
                :allow-input="inputAllowOnlyNumber"
                :value="formValues.similarityTo"
                @update:value="emit('update:similarityTo', $event)"
              />
            </n-form-item>
          </BaseInputGroup>
        </n-gi>

        <n-gi span="12 m:6">
          <n-button
            attr-type="submit"
            type="primary"
            block
          >
            Применить
          </n-button>
        </n-gi>
      </n-grid>
    </BaseForm>
  </BaseModal>
</template>
