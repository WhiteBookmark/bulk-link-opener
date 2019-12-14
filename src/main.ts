import Vue from 'vue';
import App from '@/App.vue';

import * as Sentry from '@sentry/browser';
import * as Integrations from '@sentry/integrations';

if (process.env.NODE_ENV === 'production') {
	Sentry.init({
		dsn: process.env.VUE_APP_SENTRY_DSN,
		integrations: [new Integrations.Vue({ Vue, attachProps: true })],
	});
}

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
