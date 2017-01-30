import * as Vue from 'vue'

const emojione = require('emojione')

Vue.filter('emojione', (value) => {
  return emojione.toImage(value)
})