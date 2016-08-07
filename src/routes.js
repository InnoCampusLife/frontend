let t_path = './components/templates/';

var	test 		 	= require(t_path + 'test.vue'),
	main 		 	= require(t_path + 'main.vue'),
	login 		 	= require(t_path + 'login.vue'),
	account 	 	= require(t_path + 'account.vue'),
	uis = {
		admin 		 	: require(t_path + 'uis/admin.vue'),
		account 		 	: require(t_path + 'uis/account.vue'),
		points : {
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
			'/' : {
				component: test
			},
			'/account' : {
				component: router_view,
				subRoutes: {
					'/' : {
						component: account
					},
					'/uis' : {
						component: router_view,
						subRoutes: {
							'/' : {
								component: uis.account
							},
							'/feed' : {
								component: test	//to be reaplced with uis.news.feed
							},
							'/innopoints' : {
								component: router_view,
								subRoutes: {
									'/' : {
										component: test //to be replaced with uis.points.profile
									},
									'/get' : {
										component: uis.points.get
									},
									'/create' : {
										component: uis.points.create_account
									}
								}
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
						component: router_view,
						subRoutes: {
							'/' : {
								component: test
							},
							'/accounts' : {
								component: uis.admin
							},
							'/innopoints' : {
								component: router_view,
								subRoutes: {
									'/' : {
										component: uis.points.admin
									},
									//TODO
								}
							}
						}
					}
				},
				adminZone
			}
		},
		authorizedZone
	}
};