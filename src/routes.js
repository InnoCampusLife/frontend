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
			'/uis' : {
				component: { template: '<router-view></router-view>' },
				subRoutes: {
					'/:username' : {
						component: test
					},
					'/account/administration' : {
						component: uis.admin,
						adminZone
					},
					'/account' : {
						component: profile
					},
				}
			},
			'/innopoints' : {
				component: { template: '<router-view></router-view>' },
				subRoutes: {
					'/get' : {
						component: points.get
					},
					'/account' : {
						component: test
					},
					'/account/create' : {
						component: points.create_account
					},
					'/account/administration' : {
						component: points.admin,
						adminZone
					},
				}
			}
		},
		authorizedZone
	}
};