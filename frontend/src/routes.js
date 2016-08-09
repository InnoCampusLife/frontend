let t_path = './components/templates/';

var	test 		 	= require(t_path + 'test.vue'),
	main 		 	= require(t_path + 'main.vue'),
	login 		 	= require(t_path + 'login.vue'),
	account 	 	= require(t_path + 'account.vue'),
	uis = {
		admin 		 		: require(t_path + 'uis/admin.vue'),
		innopoints : {
			apply 		 	: require(t_path + 'innopoints/apply.vue'),
			admin : {
				main 		: require(t_path + 'innopoints/admin/main.vue'),
				apply		: require(t_path + 'innopoints/admin/apply.vue'),
			}
		}
	}

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
			// '/' - should redirect to 'feed'
			'/feed' : {
				component: test	//to be reaplced with uis.news.feed
			},
			'/account' : {
				component: router_view,
				subRoutes: {
					'/' : {
						component: account
					},
					'/innopoints' : {
						component: router_view,
						subRoutes: {
							'/' : {
								component: test //to be replaced with innopoints dashboard
							},
							'/apply' : {
								component: uis.innopoints.apply
							}
						}
					}
				}
			},
			'/administration' : {
				component: router_view,
				subRoutes: {
					'/' : {
						component: test 	//to be replaced with global administrating
					},
					'/uis' : {
						component: test 	//to be replaced with uis global administrating
					},
					'/accounts' : {
						component: uis.admin
					},
					'/innopoints' : {
						component: router_view,
						subRoutes: {
							'/' : {
								component: uis.innopoints.admin.main	//To remove or not to remove?
							},
							'/apply' : {
								component: uis.innopoints.admin.apply
							},
							'/applications' : {
								component: test
							},
							'/students' : {
								component: test
							}
							//TODO
						}
					}
				},
				adminZone
			}
		},
		authorizedZone
	}
};