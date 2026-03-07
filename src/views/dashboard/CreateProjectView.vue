<template>
  <DefaultTransition name="slide-fade" appear>
    <CreateProjectForm />
  </DefaultTransition>
</template>

<script setup>
import CreateProjectForm from '@/components/CreateProjectForm.vue';
import { useGlobalStore } from "@/stores/global";
import DefaultTransition from "@/components/Transitions/DefaultTransition.vue";

const globalStore = useGlobalStore()
globalStore.setHeaderLabel('Create a New Project')
</script>