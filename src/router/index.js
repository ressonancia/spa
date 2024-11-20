import { createRouter, createWebHistory } from "vue-router";
import ProjectListView from "@/views/dashboard/ProjectListView.vue";
import CreateProjectView from "@/views/dashboard/CreateProjectView.vue";
import ProjectViewSettings from "@/views/dashboard/ProjectViewSettings.vue";
import ProjectViewStats from "@/views/dashboard/ProjectViewStats.vue";
import Dashboard from "@/views/dashboard/Dashboard.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/dashboard",
      name: "dashboard",
      component: Dashboard,
      children: [
        {
          path: "",
          name: "projects",
          component: ProjectListView,
        },
        {
          path: "projects/create",
          name: "create-projects",
          component: CreateProjectView,
        },
        {
          path: ":project",
          name: "project",
          component: ProjectViewStats,
        },
        {
          path: ":project/settings",
          name: "projectSettings",
          component: ProjectViewSettings,
        },
      ]
    }
  ],
});

export default router;