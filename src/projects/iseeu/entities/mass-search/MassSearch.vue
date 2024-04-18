<script lang="ts" setup>
import { NButton, NSpace } from 'naive-ui';
import BaseInput from '@/shared/UI/base-input';
import BaseModal from '@/shared/UI/base-modal';
import BaseSelect from '@/shared/UI/base-select';
import { MassSearchEmits, MassSearchProps } from './mass-search.types';
import useMassSearch from './useMassSearch';

const props = defineProps<MassSearchProps>();
const emit = defineEmits<MassSearchEmits>();

const {
  modelValue
} = useMassSearch(props, emit);
</script>

<template>
  <BaseModal
    v-model="modelValue"
    title="Массовый поиск"
    class="mass-search-modal"
  >
    <n-space
      size="large"
      vertical
    >
      <BaseInput
        type="textarea"
        placeholder="Введите данные"
        :rows="8"
      />
      <BaseSelect placeholder="Обрезать ФИО" />
      <n-button type="primary">Применить</n-button>
    </n-space>
  </BaseModal>
</template>

<style lang="scss" scoped>
.mass-search-modal {
  width: 720px;
}

.n-select {
  max-width: 200px;
}

:deep(.n-button) {
  width: 100%;
}
</style>
