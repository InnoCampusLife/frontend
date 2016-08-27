<template>
	<aside sidebar>
		<button menu block v-link="'/profile'"><span class="icon-user"></span></button>

		<button logout block><span class="icon-logout"></span></button>
	</aside>
</template>

<script>
	module.exports = {
		props: ['user'],
	}
</script>