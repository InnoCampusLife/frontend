<template>
	<sidebar user="user"></sidebar>
	<router-view></router-view>
</template>

<script>
	var sidebar = require('./sidebar.vue');

	module.exports = {
		data () {
			return {
				user: {}
			}
		},
		components : {
			sidebar
		},
	}
</script>