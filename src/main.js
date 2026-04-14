import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from "./router";
import { createPinia } from "pinia";
import VueApexCharts from "vue3-apexcharts";
import { configure, defineRule } from 'vee-validate';
import posthog from 'posthog-js';

import 'highlight.js/styles/stackoverflow-dark.css'
import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import python from 'highlight.js/lib/languages/python';
import java from 'highlight.js/lib/languages/java';
import dotnet from 'highlight.js/lib/languages/csharp';
import html from 'highlight.js/lib/languages/xml';
import hljsVuePlugin from "@highlightjs/vue-plugin";

hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('python', python);
hljs.registerLanguage('java', java);
hljs.registerLanguage('dotnet', dotnet);
hljs.registerLanguage('html', html);

configure({
    generateMessage: (context) => {
      const messages = {
        required: `${context.field} is required.`,
        email: `${context.field} must be a valid email address.`,
        max: `${context.field} must have maximun of ${context.rule.params[0]} characteres.`,
        min: `${context.field} must have minimum of ${context.rule.params[0]} characteres.`,
        confirmed: `The password in both password fields must match.`,
      };
  
      return messages[context.rule.name] || 'Invalid field.';
    },
});

defineRule('password', (value) => {
	const hasMixedCase = /[a-z]/.test(value) && /[A-Z]/.test(value);
	const hasNumbers = /\d/.test(value);
  
	if (!hasMixedCase) {
	  return 'The password must include both uppercase and lowercase letters.';
	}
  
	if (!hasNumbers) {
	  return 'The password must include at least one number.';
	}
  
	return true;
});



posthog.init(import.meta.env.VITE_POSTHOG_PROJECT_TOKEN || '', {
  api_host: import.meta.env.VITE_POSTHOG_HOST || 'https://us.i.posthog.com',
  defaults: '2026-01-30',
});

const app = createApp(App)

app.config.errorHandler = (err) => {
  posthog.captureException(err)
}

app.use(hljsVuePlugin);
app.use(createPinia());
app.use(router);
app.use(VueApexCharts)
app.mount('#app')