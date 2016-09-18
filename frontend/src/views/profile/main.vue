<template>
	<!-- <sidebar></sidebar> -->
	<content>
		<div slot="header">
			
		</div>
	</content>
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