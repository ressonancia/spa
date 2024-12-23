import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from "./router";
import { createPinia } from "pinia";
import VueApexCharts from "vue3-apexcharts";
import { configure, defineRule } from 'vee-validate';

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



const app = createApp(App)

app.use(createPinia());
app.use(router);
app.use(VueApexCharts)
app.mount('#app')