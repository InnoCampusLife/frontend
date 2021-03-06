'use strict'

import 'babel-polyfill'
import 'whatwg-fetch'

import Vuelidate from 'vuelidate'

// import debug from 'debug'

// localStorage.debug = ['uis:log', 'uis:error', 'uis:info']

// const log = debug('uis:log')
// const err = debug('uis:error')
// const info = debug('uis:info')

// log.log = console.log.bind(console)
// err.log = console.error.bind(console)
// info.log = console.info.bind(console)

// debug('Debug is required!')
// log('Debug is required!')
// err('Debug is required!')
// info('Debug is required!')

import * as Vue from 'vue'
import * as VuePaginate from 'vue-paginate'
import * as Vue2Filters from 'vue2-filters'
import * as VueResource from 'vue-resource'
import * as VueAsyncComputed from 'vue-async-computed'

import { sync as vuexRouterSync } from 'vuex-router-sync'


// Local imports

import './filters'
import './material'

import router from './router'
import store from './store'

// Styles
import './styles/main.scss'

// Scripts
// import 'expose-loader?$!expose-loader?jQuery!jquery'
// import "expose-loader?Tether!tether"
// import 'bootstrap'
// import 'expose-loader?mdc!../node_modules/material-components-web/dist/material-components-web.js'

vuexRouterSync(store, router)

Vue.use(VuePaginate)
Vue.use(Vuelidate)
Vue.use(Vue2Filters)
Vue.use(VueResource)
Vue.use(VueAsyncComputed)

new Vue({
	...require('./views/main.vue'),
	router,
	store,
	el: 'main',
})
