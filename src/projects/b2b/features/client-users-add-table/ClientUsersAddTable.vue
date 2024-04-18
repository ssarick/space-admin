<script setup lang="ts">
import { NSpace } from 'naive-ui';
import BaseDataTable from '@/shared/UI/base-data-table';
import BaseIcon from '@/shared/UI/base-icon';
import BaseInput from '@/shared/UI/base-input';
import { fieldLimits } from '@/shared/utils/constants/field-limits';
import { inputAllowLogin } from '@/shared/utils/input-allow-rules';
import useClientUsersAddTable from './useClientUsersAddTable';

const {
  rowProps,
  columns,
  dataTable,
  isLoading,
  rowKey,
  tableRef,
  fetchUsers,
  isSearching,
  searchForm,
  onSearchUsers,
  onClearAndSearchUsers,
  phoneFieldMask
} = useClientUsersAddTable();
</script>

<template>
  <div>
    <NSpace class="my-3">
      <BaseInput
        v-model="searchForm.userName"
        clearable
        :placeholder="$t('Full-name-short')"
        :maxlength="fieldLimits.fio.maxLength"
      />

      <BaseInput
        v-model="searchForm.userLogin"
        clearable
        :placeholder="$t('Login')"
        :maxlength="fieldLimits.login.maxLength"
        :allow-input="inputAllowLogin"
      />

      <BaseInput
        v-model="searchForm.userPhone"
        v-mask:[phoneFieldMask]
        clearable
        :placeholder="$t('Phone')"
      />

      <n-button
        v-if="isSearching"
        ghost
        @click="onClearAndSearchUsers"
      >
        {{ $t('Clear') }}
      </n-button>

      <n-button
        v-else
        type="info"
        ghost
        @click="onSearchUsers"
      >
        <template #icon>
          <BaseIcon icon="search" />
        </template>

        {{ $t('Search') }}
      </n-button>
    </NSpace>
    <BaseDataTable
      ref="tableRef"
      :columns="columns"
      :loading="isLoading"
      :row-key="rowKey"
      :data="dataTable"
      :row-props="rowProps"
      @update="fetchUsers()"
    />
  </div>
</template>
