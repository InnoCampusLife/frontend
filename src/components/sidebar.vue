<template>
	<button v-link="'/'"			title="">main</button>
	<button v-link="'/test'"		title="">test</button>
	<button v-link="'/innopoints'"	title="">innopoints</button>
	<button @click="logout" 		title="">logout</button>
</template>

<script>
	export default {
		data () {
			return {
				user : require('./scripts/userModel.js')
			}
		},
		methods : {
			logout () {
				this.user.storage.clear();

				this.user.firstName = "";
				this.user.lastName = "";
				this.user.patronymic = "";
				this.user.role = "";
				this.user.studyGroup = "";
				this.user.tgId = "";
				this.user.id = "";

				this.$router.go("/login");
			}
		}
	}
</script>