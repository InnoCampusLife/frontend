'use strict'

import * as Vue from 'vue'
import * as VueRouter from 'vue-router'

import newRouter from './router-config'

const  app = require('./views/app.vue')

// const filter = require('vue-bulma-emoji').filter
const VueValidator = require('vue-validator')

const styles = require('./styles/main.less')
const polyfills = require('./polyfills')

Vue.use(VueValidator)
Vue.use(VueRouter)

const router = newRouter(new VueRouter({
	hashbang: false,
	history:  true
}));

router.start(app, 'app')
