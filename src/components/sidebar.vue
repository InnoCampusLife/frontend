<template>
	<div block>
		<span>{{ user.role | capitalize }}'s dashboard</span>
	</div>
	<div block>
		<button v-link="'/'"			title="">main</button>
		<button v-link="'/test'"		title="">test</button>
		<button v-link="'/innopoints'"	title="">innopoints</button>
		<button v-link="'/profile'"		title="">my profile</button>
		<button v-link="'/admin_side'"	v-if="user.isAdmin"	title="">admin_side</button>
		<button @click="logout" 		title="">logout</button>
	</div>
</template>

<script>
	export default {
		data () {
			return {
				user : user
			}
		},
		methods : {
			logout () {
				this.user.clear();
				this.$router.go("/login");
			}
		}
	}
</script>