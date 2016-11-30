'use strict';

var Vue       = require('vue');
var VueRouter = require('vue-router');
var app       = require('./views/app.vue');
var newRouter = require('./router-config.js');

require('./styles/main.less')

Vue.use(VueRouter);

var router = newRouter(new VueRouter({
	hashbang: false,
	history:  true
}));

router.start(app, 'app');

// Polyfills

if (!String.prototype.includes) {
	String.prototype.includes = () => {
		return String.prototype.indexOf.apply(this, arguments) !== -1;
	};
}

if (!Array.prototype.includes) {
	Array.prototype.includes = (searchElement /*, fromIndex*/) => {
		if (this == null) {
			throw new TypeError('Array.prototype.includes called on null or undefined');
		}
		var O = Object(this);
		var len = parseInt(O.length, 10) || 0;
		if (len === 0) {
			return false;
		}
		var n = parseInt(arguments[1], 10) || 0;
		var k;
		if (n >= 0) {
			k = n;
		} else {
			k = len + n;
			if (k < 0) {k = 0;}
		}
		var currentElement;
		while (k < len) {
			currentElement = O[k];
			if (searchElement === currentElement ||
		     (searchElement !== searchElement && currentElement !== currentElement)) { // NaN !== NaN
				return true;
			}
			k++;
		}
		return false;
	};
}