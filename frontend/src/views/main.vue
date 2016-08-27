<template>
	<sidebar user="user"></sidebar>
	<content></content>
</template>

<script>
	var sidebar = require('./sidebar.vue');
	var content = require('./content.vue');
	var user = require('./../models/user.js')

	module.exports = {
		data () {
			return {
				user: user
			}
		},
		components : {
			sidebar,
			content
		},
	}
</script>