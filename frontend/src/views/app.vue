<template>
	<router-view></router-view>
</template>

<script>
	module.exports = {
		ready : function () {
			console.log('App is awaiting your command!');
		},
		data : function () {
			return {
				user : {
					account: require('./../modules.js').accounts,
					innopoints: require('./../modules.js').innopoints
				},
				query : null,
			}
		}
	}
</script>