var Vue       = require('vue');
var VueRouter = require('vue-router');
var routes    = require('./routes.js');
var app       = require('./views/app.vue');

// window.user = user;
// UNCOMMENT FOR DEBUG PURPOSES ONLY!!!

Vue.use(VueRouter);

var router = new VueRouter({
	hashbang: false,
	history:  true
}).map(routes);

// TODO: restore routing
router/*.beforeEach(function (transition) {
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
})*/.redirect({'*':'/'}).alias({'/':'/profile'});

router.start(app, 'app');