import { createRouter, createWebHistory } from "vue-router";
import ProjectListView from "@/views/dashboard/ProjectListView.vue";
import CreateProjectView from "@/views/dashboard/CreateProjectView.vue";
import DeleteProjectView from "@/views/dashboard/DeleteProjectView.vue";
import Settings from "@/views/dashboard/Settings.vue";
import ProjectViewSettings from "@/views/dashboard/ProjectViewSettings.vue";
import ProjectViewStats from "@/views/dashboard/ProjectViewStats.vue";
import Dashboard from "@/views/dashboard/Dashboard.vue";
import LoginView from "@/views/LoginView.vue";
import CreateAccount from "@/views/CreateAccount.vue";
import ForgotPassword from "@/views/ForgotPassword.vue";
import ResetPassword from "@/views/ResetPassword.vue";
import SocialLogin from "@/views/SocialLogin.vue";
import EmailVerificationCallOut from "@/views/EmailVerificationCallOut.vue";
import { useGlobalStore } from "@/stores/global";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/dashboard",
      name: "dashboard",
      component: Dashboard,
      meta: {
        requiresAuth: true,
        requiresEmailVerification: true,
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
        {
          path: ":project/delete",
          name: "delete-project",
          component: DeleteProjectView,
        },
        {
          path: "settings",
          name: "settings",
          component: Settings,
        }
      ]
    },
    {
      path: "/",
      name: "home",
      component: LoginView,
      meta: {
        transition: "slide-fade"
      }
    },
    {
      path: "/login",
      name: "login",
      component: LoginView,
      meta: {
        transition: "slide-fade"
      }
    },
    {
      path: "/create-account",
      name: "create-account",
      component: CreateAccount,
      meta: {
        transition: "slide-fade"
      }
    },
    {
      path: "/email-verification",
      name: "email-verification",
      component: EmailVerificationCallOut,
      meta: {
        transition: "slide-fade"
      }
    },
    {
      path: "/forgot-password",
      name: "forgot-password",
      component: ForgotPassword,
      meta: {
        transition: "slide-fade"
      }
    },
    {
      path: "/reset-password",
      name: "reset-password",
      component: ResetPassword,
      meta: {
        transition: "slide-fade"
      }
    },
    {
      path: "/social-login",
      name: "social-login",
      component: SocialLogin,
      meta: {
        transition: "slide-fade"
      }
    }
  ],
});

router.beforeEach(async (to, from, next) => {
  
  if (to.matched.some(record => record.meta.requiresAuth)) {
    const globalStore = useGlobalStore()
    if (!globalStore.isLoggedIn) {
      next({ name: 'login' })
    }
  }

  if (to.matched.some(record => record.meta.requiresEmailVerification)) {
    const globalStore = useGlobalStore()
    let user = await globalStore.getUser()
    if (!user.email_verified_at) {
      next({ name: 'email-verification' })
    }
  }

  next()
})

export default router;