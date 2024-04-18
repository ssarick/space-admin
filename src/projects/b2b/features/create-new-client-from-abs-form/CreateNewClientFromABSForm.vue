<script setup lang="ts">
import { useRouter } from 'vue-router';
import { NCheckbox, NSpace } from 'naive-ui';
import BaseIcon from '@/shared/UI/base-icon';
import BaseInput from '@/shared/UI/base-input';
import BaseLoading from '@/shared/UI/base-loading';
import PageTitle from '@/shared/UI/page-title';
import { fieldLimits } from '@/shared/utils/constants/field-limits';
import { inputAllowOnlyNumber } from '@/shared/utils/input-allow-rules';
import { ClientDetailCard } from '@/projects/b2b/entities/client-detail';
import useCreateNewClientFromABSForm from './useCreateNewClientFromABSForm';

const router = useRouter();

const {
  searchValue,
  onSearchClient,
  isLoading,
  clientData,
  tryToCreateClient,
  isAddUserAfterCreation,
  searchButtonDisabled
} = useCreateNewClientFromABSForm();
</script>

<template>
  <div class="client-create-form">
    <PageTitle
      :title="$t('Creating-a-new-client')"
    />

    <NSpace>
      <BaseInput
        v-model:value="searchValue"
        clearable
        :placeholder="$t('Client-code')"
        :allow-input="inputAllowOnlyNumber"
        :maxlength="fieldLimits.clientCode.maxLength"
      />

      <n-button
        type="primary"
        ghost
        :disabled="searchButtonDisabled"
        @click="onSearchClient"
      >
        {{ $t('Get-data-from-ABS') }}
      </n-button>
    </NSpace>

    <BaseLoading v-if="isLoading" />

    <template v-else>
      <ClientDetailCard :data="clientData" />

      <n-checkbox
        v-model:checked="isAddUserAfterCreation"
        class="mt-3"
        :label="$t('Add-a-director-after-creating-a-client')"
      />

      <NSpace
        class="mt-3"
        justify="end"
      >
        <n-button
          type="info"
          icon-placement="right"
          ghost
          :disabled="!clientData?.clientCode"
          @click="tryToCreateClient"
        >
          <template
            v-if="isAddUserAfterCreation"
            #icon
          >
            <BaseIcon icon="arrow-right" />
          </template>

          {{ $t(isAddUserAfterCreation ? 'Next' : 'Complete') }}
        </n-button>

        <n-button
          type="default"
          ghost
          @click="router.push({ name: 'clients' })"
        >
          {{ $t('Cancel') }}
        </n-button>
      </NSpace>
    </template>
  </div>
</template>
