<template>
	<h1>{{ user.username }}'s profile</h1>
	<div block>
		<h2>UIS</h2>
		<pre>{{ user.id }}</pre>
		<pre>{{ user.role }}</pre>
		<pre v-show="user.studyGroup != null">{{ user.studyGroup }}</pre>
		<pre v-show="user.tgId != null">{{ user.tgId }}</pre>
		<pre v-show="user.fullName != ''">{{ user.fullName }}</pre>
		<pre v-if="$loadingRouteData">Data is not updated yet!</pre>
	</div>
</template>

<script>
	import user from './../scripts/user.js'
	import pointsCreate from './innopoints/create_account.vue'

	export default {
		data () {
			return {
				user : user
			}
		},
		components: {
			pointsCreate
		},
		route: {
			data (transition) {
				console.log("Called get in user");
				user.update(transition);
			}
		}
	}
</script>