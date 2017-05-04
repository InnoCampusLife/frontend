import * as Vue from 'vue'
import { startCase } from 'lodash'
import emojione from 'emojione'


// const emojione = require('emojione')

Vue.filter('emojione', (value) => {
  return emojione.toImage(value)
})

Vue.filter('startCase', (value) => {
  return startCase(value)
})