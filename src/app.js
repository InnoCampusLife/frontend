import Vue 			from 'vue'
import VueRouter 	from 'vue-router'
import App 			from './components/app.vue'
import routes 		from './routes.js'
	
Vue.use(VueRouter);

var router = new VueRouter({
	hashbang: false,
	history: true
}).map(routes);

router.beforeEach(function (transition) {
	let user = require('./components/scripts/userModel.js');
	if (!user.loggedIn && transition.to.authorizedZone)
		transition.redirect('/login');
	else if (user.loggedIn && transition.to.loginPage)
		transition.redirect('/');
	else //if (user.loggedIn) {
		//if (transition.to.userpage){
		//	//TODO check user's existance
		//}
		//else
		transition.next();
	//}
}).redirect({'*':'/'});

router.start(App, 'app');