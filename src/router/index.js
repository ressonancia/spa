import { createRouter, createWebHistory } from "vue-router";
import ProjectListView from "../views/ProjectListView.vue";
import CreateProjectView from "../views/CreateProjectView.vue";
import ProjectViewSettings from "../views/ProjectViewSettings.vue";
import ProjectViewStats from "../views/ProjectViewStats.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "projects",
      component: ProjectListView,
    },
    {
      path: "/projects/create",
      name: "create-projects",
      component: CreateProjectView,
    },
    {
      path: "/:project",
      name: "project",
      component: ProjectViewStats,
    },
    {
      path: "/:project/settings",
      name: "projectSettings",
      component: ProjectViewSettings,
    },
  ],
});

export default router;