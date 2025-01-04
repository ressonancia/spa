<template>
  <CreateProjectForm />
</template>

<script setup>
import CreateProjectForm from '@/components/CreateProjectForm.vue';
import { useGlobalStore } from "@/stores/global";

const globalStore = useGlobalStore()
globalStore.setHeaderLabel('Create a New Project')
</script>