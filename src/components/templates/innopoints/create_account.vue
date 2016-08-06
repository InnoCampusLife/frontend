<template>
	<button @click="createAccount">Create Account!</button>
</template>

<script>
	import api from './../../../scripts/api.js'
	import user from './../../../scripts/user.js'

	export default {
		methods : {
			createAccount (e) {
				api.innopoints.createAccount(
					user.token,
					user.points.set,
					function (error) {
						alert("Unable to create account : " + error);
					}
				);
			}
		},
		route : {
			data (transition) {
				api.innopoints.getAccount(
					user.token,
					function (result) {
						transition.abort();
					},
					function (error) {
						transition.next();
					}
				);
			}
		}
	}
</script>