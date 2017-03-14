import * as Vue from 'vue'
import Vuex from 'vuex'

import { store as accounts } from './modules/accounts'
import { store as innopoints } from './modules/innopoints'

Vue.use(Vuex)

export default new Vuex.Store({
	strict: process.env.NODE_ENV !== 'production',

	modules: {
		accounts: {
			...accounts,
			namespaced: true,
		},

		innopoints: {
			...innopoints,
			namespaced: true,
		},
	},
})