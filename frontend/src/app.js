import Vue 			from 'vue'
import VueRouter 	from 'vue-router'
import routes 		from './routes.js'
import app 			from './components/app.vue'
import user 		from './components/scripts/user.js'

// window.user = user;
// UNCOMMENT FOR DEBUG PURPOSES ONLY!!!

Vue.use(VueRouter);

var router = new VueRouter({
	hashbang: false,
	history: true
}).map(routes);

router.beforeEach(function (transition) {
	if (!user.loggedIn) {
		if (transition.to.authorizedZone) 
			transition.redirect('/login');
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