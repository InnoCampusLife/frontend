import * as Vue from 'vue'
import Vuex from 'vuex'

import accountsStore from './modules/accounts/accounts-store'
import innopointsStore from './modules/innopoints/innopoints-store'

Vue.use(Vuex)

export default new Vuex.Store({
	strict: process.env.NODE_ENV !== 'production',

	modules: {
		accounts: {
			...accountsStore,
			namespaced: true,
		},

		innopoints: {
			...innopointsStore,
			namespaced: true,
		},
	},
})