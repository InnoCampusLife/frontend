let t_path = './components/templates/';

var	test 		 = require(t_path + 'test.vue'),
	profile		 = require(t_path + 'user/profile.vue'),
	main 		 = require(t_path + 'main.vue'),
	login 		 = require(t_path + 'login.vue'),
	uis = {}, points = {};

	uis.admin 	 = require(t_path + 'uis/admin.vue'),
	points.admin = require(t_path + 'innopoints/admin.vue');

var adminZone = true, authorizedZone = true;

module.exports = {
	'/login' : {
		component: login,
		loginPage: true
	},
	'/' : {
		component: main,
		subRoutes: {
			'/test' : {
				component: test
			},
			'/user' : {
				component: { template: '<router-view></router-view>' },
				subRoutes: {
					'/:username' : {
						component: test
					},
					'/administration' : {
						component: uis.admin,
						adminZone
					},
					'/profile' : {
						component: profile
					},
				}
			},
			'/innopoints' : {
				component: { template: '<router-view></router-view>' },
				subRoutes: {
					'/get' : {
						component: test
					},
					'/administration' : {
						component: points.admin,
						adminZone
					},
				}
			}
		},
		authorizedZone
	}
};