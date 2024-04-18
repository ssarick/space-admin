import { onMounted, ref, watch } from 'vue';
import { ApiDictionary } from '@/projects/b2b/shared/api';
import { IUserAction, IUserPermission } from '@/projects/b2b/shared/types/user.types';
import { IUserAccessPermissionsListProps } from './user-access-permissions-list.types';

export default function useUserAccessPermissionsList(
  props: IUserAccessPermissionsListProps
) {
  interface ICheckboxUserAction extends IUserAction {
    checked: boolean;
  }
  type TCheckboxIUserPermission = Omit<IUserPermission, 'actions'> & {
    allChecked: boolean;
    indeterminate: boolean;
    actions: ICheckboxUserAction[];
  };

  const actionsModulesList = ref<TCheckboxIUserPermission[]>([]);
  let permissionsHashMap = {};
  let allPermissions: IUserPermission[] = [];

  async function initUserActionsList() {
    permissionsHashMap = {};

    props.relatedUserPermissions.forEach((permission) => {
      const actions = permission.actions.map((action) => action.key);
      permissionsHashMap[permission.key.toUpperCase()] = actions;
    });
    actionsModulesList.value = allPermissions.map((f) => {
      const relatedActions = permissionsHashMap[f.key];
      let actions: ICheckboxUserAction[] = [];

      actions = f.actions.map((mAction) => {
        return {
          ...mAction,
          checked: !!relatedActions?.includes(mAction.key.toUpperCase())
        };
      });

      const allChecked = actions?.every((eAction) => eAction.checked);
      const indeterminate =
        !allChecked && actions?.some((sAction) => sAction.checked);

      return {
        allChecked,
        indeterminate,
        ...f,
        actions
      };
    });
  }

  function onClickToggleAllModuleActions(module: TCheckboxIUserPermission) {
    const moduleObj = actionsModulesList.value.find(
      (f) => f.key === module.key
    );
    if (!moduleObj) return;
    moduleObj.indeterminate = false;
    moduleObj.actions?.forEach((v) => {
      v.checked = module.allChecked;
    });
  }

  function onClickModuleAction(
    action: ICheckboxUserAction,
    module: TCheckboxIUserPermission
  ) {
    const moduleObj = actionsModulesList.value.find(
      (fModule) => fModule.key === module.key
    );
    if (!moduleObj) return;

    const KEY_VIEW = 'VIEW';

    if (action.key === KEY_VIEW && !action.checked) {
      moduleObj?.actions?.forEach((fAction) => {
        fAction.checked = false;
      });
    } else {
      const actionView = moduleObj?.actions?.find(
        (fAction) => fAction.key === KEY_VIEW
      );
      actionView && (actionView.checked = true);
    }

    const everyCheckedIsTrue = moduleObj?.actions?.every(
      (sAction) => sAction.checked
    );
    const everyCheckedIsFalse = moduleObj?.actions?.every(
      (sAction) => !sAction.checked
    );

    moduleObj.allChecked = everyCheckedIsTrue;

    if (everyCheckedIsFalse || everyCheckedIsTrue)
      return (moduleObj.indeterminate = false);

    const someCheckedIsTrue = moduleObj?.actions?.some(
      (sAction) => sAction.checked
    );

    moduleObj.indeterminate = someCheckedIsTrue;
  }

  function selectAll() {
    actionsModulesList.value.forEach((fModule) => {
      fModule.allChecked = true;
      fModule.indeterminate = false;
      fModule.actions.forEach((fAction) => {
        fAction.checked = true;
      });
    });
  }

  function removeAll() {
    actionsModulesList.value.forEach((fModule) => {
      fModule.allChecked = false;
      fModule.indeterminate = false;
      fModule.actions.forEach((fAction) => {
        fAction.checked = false;
      });
    });
  }

  async function fetchUserActionModules() {
    const { items } = await ApiDictionary.fetchUserActionModules();
    allPermissions = items;
  }

  watch(
    () => props.relatedUserPermissions,
    () => {
      initUserActionsList();
    }
  );

  onMounted(async () => {
    await fetchUserActionModules();
    initUserActionsList();
  });

  return {
    selectAll,
    removeAll,
    actionsModulesList,
    initUserActionsList,
    onClickToggleAllModuleActions,
    onClickModuleAction
  };
}
