// Views
var	main 		 	= require('./views/main.vue'),
	test			= require('./views/test.vue');

var	user			= require('./models/user.js');

var authorizedZone = true, loginPage = true;

var router_view = { template: '<router-view></router-view>' };

module.exports = {
	'/login': {
		component: test,
		loginPage
	},
	'/': {
		component: main,
		subRoutes: {
			'/profile': {
				component: require('./views/profile/main.vue'),
				subRoutes: {
					'/:username' : {
						component: require('./views/profile/profile.vue'),
						name: 'profile',
						user: user
					}
				}
			}
		},
		authorizedZone: false
	}
}