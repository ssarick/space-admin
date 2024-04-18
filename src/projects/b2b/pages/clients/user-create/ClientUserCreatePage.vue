<script setup lang="ts">
import { NFormItem, NSpace } from 'naive-ui';
import BaseForm from '@/shared/UI/base-form';
import BaseInput from '@/shared/UI/base-input';
import BaseSelect from '@/shared/UI/base-select';
import PageTitle from '@/shared/UI/page-title';
import { fieldLimits } from '@/shared/utils/constants/field-limits';
import { inputAllowEmail, inputAllowLatinicAndNumber, inputAllowLogin, inputAllowOnlyNumber } from '@/shared/utils/input-allow-rules';
import renderIcon from '@/shared/utils/render-icon';
import { ApiDictionary } from '@/projects/b2b/shared/api';
import useClientUserCreate from './useClientUserCreate';

const {
  form,
  onNextStep,
  onCancel,
  formRef,
  formRules,
  phoneFieldMask
} = useClientUserCreate();
</script>

<template>
  <div class="client-user-create-page">
    <PageTitle
      :title="$t('Users-personal-information')"
    />

    <div style="max-width: 700px">
      <BaseForm
        ref="formRef"
        :rules="formRules"
        :model="form"
      >
        <n-form-item
          path="fio"
          :label="$t('Full-name-short')"
        >
          <BaseInput
            v-model="form.fio"
            :maxlength="fieldLimits.fio.maxLength"
          />
        </n-form-item>

        <n-form-item
          path="pidTypeId"
          class="mt-1"
          :label="$t('Document-type')"
        >
          <BaseSelect
            v-model:value="form.pidTypeId"
            label-field="name"
            value-field="id"
            :request="ApiDictionary.fetchDocumentTypes"
            :placeholder="$t('Select-document-type')"
          />
        </n-form-item>

        <n-form-item
          path="pidSn"
          class="mt-1"
          :label="$t('Document-series')"
        >
          <BaseInput
            v-model="form.pidSn"
            uppercase
            :allow-input="inputAllowLatinicAndNumber"
            :maxlength="fieldLimits.pidSnOther.maxLength"
          />
        </n-form-item>

        <n-form-item
          path="pidNum"
          class="mt-1"
          :label="$t('Document-number')"
        >
          <BaseInput
            v-model="form.pidNum"
            :allow-input="inputAllowOnlyNumber"
            :maxlength="fieldLimits.pidNum.maxLength"
          />
        </n-form-item>

        <n-form-item
          path="phone"
          class="mt-1"
          :label="$t('Phone')"
        >
          <BaseInput
            v-model="form.phone"
            v-mask:[phoneFieldMask]
          />
        </n-form-item>

        <n-form-item
          path="email"
          class="mt-1"
          :label="$t('E-mail')"
        >
          <BaseInput
            v-model="form.email"
            :maxlength="fieldLimits.email.maxLength"
            :allow-input="inputAllowEmail"
          />
        </n-form-item>

        <n-form-item
          path="phrase"
          class="mt-1"
          :label="$t('Code-word')"
        >
          <BaseInput
            v-model="form.phrase"
            uppercase
            :maxlength="fieldLimits.phrase.maxLength"
          />
        </n-form-item>

        <n-form-item
          path="login"
          class="mt-1"
          :label="$t('Login-for-DBO-YUL')"
        >
          <BaseInput
            v-model="form.login"
            uppercase
            :maxlength="fieldLimits.login.maxLength"
            :allow-input="inputAllowLogin"
          />
        </n-form-item>
      </BaseForm>

      <NSpace
        justify="end"
        class="mt-1"
      >
        <n-button
          type="info"
          class="ml-auto mr-1"
          icon-placement="right"
          ghost
          :render-icon="renderIcon('arrow-right')"
          @click="onNextStep"
        >
          {{ $t('Next') }}
        </n-button>

        <n-button
          class="ml-auto mr-1"
          ghost
          @click="onCancel"
        >
          {{ $t('Cancel') }}
        </n-button>
      </NSpace>
    </div>
  </div>
</template>
