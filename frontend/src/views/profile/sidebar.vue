<template>
	<aside besidebar>
		<button menu block v-link="{ name: 'profile', params: { username: user.username } }"><span class="icon-user"></span></button>
		<button menu block v-link="'/friends'"><span class="icon-users"></span></button>
		<button menu block v-link="'/search'" ><span class="icon-search"></span></button>
	</aside>
</template>

<script>
	module.exports = {
		props: ['user'],
	}
</script>