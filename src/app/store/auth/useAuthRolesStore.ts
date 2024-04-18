import { defineStore } from 'pinia';
import { AuthRole } from '@/shared/types/auth.types';
import { useAuthCredentialsStore } from './useAuthCredentialsStore';

export const useAuthRolesStore = defineStore(
  'auth-roles',
  () => {
    const authCredentials = useAuthCredentialsStore();

    const hasRole = (
      role: AuthRole
    ): boolean => !!authCredentials
      .accessTokenPayload
      ?.realm_access
      ?.roles
      ?.includes(role);

    const hasSomeRole = (
      roles: AuthRole[]
    ): boolean => roles.some(hasRole);

    return {
      hasRole,
      hasSomeRole
    };
  }
);
