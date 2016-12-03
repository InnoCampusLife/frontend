<template>
	<main class="content">
		<main-header>
			<slot name="header"></slot>
		</main-header>
		<div class="content-main py-1" scroller-x scroller-y>
			<router-view></router-view>
			<!--TODO place footer here-->
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
