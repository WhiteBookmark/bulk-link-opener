import Vue from 'vue';
import '@/registerServiceWorker';
import vuetify from '@/plugins/vuetify';

// Import store first then router
import store from '@/store/index';
import router from '@/router/index';


import App from '@/App.vue';

Vue.config.productionTip = true;
window.store = store;

new Vue({
	router,
	store,
	vuetify,
	render: (h) => h(App),
}).$mount('#app');
