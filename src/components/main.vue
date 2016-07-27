<template>
	<aside sidebar>
		<sidebar></sidebar>
	</aside>
	<main content>
		<content></content>
	</main>
</template>

<script>
	import sidebar from './sidebar.vue'
	import content from './content.vue'
	import userModel from './scripts/userModel.js'

	export default {
		data () {
			return {
				user : userModel
			}
		},
		components : {
			sidebar,
			content
		}
	}
</script>