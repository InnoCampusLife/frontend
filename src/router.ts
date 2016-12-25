import * as VueRouter from 'vue-router'

const user = require('./modules').accounts;

const loginPage = true
const authorizedZone = true

const routerView = { template: '<router-view></router-view>' }

var router = new VueRouter({
	mode: 'history',
	routes: [
		{
			path: '/login',
			component: require('./views/login.vue'),
			meta: { loginPage },
		},
		{
			path: '/',
			component: require('./views/main.vue'),
			meta: { authorizedZone },
			children: [
				{
					path: '',
					component: require('./views/content.vue'),
					children: [
						{
							path: '',
							redirect: '/store',
						},
						{
							path: 'test',
							component: require('./views/test.vue'),
						},
					]
				},
				{
					path: 'profile',
					component: require('./views/profile/main.vue'),
					children: [
						{
							path: ':username',
							component: require('./views/profile/profile.vue'),
							name: 'profile',
						}
					]
				},
				{
					path: 'accounts',
					component: require('./views/accounts/main.vue'),
					children: [
						{
							path: '',
							component: require('./views/accounts/admin.vue'),
							name: 'accounts',
						}
					]
				},
				{
					path: 'innopoints',
					component: require('./views/innopoints/main.vue'),
					children: [
						{
							path: ':username',
							component: routerView,
							children: [
								{
									path: '',
									redirect: 'applications',
								},
								{
									path: 'applications',
									component: routerView,
									children: [
										{
											path: ':filter',
											component: require('./views/innopoints/applications.vue'),
											name: 'applications',
										}
									]
								},
								{
									path: 'apply',
									component: require('./views/innopoints/apply.vue'),
									name: 'apply',
								},
							],
						},
					],
				},
				{
					path: 'store',
					component: require('./views/store/main.vue'),
					children: [
						{
							path: '',
							component: require('./views/store/store.vue'),
							name: 'store',
						},
						{
							path: 'item/:item',
							component: require('./views/store/item.vue'),
							name: 'item',
						},
						{
							path: ':username/orders',
							component: require('./views/store/orders.vue'),
							name: 'orders',
						},
					],
				},
			],
		},
	],
})

router.beforeEach((to, from, next) => {
	if (to.matched.some(record => record.meta.authorizedZone)) {
		if (!user.loggedIn) {
			next({
				path: '/login',
				query: { redirect: to.fullPath }
			})
		} else {
			next()
		}
	} else if (to.matched.some(record => record.meta.loginPage)) {
		if (user.loggedIn) {
			next({
				path: '/',
				query: { redirect: to.fullPath }
			})
		} else {
			next()
		}
	} else {
		next() // make sure to always call next()!
	}
})

export default router