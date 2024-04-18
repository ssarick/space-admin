<script setup lang="ts">
import { NTabPane, NTabs } from 'naive-ui';
import ClientUserTitle from '@/projects/b2b/entities/client-user-title/ClientUserTitle.vue';
import AccessPermissionsTabModule from '@/projects/b2b/features/access-permissions-tab-module/AccessPermissionsTabModule.vue';
import UserAccessAccounts from '@/projects/b2b/features/user-access-accounts/UserAccessAccounts.vue';
import {
  UserCertificateActions,
  UserCertificateManage
} from '@/projects/b2b/features/user-certificate';
import UserLogs from '@/projects/b2b/features/user-logs/UserLogs.vue';
import UserPersonalDataForm from '@/projects/b2b/features/user-personal-data-form/UserPersonalDataForm.vue';
import { ClientUserDataTabName } from '@/projects/b2b/shared/types/user.types';
import useUserDataTabsPage from './useUserDataTabsPage';

const {
  currentTab,
  clientUser,
  clientUserLoading,
  loadClientUser,
  businessCode,
  userId,
  hasFullAccess
} = useUserDataTabsPage();
</script>

<template>
  <main class="user-data-page">
    <ClientUserTitle
      :client-user="clientUser"
      :client-user-loading="clientUserLoading"
    />

    <n-tabs
      v-model:value="currentTab"
      type="card"
      size="medium"
      animated
    >
      <n-tab-pane
        :name="ClientUserDataTabName.PERSONAL_DATA"
        :tab="$t('Personal-data')"
      >
        <UserPersonalDataForm
          :is-edit="hasFullAccess"
          :user-data="clientUser"
          :loading="clientUserLoading"
          :business-code="businessCode"
          :load-user-data="loadClientUser"
        />
      </n-tab-pane>

      <n-tab-pane
        :name="ClientUserDataTabName.PERMISSIONS"
        :tab="$t('Access-rights')"
      >
        <AccessPermissionsTabModule
          :is-edit="hasFullAccess"
          :client-loading="clientUserLoading"
          :client-user="clientUser"
          :business-code="businessCode"
        />
      </n-tab-pane>

      <n-tab-pane
        :name="ClientUserDataTabName.ACCESS_ACCOUNTS"
        :tab="$t('Access-to-accounts')"
      >
        <UserAccessAccounts
          :is-edit="hasFullAccess"
          :client-user-loading="clientUserLoading"
          :client-user="clientUser"
          :business-code="businessCode"
        />
      </n-tab-pane>

      <n-tab-pane
        :name="ClientUserDataTabName.CERTIFICATES"
        :tab="$t('Certificates')"
      >
        <UserCertificateManage
          :client-user-loading="clientUserLoading"
          :client-user="clientUser"
          :business-code="businessCode"
          :is-edit="hasFullAccess"
        >
          <template
            #default="{
              certificate,
              setCertificateDeactivateDate,
              setCertificateRevokedReason,
              setCertificateState
            }"
          >
            <UserCertificateActions
              :certificate="certificate"
              :certificate-deactivate-date="
                certificate?.certificateDeactivateDate
              "
              :certificate-revoked-reason="
                certificate?.certificateRevokedReason
              "
              :certificate-state="certificate?.certificateState"
              @update:certificate-deactivate-date="setCertificateDeactivateDate"
              @update:certificate-revoked-reason="setCertificateRevokedReason"
              @update:certificate-state="setCertificateState"
            />
          </template>
        </UserCertificateManage>
      </n-tab-pane>

      <n-tab-pane
        :name="ClientUserDataTabName.LOGS"
        :tab="$t('Logs')"
      >
        <UserLogs
          :user-id="userId"
        />
      </n-tab-pane>
    </n-tabs>
  </main>
</template>
