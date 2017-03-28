<style lang="scss" scoped>
	main {
		background-position: center;
		background-size: cover;
		background-image: url('/public/backgrounds/hall.jpg');

		> section {
			background: linear-gradient(to bottom, hsla(0, 0, 100, 0.7) 0%, hsla(0, 0, 100, 0.7));

			> .content {
				display: flex;
				justify-content: center;
				align-items: center;

				> .container-wrapper {
					flex: 1 1 0%;
				}
			}
		}
	}
</style>

<template lang="pug">
	main
		header.app-bar
			md-theme(md-name="dark")
				md-whiteframe(md-tag="md-toolbar", md-elevation="4")
					.md-toolbar-container
						md-button.md-icon-button(@click.native='toggleLeftSidenav' disabled)
							md-icon menu
						.app-bar-container
							.row
								.col
									h1.md-title
										span Unified Information System
		section
			.content
				.container-wrapper
					.container
						.row.align-items-center.justify-content-center
							.col.col-12.col-sm-8.col-lg-4
								md-card
									md-card-content
										md-input-container
											label Username
											md-input(
												type="text",
												name="username",
												id="username",
												v-model="credentials.username",
												@keyup.enter="submit",
											)
										md-input-container
											label Password
											md-input(
												type="password",
												name="password",
												id="password",
												v-model="credentials.password",
												@keyup.enter="submit",
											)
										template(v-if="!isLogin")
											md-input-container
												label Email
												md-input(
													type="email"
													name="email"
													id="email"
													v-model="credentials.email",
													@keyup.enter="submit"
												)
											md-input-container
												label First Name
												md-input(
													type="text"
													name="first-name"
													id="first-name"
													v-model="credentials.firstName",
													@keyup.enter="submit"
												)
											md-input-container
												label Last Name
												md-input(
													type="text"
													name="last-name"
													id="last-name"
													v-model="credentials.lastName",
													@keyup.enter="submit"
												)
											//- // TODO: Replace with select
											//- md-input-container
											//- 	label Study Group
											//- 	md-input(
											//- 		type="text"
											//- 		name="study-group"
											//- 		id="study-group"
											//- 		v-model="credentials.studyGroup",
											//- 		@keyup.enter="submit"
											//- 	)
									md-card-actions
										template(v-if="isLogin")
											md-button(
												type="button",
												@click="isLogin = false",
											)
												span Sign Up
											md-button.md-raised.md-primary(
												type="button",
												@click="submit",
												@keyup.enter="submit",
											)
												span Log In
										template(v-else)
											md-button(
												type="button",
												@click="isLogin = true",
											)
												span Log In
											md-button.md-raised.md-primary(
												type="button",
												@click="submit",
												@keyup.enter="submit",
											)
												span Sing Up
			footer
				p.text-muted 2016 &copy; InnoDev
</template>

<script>
	import { mapActions, mapMutations } from 'vuex'
	import config from './../config'
	import storage from './../storage'

	export default {
		name: 'login',

		data() {
			return {
				user: this.$router.app.user,
				isLogin: true,
				credentials: {
					username: '',
					password: '',
					email: '',
					firstName: '',
					lastName: '',
					studyGroup: '',
				},
			}
		},

		methods: {
			...mapMutations('accounts', [
				'setAccount',
			]),

			submit() {
				if (this.isLogin) {
					this.$root.api.accounts.auth(this.credentials)
						.then((json) => {
							console.log('Logged in:', json.result)
							storage.set(config.tokenName, json.result.token)
						})
						.then(() => {
							this.$router.push('/')
						})
						.catch((err) => {
							console.error('Logging in error:', err)
						})
				} else {
					this.$root.api.accounts.create(this.credentials)
						.then((json) => {
							console.log('Signed up:', json.result)
							storage.set(config.tokenName, json.result.token)
						})
						.then(() => {
							return this.$root.api.innopoints.accounts.create()
						})
						.then(() => {
							this.$router.push('/')
						})
						.catch((err) => {
							console.error('Signing up error:', err)
						})
				}
			},
		},
	}
</script>
