import { onBeforeUnmount, onMounted, ref, useAttrs, watch } from 'vue';
import { useDebounceFn } from '@vueuse/core';
import { NSelect } from 'naive-ui';
import { BaseSelectAttrs, BaseSelectEmits, BaseSelectProps, ModelValueType } from './base-select.types';
import useClasses from './composables/useClasses';
import useFetch from './composables/useFetch';
import useRenderOption from './composables/useRenderOption';

const controls = [
  'Backspace',
  'Delete',
  'ArrowLeft',
  'ArrowRight',
  'MetaRight',
  'MetaLeft',
  'ControlLeft',
  'ControlRight',
  'AltLeft',
  'AltRight'
];

export default function useBaseSelect(props: BaseSelectProps, emit: BaseSelectEmits) {
  const attrs: BaseSelectAttrs = useAttrs();
  const selectRef = ref<InstanceType<typeof NSelect> | null>(null);
  let selectInput: HTMLInputElement | null = null;
  const searchString = ref<string | null>(props.searchString || null);
  const needClick = ref(true);
  const preventKey = ref('');
  const internalValue = ref<ModelValueType>(props.modelValue!);

  const valueField = attrs['value-field'] || 'value';

  const hasDefaultOption =
    props.defaultOption?.[valueField as keyof typeof props.defaultOption];

  const optionRenderer = useRenderOption();

  const classesControls = useClasses(
    props, searchString
  );

  const {
    loading,
    remote,
    optionsData,
    loadData,
    handleScroll,
    clear
  } = useFetch(props, searchString);

  if (![ null, undefined ].includes(hasDefaultOption)) {
    optionsData.value = [ props.defaultOption! ];
  }

  const onFocus = () => {
    const isDisabled = (
      selectRef.value?.triggerRef as {} as { disabled: boolean }
    )?.disabled;

    if (!isDisabled) {
      needClick.value && selectRef.value?.handleTriggerClick();
      loadData();
    }
  };

  const onBlur = () => {};

  const onShow = (isShow: boolean) => {
    if (!isShow) return;

    setTimeout(() => {
      selectInput && (selectInput.value = searchString.value || '');
    });
  };

  function onUpdate(v: string | null) {
    const value = props.modelModifiers?.uppercase && v
      ? v.toUpperCase() : v;
    const selectedObj =
      optionsData.value?.find(
        f => v === (f as object)[valueField]
      ) || {};

    emit('update:modelValue', value);
    emit('select', selectedObj);

    internalValue.value = value;
    searchString.value = null;
  }

  const onSearch = useDebounceFn((query: string) => {
    if (!remote.value) return;

    searchString.value = query;
    clear();
    loadData();
  }, 300);

  const onClear = () => {
    clear();
    searchString.value = null;
    selectRef.value?.blur();
  };

  const onHandleMouseDown = () => {
    needClick.value = false;
    setTimeout(() => {
      needClick.value = true;
    });
  };

  const onKeydown = (e: KeyboardEvent) => {
    setTimeout(() => {
      const value = selectInput?.value?.trim() || '';
      emit('input', props.modelModifiers?.uppercase ? value.toUpperCase() : value);
    });

    const maxlengthIsNotValid =
      props?.maxlength && (selectInput?.value?.length || 1) >= props?.maxlength;

    if (maxlengthIsNotValid) {
      e.preventDefault();
    }

    if (!props?.allowInput) return;

    if (
      controls.includes(preventKey.value) &&
      (e.key === 'a' || e.key === 'r')
    ) {
      return;
    }

    preventKey.value = e.code;

    if (controls.includes(e.code)) return;

    if (!props.allowInput(e.key)) {
      e.preventDefault();
    }
  };

  const onKeyup = () => {
    preventKey.value = '';
  };

  watch(
    () => props.modelValue,
    (v) => {
      if (!attrs.disabled && v !== internalValue.value) {
        clear();
      }
    }
  );

  const destroyOptionsWatcher = watch(
    () => props.options,
    (v) => {
      if (v?.length) {
        optionsData.value = v;

        props.optionsIsReactive === false
          && destroyOptionsWatcher();
      }
    }
  );

  onMounted(() => {
    selectInput = (selectRef.value?.$el as HTMLElement)?.querySelector(
      '.n-base-selection-input'
    );
    selectRef.value?.$el?.addEventListener('mousedown', onHandleMouseDown);
    selectInput?.addEventListener('keydown', onKeydown);
    selectInput?.addEventListener('keyup', onKeyup);

    if (optionsData.value.length) {
      searchString.value = null;
    }

    if (
      props.request &&
      props.autoRequest &&
      !optionsData.value.length &&
      props.modelValue !== null &&
      props.modelValue !== undefined
    ) {
      loadData(true);
    }
  });

  onBeforeUnmount(() => {
    selectRef.value?.$el?.removeEventListener('mousedown', onHandleMouseDown);
    selectInput?.removeEventListener('keydown', onKeydown);
    selectInput?.removeEventListener('keyup', onKeyup);
  });

  return {
    ...optionRenderer,
    ...classesControls,
    onShow,
    onUpdate,
    onFocus,
    onBlur,
    selectRef,
    handleScroll,
    onClear,
    onSearch,
    loading,
    remote,
    optionsData,
    searchString,
    clear
  };
}
