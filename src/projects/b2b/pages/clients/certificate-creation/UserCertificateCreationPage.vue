<script setup lang="ts">
import PageTitle from '@/shared/UI/page-title';
import useClientUserLoader from '@/projects/b2b/features/client-user/useClientUserFetch';
import {
  UserCertificateCreation,
  UserCertificateCreationActions
} from '@/projects/b2b/features/user-certificate';

const { user } = useClientUserLoader();
</script>

<template>
  <main>
    <PageTitle
      :title="`${$t('Adding-certificate')}, ${user?.fio || ''}`"
    />

    <UserCertificateCreation>
      <template
        #default="{
          certificates,
          pagination,
          isMobileCertificate,
          popCertificate,
          unshiftCertificate,
          onChangeIsMobileCertificate
        }"
      >
        <UserCertificateCreationActions
          :certificates="certificates"
          :max-count="pagination?.pageSize"
          :is-mobile-certificate="isMobileCertificate"
          @update:is-mobile-certificate="onChangeIsMobileCertificate"
          @pop-certificate="popCertificate"
          @unshift-certificate="unshiftCertificate"
        />
      </template>
    </UserCertificateCreation>
  </main>
</template>
