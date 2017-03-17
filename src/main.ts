'use strict'

import 'babel-polyfill'
import 'whatwg-fetch'

import * as Vue from 'vue'
import * as VuePaginate from 'vue-paginate'
import * as Vue2Filters from 'vue2-filters'

import Vuelidate from 'vuelidate'

import { sync } from 'vuex-router-sync'
import router from './router'
import store from './store'
sync(store, router)

import './filters'
import './material'

const main = require('./views/main.vue')

Vue.use(VuePaginate)
Vue.use(Vuelidate)
Vue.use(Vue2Filters)

new Vue({
	router,
	store,
	...main,
	el: 'main',
})

// Pages
import 'file-loader?name=[name].[ext]!./index.html'

// Styles
import './styles/main.scss'

// Scripts
// import 'expose-loader?$!expose-loader?jQuery!jquery'
// import "expose-loader?Tether!tether"
// import 'bootstrap'
import 'expose-loader?mdc!../node_modules/material-components-web/dist/material-components-web.js'