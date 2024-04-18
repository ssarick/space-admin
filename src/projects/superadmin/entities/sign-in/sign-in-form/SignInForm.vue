<script setup lang="ts">
import { NCheckbox, NFormItem } from 'naive-ui';
import BaseForm from '@/shared/UI/base-form';
import BaseInput from '@/shared/UI/base-input';
import { inputAllowAuthCredential } from '@/shared/utils/input-allow-rules';
import { ISignInFormEmit, ISignInFormProps } from './sign-in-form.types';
import useSignInForm from './useSignInForm';

const props = defineProps<ISignInFormProps>();
const emit = defineEmits<ISignInFormEmit>();

const {
  validateForm,
  restoreFormValidation,
  formRules,
  formRef,
  username,
  password,
  rememberMe
} = useSignInForm(props, emit);

defineExpose({
  validate: validateForm,
  restoreValidation: restoreFormValidation
});
</script>

<template>
  <BaseForm
    ref="formRef"
    class="sign-in-form"
    no-prevent-route
    :rules="formRules"
    :model="props.model"
  >
    <n-text
      tag="h2"
      class="mb-4"
    >
      Авторизация
    </n-text>

    <n-form-item
      path="username"
      :label="$t('Login')"
    >
      <BaseInput
        v-model="username"
        placeholder=""
        :disabled="props.loading"
        :allow-input="inputAllowAuthCredential"
      />
    </n-form-item>

    <n-form-item
      class="mt-1"
      path="password"
      :label="$t('Password')"
    >
      <BaseInput
        v-model="password"
        placeholder=""
        type="password"
        show-password-on="click"
        :allow-input="inputAllowAuthCredential"
        :disabled="props.loading"
      />
    </n-form-item>

    <n-checkbox
      v-model:checked="rememberMe"
      class="mt-1"
    >
      {{ $t('Remember-me') }}
    </n-checkbox>

    <n-button
      attr-type="submit"
      class="sign-in-form__submit"
      type="primary"
      block
      :loading="props.loading"
    >
      {{ $t('Sign-in') }}
    </n-button>
  </BaseForm>
</template>

<style lang="scss" scoped>
.sign-in-form {
  width: 560px;
  max-width: 100%;
  padding: 60px 100px;
  border: 1px solid map-get($color-quaternary, 'main');
  border-radius: 12px;
  margin: 0 auto;

  &__submit {
    margin-top: 20px;
  }
}
</style>
