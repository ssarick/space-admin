<script setup lang="ts">
import PageTitle from '@/shared/UI/page-title';
import useClientUserLoader from '@/projects/b2b/features/client-user/useClientUserFetch';
import { UserCertificateAddExisting } from '@/projects/b2b/features/user-certificate';

const { user } = useClientUserLoader();
</script>

<template>
  <main>
    <PageTitle
      :title="`${$t('Adding-certificate')}, ${user?.fio || ''}`"
    />

    <UserCertificateAddExisting />
  </main>
</template>
