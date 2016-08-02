import test 		from './components/test.vue'
import main 		from './components/main.vue'
import login 		from './components/login.vue'

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
				component: test,
				adminZone: true
			},
			'/user' : {
				component: test,
				subRoutes: {
					'/:username' : {
						component: test
					},
				}
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
		//TODO 
		//   Remove the "!" sign
		authorizedZone : true
	}
}