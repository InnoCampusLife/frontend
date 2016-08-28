<template>
	<div style="margin: 42px">
		<router-view></router-view>
	</div>
</template>

<script>
	module.exports = {
		route (transition) {
			$route.user.update((result) => {
				transition.next({
					user: result
				});
			});
		}
	}
</script>