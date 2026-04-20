<wizard-report>
# PostHog post-wizard report

The wizard has completed a deep integration of PostHog analytics into the Ressonance SPA (Vue 3 + Vite). PostHog is initialized in `src/main.js` with a global Vue error handler for exception tracking. Users are identified on email/password login and account signup using `posthog.identify()`. The PostHog session is reset with `posthog.reset()` on logout and account deletion. Ten business-critical events are captured across seven files.

| Event | Description | File |
|---|---|---|
| `user_logged_in` | Fired when a user successfully logs in with email and password | `src/views/LoginView.vue` |
| `user_signed_up` | Fired when a user successfully creates a new account | `src/views/CreateAccount.vue` |
| `social_login_completed` | Fired when a user successfully authenticates via Google or GitHub OAuth | `src/views/SocialLogin.vue` |
| `forgot_password_requested` | Fired when a user successfully submits a forgot password request | `src/views/ForgotPassword.vue` |
| `project_created` | Fired when a user successfully creates a new project (includes `stack` property) | `src/components/CreateProjectForm.vue` |
| `project_deleted` | Fired when a user successfully deletes a project (includes `project_name` property) | `src/views/dashboard/DeleteProjectView.vue` |
| `api_key_copied` | Fired when a user copies an API key or credential from project settings (includes `field_label` property) | `src/components/CopyField.vue` |
| `password_changed` | Fired when a user successfully changes their password | `src/views/dashboard/Settings.vue` |
| `account_deleted` | Fired when a user successfully deletes their account | `src/views/dashboard/Settings.vue` |
| `stack_documentation_viewed` | Fired when a user views project settings with a specific backend stack (includes `stack` property) | `src/views/dashboard/ProjectViewSettings.vue` |

## Next steps

We've built some insights and a dashboard for you to keep an eye on user behavior, based on the events we just instrumented:

- **Dashboard — Analytics basics**: https://us.posthog.com/project/381162/dashboard/1463819
- **Insight — Signup to first project funnel**: https://us.posthog.com/project/381162/insights/TszYCRO9
- **Insight — Daily signups and logins**: https://us.posthog.com/project/381162/insights/aE56zEC2
- **Insight — Project lifecycle: created vs deleted**: https://us.posthog.com/project/381162/insights/faT01XxW
- **Insight — Churn signals: account deletions and password changes**: https://us.posthog.com/project/381162/insights/ItVwm1Ma
- **Insight — Backend stack popularity**: https://us.posthog.com/project/381162/insights/nSGxMuuh

### Agent skill

We've left an agent skill folder in your project. You can use this context for further agent development when using Claude Code. This will help ensure the model provides the most up-to-date approaches for integrating PostHog.

</wizard-report>
