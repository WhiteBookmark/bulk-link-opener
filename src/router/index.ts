import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '@/views/Home.vue';
import AuthenticationCallback from '@/views/AuthenticationCallback.vue';
import Logout from '@/views/Logout.vue';

const About = () => import('@/views/About.vue');
const Settings = () => import('@/views/Settings.vue');

Vue.use(VueRouter);

// Router guard function verifies authentication
function EnsureAuthenticated(to: any, from: any, next: any) {
	const IsAuthenticated: User['authenticated'] = store.get('user@@authenticated');
	if (IsAuthenticated) {
		next();
	} else {
		next('/');
	}
}

const routes = [
	{
		path: '/',
		name: 'home',
		component: Home,
	},
	{
		path: '/about',
		name: 'about',
		component: About,
	},
	{
		path: '/settings',
		name: 'settings',
		component: Settings,
		beforeEnter: EnsureAuthenticated,
	},
	{
		path: '/auth/callback',
		name: 'authCallback',
		component: AuthenticationCallback,
	},
	{
		path: '/logout',
		name: 'logout',
		component: Logout,
	},
];

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	scrollBehavior(to: any, from: any, savedPosition: any) {
		if (savedPosition) {
			return savedPosition;
		} else {
			return { x: 0, y: 0 };
		}
	},
	routes,
});

export default router;
