<template>
	<sidebar></sidebar>
	<content>
		<div content slot="header">
			<button item v-link="{ name: 'apply', params: { username: $router.app.user.account.username } }">Request Innopoints</button>
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