<template>
	<aside besidebar>
		<button menu block v-link="{ name: 'applications' }"><span class="icon-archive"></span></button>
		<button menu block v-link="{ name: 'apply' }" ><span class="icon-doc-text"></span></button>
	</aside>
</template>

<script>
	module.exports = {
		props: ['user'],
	}
</script>