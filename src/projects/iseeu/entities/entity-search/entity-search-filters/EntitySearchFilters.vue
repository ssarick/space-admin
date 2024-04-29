<script lang="ts" setup>
import { NFormItem, NSpace } from 'naive-ui';
import BaseForm from '@/shared/UI/base-form';
import BaseInput from '@/shared/UI/base-input';
import {
  IEntitySearchFiltersEmits,
  IEntitySearchFiltersProps
} from './entity-search-filters.types';
import useEntitySearchFilters from './useEntitySearchFilters';

const props = defineProps<IEntitySearchFiltersProps>();
const emit = defineEmits<IEntitySearchFiltersEmits>();

const {
  pinfl,
  name,
  openDate,
  rules,
  onOpenMassSearch
} = useEntitySearchFilters(props, emit);
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
          placeholder="Название организации"
          block
        />
      </n-form-item>

      <n-form-item
        path="pinfl"
      >
        <BaseInput
          v-model:value="pinfl"
          placeholder="ИНН / ПИНФЛ / Код клиента"
          block
        />
      </n-form-item>

      <n-form-item
        path="openDate"
      >
        <BaseInput
          v-model:value="openDate"
          placeholder="Дата открытия"
          block
        />
      </n-form-item>

      <n-button
        type="tertiary"
        @click="onOpenMassSearch"
      >
        Массовый поиск
      </n-button>

      <n-button>
        Поиск
      </n-button>
    </n-space>
  </BaseForm>
</template>
