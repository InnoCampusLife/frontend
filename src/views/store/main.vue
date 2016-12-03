<template>
	<content>
		<div content slot="header" flex align center>
			<div class="container-fluid">
				<div class="input-group">
					<input class="form-control" type="search" id="search" search inline placeholder="Search store" v-model="$router.app.query" v-show="$route.path.endsWith('store')">
					<span class="input-group-btn">
						<button class="btn btn-secondary" type="button">🔍</button>
					</span>
				</div>
			</div>
		</div>
	</content>
</template>

<script>
	module.exports = {
		components : {
			content: require('./../content.vue')
		}
	}
</script>