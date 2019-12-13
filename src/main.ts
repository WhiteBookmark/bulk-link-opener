import Vue from 'vue';

// Import store first then router
import store from '@/store/index';
import router from '@/router/index';

import '@/registerServiceWorker';
import vuetify from '@/plugins/vuetify';
import VueApollo from 'vue-apollo';
import apolloClient from '@/utils/connection';
import '@/styles/rotate.css';
import 'vue-material-design-icons/styles.css';

Vue.prototype.$globalEvent = new Vue(); // Global event bus

import App from '@/App.vue';

Vue.config.productionTip = true;
window.store = store;

Vue.use(VueApollo);

const apolloProvider = new VueApollo({
	defaultClient: apolloClient,
});

new Vue({
	router,
	store,
	vuetify,
	apolloProvider,
	render: (h) => h(App),
}).$mount('#app');
