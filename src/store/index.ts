import Vue from 'vue';
import Vuex from 'vuex';
import pathify from '@/plugins/pathify';
import states from '@/store/states';
import { make } from 'vuex-pathify';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

export default new Vuex.Store({
	state: states,
	mutations: { ...make.mutations(states) },
	plugins: [
		pathify.plugin,
		createPersistedState({
			paths: ['user', 'settings'],
		}),
	],
});
