var Vue       = require('vue');
var VueRouter = require('vue-router');
var routes    = require('./routes.js');
var user      = require('./models/user.js');
var app       = require('./views/app.vue');

window.user = user;
// UNCOMMENT FOR DEBUG PURPOSES ONLY!!!

Vue.use(VueRouter);

var router = new VueRouter({
	hashbang: false,
	history:  true
}).map(routes);

// TODO: restore routing
router.beforeEach((transition) => {
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
				if (user.is.uis.moderator)
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