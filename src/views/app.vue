<template>
	<router-view></router-view>
</template>

<script>
	module.exports = {
		ready : function () {
			console.log('App is awaiting your command!');
		},
		data : function () {
			var Vue = require('Vue');
			var bus = new Vue();
			var modules = require('./../modules.js');
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