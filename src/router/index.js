import { createRouter, createWebHistory } from "vue-router";
import ProjectListView from "@/views/dashboard/ProjectListView.vue";
import CreateProjectView from "@/views/dashboard/CreateProjectView.vue";
import ProjectViewSettings from "@/views/dashboard/ProjectViewSettings.vue";
import ProjectViewStats from "@/views/dashboard/ProjectViewStats.vue";
import Dashboard from "@/views/dashboard/Dashboard.vue";
import LoginView from "@/views/LoginView.vue";
import { useGlobalStore } from "@/stores/global";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/dashboard",
      name: "dashboard",
      component: Dashboard,
      meta: {
        requiresAuth: true
      },
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
    },
    {
      path: "/login",
      name: "login",
      component: LoginView,
    }
  ],
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    const globalStore = useGlobalStore()
    if (!globalStore.isLoggedIn) {
      next({ name: 'login' })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router;