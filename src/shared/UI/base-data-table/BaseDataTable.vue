<script lang="ts" setup>
import {
  computed,
  h,
  HTMLAttributes,
  onBeforeUnmount,
  onMounted,
  reactive,
  ref,
  watch
} from 'vue';
import { useDebounce } from '@vueuse/shared';
import { NDataTable } from 'naive-ui';
import { RowData } from 'naive-ui/es/data-table/src/interface';
import { globalConfig } from '@/shared/config/global-config';
import { IDataTablePagination } from '@/shared/types/data-table.types';
import BaseIcon from '@/shared/UI/base-icon';
import NumberUtils from '@/shared/utils/number';
import {
  IDataTableEmit,
  IDataTableProps
} from './base-data-table.types';
import BaseDataTablePagination from './components/pagination/BaseDataTablePagination.vue';
import useDataTableScrolling from './composables/useDataTableScrolling';

const props = withDefaults(
  defineProps<IDataTableProps>(),
  {
    heightMinus: 400,
    singleLine: true
  }
) as IDataTableProps<RowData>;

const emit = defineEmits<IDataTableEmit>();
const searchFilterValue = ref<string>('');
const showPagination = ref(false);

const {
  isTableScrolling,
  handleScroll
} = useDataTableScrolling();

const debouncedSearchFilterValue = useDebounce(
  searchFilterValue, globalConfig.debounceInMS
);

const pageSizesList = props.pageSizes
  || [ globalConfig.pageSize, 25, 50 ];

const pageSizes = pageSizesList.map((v) => {
  return {
    label: v.toString(),
    value: v
  };
});

const renderExpandIcon = computed(
  () => props.hideExpandIcon ? (() => null) : undefined
);

const rowProps = (row: object, index: number) => {
  const rowProps: HTMLAttributes = {
  };

  const declaredProps: HTMLAttributes | undefined =
    props.rowProps && props.rowProps(row, index);

  props.rowProps && Object.assign(rowProps, declaredProps);

  if (props.rowClick) {
    rowProps.onClick = (event: PointerEvent | MouseEvent) => {
      declaredProps?.onClick && declaredProps.onClick(event);

      props.rowClick && props.rowClick(row, index, event as PointerEvent);
    };
  }

  return rowProps;
};

const pagination: IDataTablePagination = reactive({
  page: 1,
  pageSize: props.pageSize ?? globalConfig.pageSize,
  showSizePicker: true,
  pageSizes,
  pageCount: 0,
  size: 'large',
  prev: () => h(BaseIcon, {
    icon: 'right',
    size: 24,
    style: {
      transform: 'rotate(-180deg)',
      marginRight: '4px'
    }
  }),
  next: () => h(BaseIcon, {
    icon: 'right',
    size: 24,
    style: {
      marginLeft: '4px'
    }
  }),
  onUpdatePage: (page: number) => {
    pagination.page = page;

    onUpdate();
  },
  onUpdatePageSize: (pageSize: number) => {
    pagination.pageSize = pageSize;
    pagination.page = 1;

    onUpdate();
  },
  onReset() {
    pagination.page = 1;

    onUpdate();
  }
});

const paginationVisibilityResult = computed<boolean>(
  () => !!(!props.hidePagination
    && !props.hideTable
    && showPagination.value
    && pagination)
);

const rowKey = (row: RowData) => props.rowKey?.(row)
  || NumberUtils.uniqueString;

function onUpdate() {
  emit('update');
}

function onFilterInput() {
  emit('update', searchFilterValue.value);
}

const windowHeight = ref(window.innerHeight);
const minHeight = 300;

const maxHeight = computed(() => {
  if (props.maxHeight) return props.maxHeight;

  const heightMinus = +(props.heightMinus || 0);
  const newHeight = windowHeight.value - heightMinus;

  return newHeight < minHeight ? minHeight : newHeight;
});

function onResize() {
  windowHeight.value = window.innerHeight;
}

watch(
  () => props.data,
  () => {
    if (props.data?.length) {
      showPagination.value = true;
    } else if (pagination.page > 1) {
      pagination.page--;
      onUpdate();
    }
  },
  {
    immediate: true
  }
);

watch([ debouncedSearchFilterValue ], onFilterInput);

onMounted(() => window.addEventListener('resize', onResize));
onBeforeUnmount(() => window.removeEventListener('resize', onResize));

defineExpose({
  pagination
});
</script>

<template>
  <div v-if="props.hasFilteringInput">
    <n-input
      v-model:value="searchFilterValue"
      type="text"
      size="large"
      :placeholder="$t('Search')"
      :loading="false"
      :class="[
        'filled',
        'bordered',
        {
          'no-bottom-border-radius': !props.hideTable
        }
      ]"
      v-bind="props.searchInputProps"
    >
      <template #prefix>
        <BaseIcon
          icon="search"
          size="28"
        />
      </template>
    </n-input>
  </div>

  <n-data-table
    v-show="!props.hideTable"
    v-bind="$attrs"
    ref="tableRef"
    remote
    :columns="props.columns"
    :data="data"
    :single-line="singleLine"
    :row-key="rowKey"
    :row-props="rowProps"
    :max-height="maxHeight"
    :size="size"
    :loading="loading"
    :render-expand-icon="renderExpandIcon"
    :class="[
      'base-data-table',
      {
        'size-large': size === 'large',
        'row-clickable': !!props.rowClick,
        'with-top-input': props.hasFilteringInput,
        'hide-expand-icon': props.hideExpandIcon,
        scrolling: isTableScrolling
      }
    ]"
    @scroll="handleScroll"
    @update:page="onUpdate"
    @update:page-size="onUpdate"
  />

  <BaseDataTablePagination
    v-if="paginationVisibilityResult"
    class="mt-2"
    :pagination="pagination"
  />
</template>

<style lang='scss'>
.n-data-table-base-table-body.n-scrollbar .v-vl {
  overscroll-behavior: contain;
}

.row-clickable tbody .n-data-table-tr {
  cursor: pointer;
}
</style>
