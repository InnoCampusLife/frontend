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
	import user from './../scripts/user.js'
	import {accounts} from './../scripts/api.js'

	export default {
		components : {
			sidebar,
			content
		}
	}
</script>