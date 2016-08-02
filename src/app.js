import Vue 			from 'vue'
import VueRouter 	from 'vue-router'
import app 			from './components/app.vue'
import routes 		from './routes.js'
import {account}	from './components/scripts/api.js'
import user 		from './components/scripts/userModel.js'


//Make 'user' a global object for sharing between templates
window.user = user;

Vue.use(VueRouter);

var router = new VueRouter({
	hashbang: false,
	history: true
}).map(routes);

router.beforeEach(function (transition) {
	if (!user.loggedIn) {
		if (transition.to.authorizedZone) {
			alert('You don\'t have enough permissions to access this zone!');
			transition.redirect('/login');
		}
		else
			transition.next();
	}
	else {
		if (transition.to.loginPage)
			transition.redirect('/');
		else {
			if (transition.to.adminZone) {
				if (user.isAdmin)
					transition.next();
				else { 
					alert('You don\'t have enough permissions to access this zone!');
					transition.abort();
				}
			}
			else transition.next();
		}
	}
}).redirect({'*':'/'});

router.start(app, 'app');