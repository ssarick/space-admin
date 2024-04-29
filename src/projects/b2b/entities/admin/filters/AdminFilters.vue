<script lang="ts" setup>
import { NSpace, NSpin } from 'naive-ui';
import BaseInput from '@/shared/UI/base-input';
import BaseSelect from '@/shared/UI/base-select';
import { fieldLimits } from '@/shared/utils/constants/field-limits';
import { inputAllowLogin } from '@/shared/utils/input-allow-rules';
import {
  IAdminFiltersEmits,
  IAdminFiltersProps
} from './admin-filters.types';
import useAdminFilters from './useAdminFilters';

const props = defineProps<IAdminFiltersProps>();
const emit = defineEmits<IAdminFiltersEmits>();

const {
  fio,
  phone,
  login,
  roleId,
  phoneFieldMask
} = useAdminFilters(props, emit);
</script>

<template>
  <n-space>
    <BaseInput
      v-model="fio"
      clearable
      :placeholder="$t('Full-name-short')"
      :maxlength="fieldLimits.fio.maxLength"
    />

    <BaseInput
      v-model="login"
      clearable
      :placeholder="$t('Login')"
      :maxlength="fieldLimits.login.maxLength"
      :allow-input="inputAllowLogin"
    />

    <BaseInput
      v-model="phone"
      v-mask:[phoneFieldMask]
      clearable
      :placeholder="$t('Phone')"
    />

    <n-spin
      v-if="props.rolesLoading"
      class="pt-1"
      :size="20"
    />

    <BaseSelect
      v-else
      v-model:value="roleId"
      value-field="id"
      label-field="name"
      class="min-field-width"
      :options="props.roles"
    />
  </n-space>
</template>
