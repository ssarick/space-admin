<script setup lang="ts">
import { NGrid } from 'naive-ui';
import type {
  SendMessageTemplatesListEmits,
  SendMessageTemplatesListProps
} from './send-message-templates.types';
import useSendMessageTemplatesList
  from './useSendMessageTemplatesList';

const props = defineProps<SendMessageTemplatesListProps>();
const emit = defineEmits<SendMessageTemplatesListEmits>();

const {
  handleClickOnTemplate
} = useSendMessageTemplatesList(props, emit);
</script>

<template>
  <n-grid
    cols="12"
    responsive="screen"
    item-responsive
  >
    <n-gi span="12">
      <div
        v-if="selectedTemplate?.code"
        class="template-card active"
        @click.prevent="handleClickOnTemplate"
      >
        <n-text class="item-title">{{ $t('template-code') }}: {{ selectedTemplate.code }}</n-text>
        <n-text class="item-title">{{ $t('template-description') }}: {{ selectedTemplate.description }}</n-text>

        <n-text class="item-title mt-3"> {{ $t('template-description') }} - RU</n-text>
        <n-text class="item-text">{{ selectedTemplate.textRu }}</n-text>

        <n-text class="item-title mt-3"> {{ $t('template-description') }} - UZ</n-text>
        <n-text class="item-text">{{ selectedTemplate.textUz }}</n-text>

      </div>

      <div
        v-else
        class="template-card"
        @click.prevent="handleClickOnTemplate"
      >
        <n-empty :description="$t('select-template')" />
      </div>
    </n-gi>
  </n-grid>
</template>

<style scoped lang="scss">
.template-card {
  width: 100%;
  min-height: 160px;
  height: 100%;
  border-radius: 12px;
  border: 2px solid map-get( $color-common, 'gray-lighter');
  padding: 12px 16px;
  cursor: pointer;
  transition: 300ms ease-in-out;
  display: flex;
  flex-direction: column;

  &--child {
    height: 105px;
  }

  &:hover {
    border: 2px solid map-get($color-primary, 'main');
  }
}

.active {
  background: map-get( $color-primary, 'main_15');
  border: 2px solid map-get($color-primary, 'main');

}

.item-wrapper {
  max-width: 170px;
  display: flex;
  flex-direction: column;
}

.item-title {
  font-size: 14px;
  font-weight: 600;
  line-height: 20px;
  text-align: left;
  color: map-get($color-common, 'black');
  padding-bottom: 4px;
}

.item-text {
  font-size: 14px;
  font-weight: 400;
  line-height: 16px;
  text-align: left;
  color: map-get($color-common, 'black');
}

.text-ellipsis {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

.template-button {
  min-height: 105px;
  width: 100%;
  height: 100%;
}

.n-empty {
  width: 100%;
  margin: auto;
}
</style>
