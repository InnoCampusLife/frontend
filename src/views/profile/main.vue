<template lang="jade">
	content
		div(slot='header')
			h1.header-title Profile
</template>

<script>

	import content from './../content.vue';

	export default {

		components: {
			content:content
		},

		data() {
			return {
				user: {}
			}
		},
	}
</script>