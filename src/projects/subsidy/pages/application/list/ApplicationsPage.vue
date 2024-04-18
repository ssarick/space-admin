<script lang="ts" setup>
import ApplicationList from '@/projects/subsidy/features/applications/list';
import ApplicationsMinfinModal from '@/projects/subsidy/features/applications/minfin-modal';
</script>

<template>
  <main>
    <ApplicationList
      v-slot="{
        applications,
        showModal,
        setShowModal,
        updateApplication
      }"
    >
      <ApplicationsMinfinModal
        :show-modal="showModal"
        :applications="applications"
        @update-application="updateApplication"
        @update:show-modal="setShowModal"
      />
    </ApplicationList>
  </main>
</template>
