var Vue       = require('vue');
var VueRouter = require('vue-router');
var app       = require('./views/app.vue');
var newRouter = require('./router-config.js');

// window.user = user;
// UNCOMMENT FOR DEBUG PURPOSES ONLY!!!

Vue.use(VueRouter);

var router = newRouter(new VueRouter({
	hashbang: false,
	history:  true
}));

router.start(app, 'app');