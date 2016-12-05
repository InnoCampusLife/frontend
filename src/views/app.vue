<template>
	<router-view></router-view>
</template>

<script>
	module.exports = {
		ready : function () {
			console.log('App is awaiting your command!');
		},
		data : function () {
			var modules = require('./../modules.ts');
			return {
				user : {
					account: modules.accounts,
					innopoints: modules.innopoints
				},
				query : null
			}
		}
	}
</script>