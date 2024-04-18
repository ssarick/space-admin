<script lang="ts" setup>
import { NRadio, NSpace } from 'naive-ui';
import BaseIcon from '@/shared/UI/base-icon';
import PageToolbar from '@/shared/UI/page-toolbar';
import { BindedFaceStatus } from '../../shared/types/binded-face.types';
import BindedFaceAddModal from '../../entities/binded-face/add-modal';
import BindedFaceTable from '../../entities/binded-face/table';
import useBindedFaceList from './useBindedFaceList';

const {
  formData,
  formRef,
  tableRef,
  bindedFaceList,
  showAddModal,
  checkedRadioBtn,
  isLoadingBindedTable,
  isLoadingCreateBtn,
  handleShowModal,
  handleChange,
  onSubmit,
  fetchBindedFaceList
} = useBindedFaceList();
</script>

<template>
  <PageToolbar
    title="Список связанных лиц"
    is-show-slot
  >
    <n-space
      justify="space-between"
      align="center"
      class="mb-4"
    >
      <n-radio
        name="ACTIVE"
        :value="BindedFaceStatus.ACTIVE"
        :checked="checkedRadioBtn === BindedFaceStatus.ACTIVE"
        @change="handleChange"
      > Активные </n-radio>
      <n-radio
        name="INACTIVE"
        :value="BindedFaceStatus.INACTIVE"
        :checked="checkedRadioBtn === BindedFaceStatus.INACTIVE"
        @change="handleChange"
      > Неактивные </n-radio>

      <n-button
        type="primary"
        class="px-6"
        @click="handleShowModal"
      >
        <template #icon>
          <BaseIcon
            icon="add"
            size="24"
          />
        </template>

        {{ $t('Add') }}
      </n-button>
    </n-space>
  </PageToolbar>

  <BindedFaceTable
    ref="tableRef"
    :data="bindedFaceList"
    :loading="isLoadingBindedTable"
    @update="fetchBindedFaceList"
  />

  <BindedFaceAddModal
    v-model="showAddModal"
    v-model:contragent-id="formData.contragentId"
    v-model:inn="formData.inn"
    v-model:pinfl="formData.pinfl"
    ref="formRef"
    :model="formData"
    :loading="isLoadingCreateBtn"
    @submit="onSubmit"
  />
</template>
