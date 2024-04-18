<script setup lang="ts">
import { NSpace } from 'naive-ui';
import BaseInput from '@/shared/UI/base-input';
import PageTitle from '@/shared/UI/page-title';
import { fieldLimits } from '@/shared/utils/constants/field-limits';
import { inputAllowLatinicAndNumber, inputAllowLogin, inputAllowOnlyNumber } from '@/shared/utils/input-allow-rules';
import UsersTable from '@/projects/b2b/features/users-table/UsersTable.vue';
import useUsers from './useUsers';

const {
  searchForm,
  isSearching,
  onClearAndSearchUsers,
  tableRef,
  phoneFieldMask
} = useUsers();
</script>

<template>
  <main class="users-page">
    <header class="header">
      <PageTitle :title="$t('Users')" />
    </header>

    <div class="search-block">
      <n-space
        :size="[ 24, 16 ]"
      >
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

        <BaseInput
          v-model="searchForm.userPidSN"
          clearable
          uppercase
          :placeholder="$t('Document-series')"
          :maxlength="fieldLimits.pidSnOther.maxLength"
          :allow-input="inputAllowLatinicAndNumber"
        />

        <BaseInput
          v-model="searchForm.userPidNumber"
          clearable
          :placeholder="$t('Document-number')"
          :allow-input="inputAllowOnlyNumber"
          :maxlength="fieldLimits.pidNum.maxLength"
        />

        <n-button
          v-if="isSearching"
          ghost
          @click="onClearAndSearchUsers"
        >
          {{ $t('Clear') }}
        </n-button>
      </n-space>
    </div>

    <UsersTable
      ref="tableRef"
      class="mt-4"
      :current="false"
      :filters="searchForm"
    />
  </main>
</template>

<style scoped lang="scss">
.users-page {
  .search-block {
    margin-top: 20px;
    .title {
      font-size: 16px;
      margin-bottom: 15px;
    }
    .footer {
      display: flex;
    }
  }
}
</style>
