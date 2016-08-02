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

	export default {
		components : {
			sidebar,
			content
		}
	}
</script>