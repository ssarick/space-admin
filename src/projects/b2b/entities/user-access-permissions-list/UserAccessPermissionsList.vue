<script setup lang="ts">
import { NCard, NCheckbox, NCollapse, NCollapseItem, NSpace } from 'naive-ui';
import { IUserAccessPermissionsListProps } from './user-access-permissions-list.types';
import useUserAccessPermissionsList from './useUserAccessPermissionsList';

const props = defineProps<IUserAccessPermissionsListProps>();

const {
  selectAll,
  removeAll,
  actionsModulesList,
  initUserActionsList,
  onClickToggleAllModuleActions,
  onClickModuleAction
} = useUserAccessPermissionsList(props);

defineExpose({
  selectAll,
  removeAll,
  actionsModulesList,
  initUserActionsList
});
</script>

<template>
  <n-card
    size="small"
    class="user-access-permissions-list"
    :title="$t('Access-rights')"
  >
    <n-collapse
      v-for="moduleValue in actionsModulesList"
      :key="moduleValue.id"
      style="max-width: 550px"
    >
      <template #header-extra>
        <n-checkbox
          v-model:checked="moduleValue.allChecked"
          class="pl-2"
          :indeterminate="moduleValue.indeterminate"
          :disabled="props.disabled"
          @click.stop="onClickToggleAllModuleActions(moduleValue)"
        >
          {{ $t('Select-all') }}
        </n-checkbox>
      </template>
      <n-collapse-item
        class="pb-2"
        style="flex: 0"
        :title="moduleValue.name"
        :name="moduleValue.id"
      >
        <NSpace vertical>
          <n-checkbox
            v-for="action in moduleValue.actions"
            v-model:checked="action.checked"
            :key="action.id"
            class="pl-2"
            :disabled="props.disabled"
            @click.stop="onClickModuleAction(action, moduleValue)"
          >
            {{ action.name }}
          </n-checkbox>
        </NSpace>
      </n-collapse-item>
    </n-collapse>
  </n-card>
</template>
