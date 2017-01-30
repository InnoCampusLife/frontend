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
		{
			path: '/account',
			component: require('./views/accounts/main.vue'),
			meta: { authorizedZone: true },
			children: [
				{
					path: ':username',
					component: require('./views/accounts/account.vue'),
					name: 'account',
				},
			],
		},
		{
			path: '/accounts',
			component: require('./views/accounts/main.vue'),
			meta: { authorizedZone: true },
			children: [
				{
					path: '',
					component: require('./views/accounts/accounts.vue'),
					name: 'accounts',
				},
			],
		},
		{
			path: '/innopoints',
			component: require('./views/innopoints/main.vue'),
			meta: { authorizedZone: true },
			children: [
				{
					path: '',
					redirect: 'applications',
				},
				{
					path: 'applications',
					component: require('./views/innopoints/applications.vue'),
					name: 'applications',
				},
				{
					path: 'apply',
					component: require('./views/innopoints/apply.vue'),
					name: 'apply',
				},
			],
		},
		{
			path: '/store',
			component: require('./views/store/main.vue'),
			meta: { authorizedZone: true },
			children: [
				{
					path: '',
					component: require('./views/store/store.vue'),
					name: 'store',
				},
				{
					path: 'orders',
					component: require('./views/store/orders.vue'),
					name: 'orders',
				},
				// {
				// 	path: 'items/:item',
				// 	component: require('./views/store/item.vue'),
				// 	name: 'item',
				// },
			],
		},
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