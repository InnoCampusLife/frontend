'use strict'

import 'babel-polyfill'
import 'whatwg-fetch'

import * as Vue from 'vue'
import Vuelidate from 'vuelidate'
const Vue2Filters = require('vue2-filters')

import router from './router'
import store from './store'

import './filters'
import './material'

const main = require('./views/main.vue')

Vue.use(Vuelidate)
Vue.use(Vue2Filters)

new Vue({
	router,
	store,
	...main,
	el: 'main',
})

// Styles
import './styles/main.scss'

// Scripts
import 'expose-loader?$!expose-loader?jQuery!jquery'
import "expose-loader?Tether!tether"
import 'bootstrap'
import 'expose-loader?mdc!../node_modules/material-components-web/dist/material-components-web.js'