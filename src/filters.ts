import * as Vue from 'vue'
import * as _ from 'lodash'
import emojione from 'emojione'


// const emojione = require('emojione')

Vue.filter('emojione', (value) => {
  return emojione.toImage(value)
})

Vue.filter('startCase', (value) => {
  return _.startCase(value)
})