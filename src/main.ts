'use strict'

// import 'es6-promise/auto'
// import 'whatwg-fetch'

// import * as _ from 'lodash'
// import * as fp from 'lodash/fp'

import * as Vue from 'vue'
import * as VueRouter from 'vue-router'

import router from './router'

const main = require('./views/main.vue')

const styles = require('./styles/main.scss')
const polyfills = require('./polyfills')

import VueMaterial = require('vue-material')
Vue.use(VueMaterial)

// FIXME: Move this to some other file
const emojione = require('emojione')
Vue.filter('emojify', (value) => {
  return emojione.toImage(value)
})

Vue.use(VueRouter)

const vm = new Vue({
	router,
	...main,
	el: 'main',
})