// Views
var	test			= require('./views/test.vue');
var	user			= require('./models/user.js');
var adminZone = true, authorizedZone = true, loginPage = true;

var router_view = { template: '<router-view></router-view>' };

module.exports = {
	'/login': {
		component: require('./views/login.vue'),
		loginPage
	},
	'/': {
		component: require('./views/main.vue'),
		user: user,
		subRoutes: {
			'/profile': {
				component: require('./views/profile/main.vue'),
				subRoutes: {
					'/:username' : {
						component: router_view,
						name: 'profile',
						user: user,
						subRoutes: {
							'/' : {
								component: require('./views/profile/profile.vue')
							},
							'/applications' : {
								component: require('./views/profile/innopoints/main.vue'),
								name: 'applications',
								user: user
							},
							'/apply' : {
								component: require('./views/profile/innopoints/apply.vue'),
								name: 'apply',
								user: user
							}
						},
					},
				}
			},
			'/admnistration': {
				component: require('./views/administration/main.vue'),
				subRoutes: {
					'/' : {
						component: require('./views/administration/admin.vue'),
						name: 'administration',
						user: user
					},
					'/innopoints': {
						component: router_view,
						subRoutes: {
							'/' : {
								component: require('./views/administration/innopoints/main.vue'),
								name: 'administration/innopoints',
								user: user
							},
							'/apply' : {
								component: require('./views/administration/innopoints/apply.vue'),
								name: 'administration/innopoints/apply',
								user: user
							}
						}
					}
				},
			}
		},
		authorizedZone
	}
}