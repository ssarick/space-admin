import { Ref, watch } from 'vue';
import { mapClientUserToOrganization } from '@/projects/b2b/shared/mappers/client-user-to-organization';
import { IClientUser, IUserOrganization } from '@/projects/b2b/shared/types/user.types';

export default function useClientUserOrganizationSync(
  getClientUser: () => IClientUser | undefined | null,
  organization: Ref<IUserOrganization | null>
) {
  watch(
    getClientUser,
    () => {
      const clientUser = getClientUser();

      if (clientUser?.clientCode) {
        organization.value = mapClientUserToOrganization(
          clientUser
        );
      }
    },
    {
      immediate: true
    }
  );
}
