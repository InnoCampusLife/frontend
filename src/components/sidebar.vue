<template>
	<button v-link="'/'"		title="">main</button>
	<button v-link="'/test'"	title="">test</button>
	<button @click="logout" 	title="">logout</button>
</template>

<script>
	import userModel from './scripts/userModel.js'

	export default {
		data () {
			return {
				user : userModel
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