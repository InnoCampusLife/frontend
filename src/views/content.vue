<template>
	<main content>
		<main-header>
			<slot name="header"></slot>
		</main-header>
		<div class="content-main py-1" scroller-x scroller-y>
			<router-view></router-view>
		</div>
	</main>
</template>

<script>
	import mainHeader from './header.vue';

	module.exports = {
		data() {
			return {
				user: this.$root.user
			}
		},
		components: {
			mainHeader
		}
	}
</script>