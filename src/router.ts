import * as Vue from 'vue'
import VueRouter from 'vue-router'

import { modules } from './modules'

import config from './config'
import storage from './storage'

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
			path: '/',
			component: require('./views/sidenav.vue'),
			children: [
				{
					path: '/test',
					component: require('./views/test.vue'),
				},

				// Accounts
				{
					path: '/accounts',
					component: require('./views/accounts/accounts-main.vue'),
					meta: { authorizedZone: true },
					children: [
						{
							path: 'manage',
							component: require('./views/accounts/pages/manage-accounts.vue'),
							name: 'manage-accounts',
						},
						{
							path: '/profiles/:id',
							component: require('./views/accounts/pages/profile.vue'),
							name: 'profile',
						},
						{
							path: '/account',
							component: require('./views/accounts/pages/account.vue'),
							name: 'account',
						},
					],
				},

				// Innopoints - Applications
				{
					path: '/innopoints',
					component: require('./views/innopoints/innopoints-main.vue'),
					meta: { authorizedZone: true },
					children: [
						{
							path: '',
							redirect: 'applications',
						},
						{
							path: 'applications',
							component: require('./views/innopoints/pages/applications.vue'),
							name: 'applications',
						},
						{
							path: 'apply',
							component: require('./views/innopoints/pages/apply.vue'),
							name: 'apply',
						},
						{
							path: 'applications/manage',
							component: require('./views/innopoints/pages/manage-applications.vue'),
							name: 'manage-applications',
						},
					],
				},

				// Innopoints - Store
				{
					path: '/store',
					component: require('./views/store/store-main.vue'),
					meta: { authorizedZone: true },
					children: [
						{
							path: '',
							component: require('./views/store/pages/store.vue'),
							name: 'store',
						},
						{
							path: 'items/:id',
							component: require('./views/store/pages/item.vue'),
							name: 'item',
						},
						{
							path: 'orders',
							component: require('./views/store/pages/orders.vue'),
							name: 'orders',
						},
						{
							path: 'orders/manage',
							component: require('./views/store/pages/manage-orders.vue'),
							name: 'manage-orders',
						},
					],
				},

				// 404
				{
					path: '*',
					component: require('./views/not-found.vue'),
				},
			],
		},
	],
})

router.beforeEach((to, from, next) => {
	if (to.matched.some((record) => record.meta.authorizedZone)) {
		if (!storage.getItem(config.tokenName)) {
			// console.log('Checkpoint #1')
			next({
				path: '/login',
				// query: { redirect: to.fullPath }
			})
		} else {
			// console.log('Checkpoint #2')
			next()
		}
	} else if (to.matched.some((record) => record.meta.loginPage)) {
		if (storage.getItem(config.tokenName)) {
			// console.log('Checkpoint #3')
			next({
				path: '/',
				// query: { redirect: to.fullPath }
			})
		} else {
			// console.log('Checkpoint #4')
			next()
		}
	} else {
		// console.log('Checkpoint #5')
		next() // make sure to always call next()!
	}
})

export default router
