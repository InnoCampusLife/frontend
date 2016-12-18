'use strict'

import * as Vue from 'vue'
import * as VueRouter from 'vue-router'

import newRouter from './router-config'

const  app = require('./views/app.vue')

const VueValidator = require('vue-validator')
const VueAnimatedList = require('vue-animated-list')

const styles = require('./styles/main.scss')
const polyfills = require('./polyfills')

// FIXME: Move this to some other file
const emojione = require('emojione')
Vue.filter('emojify', (value) => {
  return emojione.toImage(value)
})

Vue.use(VueAnimatedList)
Vue.use(VueValidator)
Vue.use(VueRouter)

const router = newRouter(new VueRouter({
	hashbang: false,
	history:  true
}));

router.start(app, 'app')