<template>
	<header>
		<slot></slot>
	</header><!-- /header -->
</template>

<script>
	module.exports = {
		data : function () {
			return {
				user: this.$router.app.user
			}
		}
	}
</script>