<template lang="jade">
	content-view
		div(slot='header')
			h1.header-title Profile
</template>

<script>

	import contentView from './../content.vue';

	export default {
		name: 'profile-main',

		components: {
			contentView
		},

		data() {
			return {
				user: {}
			}
		},
	}
</script>