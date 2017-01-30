import * as Vue from 'vue'
import * as VueMaterial from 'vue-material'

Vue.use(VueMaterial)

;(Vue as any).material.registerTheme({
	default: {
		primary: 'teal',
		accent: 'cyan',
		background: 'white',
	},
  dark: {
		primary: 'teal',
		accent: 'white',
		background: 'black',
  },
	sidenav: {
		primary: 'white',
		background: 'white',
	},
	blue: {
		primary: 'blue',
	},
})