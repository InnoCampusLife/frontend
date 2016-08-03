import test 		from './components/templates/test.vue'
import profile 		from './components/templates/profile.vue'
import admin 		from './components/templates/admin.vue'
import main 		from './components/templates/main.vue'
import login 		from './components/templates/login.vue'

var adminZone = true, authorizedZone = true;

export default {
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
			'/admin_side' : {
				component: admin,
				adminZone
			},
			'/points_admin_side' : {
				component: test,
				adminZone
			},
			'/user' : {
				component: test,
				subRoutes: {
					'/:username' : {
						component: test
					},
				}
			},
			'/profile' : {
				component: profile
			},
			'/innopoints' : {
				component: test,
				subRoutes: {
					'/get' : {
						component: test
					}
				}
			}
		},
		authorizedZone
	}
}