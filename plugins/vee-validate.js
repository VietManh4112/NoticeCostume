import Vue from 'vue';
import { extend, ValidationObserver, ValidationProvider } from 'vee-validate';
import * as rules from 'vee-validate/dist/rules';
import { messages } from 'vee-validate/dist/locale/en.json'; // Chọn locale tương ứng

// Install rules
Object.keys(rules).forEach(rule => {
  extend(rule, rules[rule]);
});

// Set default locale to English
import { localize } from 'vee-validate';
localize('en', messages);

Vue.component('ValidationObserver', ValidationObserver);
Vue.component('ValidationProvider', ValidationProvider);