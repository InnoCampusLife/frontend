<template>
	<section flex>
		<router-view></router-view>
	</section>
</template>

<script>
	module.exports = {
		route (transition) {
			// $route.user.update((result) => {
			// 	transition.next({
			// 		user: result
			// 	});
			// });
		}
	}
</script>