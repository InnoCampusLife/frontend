<template>
	<sidebar></sidebar>
	<content></content>
</template>

<script>
	var sidebar = require('./sidebar.vue');
	var content = require('./../content.vue');

	module.exports = {
		components : {
			sidebar,
			content
		}
	}
</script>