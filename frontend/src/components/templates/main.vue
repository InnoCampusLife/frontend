<template>
	<aside sidebar pinned top left style="background-color: #ececec; height: 100vh; width: 200px">
		<sidebar></sidebar>
	</aside>
	<main content style="margin-left: 200px; padding: 16px;">
		<content></content>
	</main>
</template>

<script>
	import sidebar from './sidebar.vue'
	import content from './content.vue'
	import user from './../scripts/user.js'

	export default {
		components : {
			sidebar,
			content
		},
		route : {
			data (transition) {
				user.innopoints.update();
			}
		}
	}
</script>