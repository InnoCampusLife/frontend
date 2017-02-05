import * as Vue from 'vue'
import * as VueRouter from 'vue-router'

import { modules } from './modules'

Vue.use(VueRouter)

const user = modules.accounts

const router = new VueRouter({
	mode: 'history',
	routes: [
		{
			path: '/login',
			component: require('./views/login.vue'),
			meta: { loginPage: true },
		},
		{
			path: '/',
			redirect: 'store',
			meta: { authorizedZone: true },
		},
		{
			path: '/test',
			component: require('./views/test.vue'),
		},

		// Accounts
		{
			path: '/account',
			component: require('./views/accounts/account.vue'),
			meta: { authorizedZone: true },
			name: 'account',
		},
		{
			path: '/accounts',
			component: require('./views/accounts/accounts.vue'),
			meta: { authorizedZone: true },
			name: 'accounts',
		},

		// Innopoints - Applications
		{
			path: '/innopoints',
			redirect: '/innopoints/applications',
			meta: { authorizedZone: true },
		},
		{
			path: '/innopoints/applications',
			component: require('./views/innopoints/applications.vue'),
			meta: { authorizedZone: true },
			name: 'applications',
		},
		{
			path: '/innopoints/apply',
			component: require('./views/innopoints/apply.vue'),
			meta: { authorizedZone: true },
			name: 'apply',
		},

		// Innopoints - Store
		{
			path: '/store',
			component: require('./views/store/store.vue'),
			meta: { authorizedZone: true },
			name: 'store',
		},
		{
			path: '/store/orders',
			component: require('./views/store/orders.vue'),
			meta: { authorizedZone: true },
			name: 'orders',
		},

		// 404
		{
			path: '*',
			component: require('./views/not-found.vue'),
		},
	],
})

router.beforeEach((to, from, next) => {
	if (to.matched.some((record) => record.meta.authorizedZone)) {
		if (!user.loggedIn) {
			console.log('Checkpoint #1')
			next({
				path: '/login',
				// query: { redirect: to.fullPath }
			})
		} else {
			console.log('Checkpoint #2')
			next()
		}
	} else if (to.matched.some((record) => record.meta.loginPage)) {
		if (user.loggedIn) {
			console.log('Checkpoint #3')
			next({
				path: '/',
				// query: { redirect: to.fullPath }
			})
		} else {
			console.log('Checkpoint #4')
			next()
		}
	} else {
		console.log('Checkpoint #5')
		next() // make sure to always call next()!
	}
})

export default router