<script lang="ts" setup>
import { NFormItem, NSpace } from 'naive-ui';
import BaseForm from '@/shared/UI/base-form';
import BaseInput from '@/shared/UI/base-input';
import {
  IIndividualSearchFiltersEmits,
  IIndividualSearchFiltersProps } from './individual-search-filters.types';
import useIndividualSearchFilters from './useIndividualSearchFilters';

const props = defineProps<IIndividualSearchFiltersProps>();
const emit = defineEmits<IIndividualSearchFiltersEmits>();

const {
  pinfl,
  birthDate,
  cutFio,
  name,
  rules,
  onOpenMassSearch
} = useIndividualSearchFilters(props, emit);
</script>

<template>
  <BaseForm
    ref="formRef"
    :model="props.model"
    :rules="rules"
    :show-label="false"
  >
    <n-space>
      <n-form-item
        path="name"
      >
        <BaseInput
          v-model:value="name"
          placeholder="Гребенюк Владимир Дмитриевич"
          block
        />
      </n-form-item>

      <n-form-item
        path="birthDate"
      >
        <BaseInput
          v-model:value="birthDate"
          placeholder="Год рождения"
          block
        />
      </n-form-item>

      <n-form-item
        path="pinfl"
      >
        <BaseInput
          v-model:value="pinfl"
          placeholder="ПИНФЛ"
          block
        />
      </n-form-item>

      <n-form-item
        path="cutFio"
      >
        <BaseInput
          v-model:value="cutFio"
          placeholder="Обрезать ФИО"
          block
        />
      </n-form-item>

      <n-button
        type="tertiary"
        @click="onOpenMassSearch"
      >
        Массовый поиск
      </n-button>

      <n-button
        type="primary"
      >
        Поиск
      </n-button>
    </n-space>
  </BaseForm>
</template>
