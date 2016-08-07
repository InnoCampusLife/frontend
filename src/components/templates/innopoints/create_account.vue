<template>
	<button @click="createAccount">Create Innopoints Account!</button>
</template>

<script>
	import api from './../../scripts/api.js'
	import user from './../../scripts/user.js'

	export default {
		methods : {
			createAccount (e) {
				api.innopoints.createAccount(
					user.token,
					function (result) {
						user.points.set(result);
						location.reload();
					},
					function (error) {
						//TODO - error handling
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
						user.points.set(result);
						transition.abort();
					},
					transition.next
				);
			}
		}
	}
</script>