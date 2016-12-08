<template lang="jade">
	content
		div(slot='header')
			div
				h1.header-title Accounts
</template>

<script>
	var content = require('./../content.vue');

	module.exports = {
		components: {
			content:content
		}
	}
</script>