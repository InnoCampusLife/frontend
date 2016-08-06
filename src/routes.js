let t_path = './components/templates/';

var	test 		 = require(t_path + 'test.vue'),
	profile		 = require(t_path + 'user/profile.vue'),
	main 		 = require(t_path + 'main.vue'),
	login 		 = require(t_path + 'login.vue'),
	uis = {
		admin : require(t_path + 'uis/admin.vue')
	},
	points = {
		admin : require(t_path + 'innopoints/admin.vue'),
		get : require(t_path + 'innopoints/get.vue'),
		create_account : require(t_path + 'innopoints/create_account.vue'),
	};

var adminZone = true, authorizedZone = true;

var router_view = { template: '<router-view></router-view>' };

module.exports = {
	'/login' : {
		component: login,
		loginPage: true
	},
	'/' : {
		component: main,
		subRoutes: {
			'/' : {
				component: test
			},
			'/uis' : {
				component: router_view,
				subRoutes: {
					'/account' : {
						component: router_view,
						subRoutes: {
							'/' : {
								component: profile
							},
							'/:username' : {
								component: test
							},
							'/administration' : {
								component: uis.admin,
								adminZone
							},
						}
					},
				}
			},
			'/innopoints' : {
				component: router_view,
				subRoutes: {
					'/get' : {
						component: points.get
					},
					'/account' : {
						component: router_view,
						subRoutes: {
							'/' : {
								component: test
							},
							'/create' : {
								component: points.create_account
							},
							'/administration' : {
								component: points.admin,
								adminZone
							},
						}
					},
				}
			}
		},
		authorizedZone
	}
};