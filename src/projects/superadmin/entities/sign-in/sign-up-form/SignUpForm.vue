<script setup lang="ts">
import { NFormItem } from 'naive-ui';
import BaseForm from '@/shared/UI/base-form';
import BaseInput from '@/shared/UI/base-input';
import { inputAllowAuthCredential } from '@/shared/utils/input-allow-rules';
import { ISignUpFormEmit, ISignUpFormProps } from './sign-up-form.types';
import useSignUpForm from './useSignUpForm';

const props = defineProps<ISignUpFormProps>();
const emit = defineEmits<ISignUpFormEmit>();

const {
  validateForm,
  restoreFormValidation,
  goToSignIn,
  formRules,
  formRef,
  username,
  password
} = useSignUpForm(props, emit);

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
      tag="h4"
      class="mb-4 text-center"
    >
      {{ $t('Registration') }}
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

    <n-button
      attr-type="submit"
      class="sign-in-form__submit"
      type="primary"
      block
      :loading="props.loading"
    >
      {{ $t('Sign-up') }}
    </n-button>

    <n-button
      class="sign-in-form__submit"
      block
      :loading="props.loading"
      @click="goToSignIn"
    >
      {{ $t('Back') }}
    </n-button>
  </BaseForm>
</template>

<style lang="scss" scoped>
.sign-in-form {
  width: 500px;
  max-width: 100%;
  padding: 40px 80px;
  border: 1px solid map-get($color-quaternary, 'main');
  border-radius: 12px;
  margin: 0 auto;

  &__submit {
    margin-top: 20px;
  }
}
</style>
