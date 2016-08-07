let t_path = './components/templates/';

var	test 		 	= require(t_path + 'test.vue'),
	main 		 	= require(t_path + 'main.vue'),
	login 		 	= require(t_path + 'login.vue'),
	account 	 	= require(t_path + 'account.vue'),
	uis = {
		admin 		 		: require(t_path + 'uis/admin.vue'),
		innopoints : {
			admin 			: require(t_path + 'innopoints/admin.vue'),
			get 		 	: require(t_path + 'innopoints/get.vue'),
			create_account 	: require(t_path + 'innopoints/create_account.vue'),
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
							'/get' : {
								component: uis.innopoints.get
							},
							'/create' : {
								component: uis.innopoints.create_account
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
								component: uis.innopoints.admin
							},
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