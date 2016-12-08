const user = require('./modules').accounts;

const adminZone = true, 
      authorizedZone = true, 
      loginPage = true;

const router_view = { template: '<router-view></router-view>' }

export default router => {
	router.map({
		'/login': {
			component: require('./views/login.vue'),
			loginPage
		},
		'/': {
			component: require('./views/main.vue'),
			subRoutes: {
				'/': {
					component: require('./views/content.vue'),
					subRoutes: {
						'/': {
							component: require('./views/test.vue')
						}
					}
				},
				'/profile': {
					component: require('./views/profile/main.vue'),
					subRoutes: {
						'/:username': {
							name: 'profile',
							component: require('./views/profile/profile.vue')
						}
					}
				},
				'/accounts': {
					component: require('./views/accounts/main.vue'),
					subRoutes: {
						'/': {
							component: require('./views/accounts/admin.vue'),
							name: 'accounts'
						}
					}
				},
				'/innopoints': {
					component: require('./views/innopoints/main.vue'),
					subRoutes: {
						'/:username': {
							component: router_view,
							subRoutes: {
								'/': {
									component: { template: '' },
									name: 'innopoints'
								},
								'/applications': {
									component: router_view,
									subRoutes: {
										'/:filter': {
											component: require('./views/innopoints/applications.vue'),
											name: 'applications'
										},
									}
								},
								'/apply': {
									component: require('./views/innopoints/apply.vue'),
									name: 'apply'
								},
							}
						}
					}
				},
				'/store': {
					component: require('./views/store/main.vue'),
					subRoutes: {
						'/': {
							component: require('./views/store/store.vue'), 
							name: 'store'
						},
						'/item/:item': {
							component: require('./views/store/item.vue'),
							name: 'item'
						},
					},
				},
			},
			authorizedZone:authorizedZone
		}
	});

	router.beforeEach(transition => {
		if (!user.loggedIn) {
			if (transition.to.authorizedZone)
				transition.redirect('/login');
			else
				transition.next();
		}
		else {	
			if (transition.to.loginPage)
				transition.redirect('/');
			else
				transition.next();
		}
	}).redirect({
		'*':'/',
		'/innopoints/:username/':'/innopoints/:username/applications/'
	});

	return router;
}