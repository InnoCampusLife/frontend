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
										template(v-if="isLogin")
											md-input-container(:class="{ 'md-input-invalid': $v.login.username.$error }")
												md-icon person_outline
												label(for="login-username") Username
												md-input(
													type="text",
													name="login-username",
													id="login-username",
													v-model="login.username",
													@keyup.enter="submit",
													@input="$v.login.username.$touch()",
												)
												span.md-error(v-if="!$v.login.username.required")
													span Required

											md-input-container(:class="{ 'md-input-invalid': $v.login.password.$error }")
												md-icon lock_outline
												label(for="login-password") Password
												md-input(
													type="password",
													name="login-password",
													id="login-password",
													v-model="login.password",
													@keyup.enter="submit",
													@input="$v.login.password.$touch()",
												)
												span.md-error(v-if="!$v.login.password.required")
													span Required

										template(v-if="!isLogin")
											md-input-container(:class="{ 'md-input-invalid': $v.signup.firstName.$error }")
												md-icon
												label(for="first-name") First Name
												md-input(
													type="text",
													name="first-name",
													id="first-name",
													maxlength="35",
													v-model="signup.firstName",
													@keyup.enter="submit",
													@input="$v.signup.firstName.$touch()",
												)
												span.md-error(v-if="!$v.signup.firstName.required")
													span Required
												span.md-error(v-else-if="!$v.signup.firstName.maxLength")
													span Too long
												span.md-error(v-else-if="!$v.signup.firstName.valid")
													span Invalid

											md-input-container(:class="{ 'md-input-invalid': $v.signup.lastName.$error }")
												md-icon
												label(for="last-name") Last Name
												md-input(
													type="text",
													name="last-name",
													id="last-name",
													maxlength="35",
													v-model="signup.lastName",
													@keyup.enter="submit",
													@input="$v.signup.lastName.$touch()",
												)
												span.md-error(v-if="!$v.signup.lastName.required")
													span Required
												span.md-error(v-else-if="!$v.signup.lastName.maxLength")
													span Too long
												span.md-error(v-else-if="!$v.signup.lastName.valid")
													span Invalid

											md-input-container(:class="{ 'md-input-invalid': $v.signup.email.$error }")
												md-icon mail_outline
												label(for="email") Email
												md-input(
													type="email",
													name="email",
													id="email",
													maxlength="255",
													v-model="signup.email",
													@keyup.enter="submit",
													@input="$v.signup.email.$touch()",
												)
												span.md-error(v-if="!$v.signup.email.required")
													span Required
												span.md-error(v-else-if="!$v.signup.email.minLength")
													span Too short
												span.md-error(v-else-if="!$v.signup.email.maxLength")
													span Too long
												span.md-error(v-else-if="!$v.signup.email.valid")
													span Invalid

											md-input-container(:class="{ 'md-input-invalid': $v.signup.username.$error }")
												md-icon person_outline
												label(for="username") Username
												md-input(
													type="text",
													name="username",
													id="username",
													maxlength="16",
													v-model="signup.username",
													@keyup.enter="submit",
													@input="$v.signup.username.$touch()",
												)
												span.md-error(v-if="!$v.signup.username.required")
													span Required
												span.md-error(v-else-if="!$v.signup.username.minLength")
													span Too short
												span.md-error(v-else-if="!$v.signup.username.maxLength")
													span Too long
												span.md-error(v-else-if="!$v.signup.username.valid")
													span Invalid

											md-input-container(:class="{ 'md-input-invalid': $v.signup.password.$error }")
												md-icon lock_outline
												label(for="password") Password
												md-input(
													type="password",
													name="password",
													id="password",
													v-model="signup.password",
													@keyup.enter="submit",
													@input="$v.signup.password.$touch()",
												)
												span.md-error(v-if="!$v.signup.password.required")
													span Required
												span.md-error(v-else-if="!$v.signup.password.minLength")
													span Too short
												span.md-error(v-else-if="!$v.signup.password.maxLength")
													span Too long

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
	import { required, minLength, maxLength } from 'vuelidate/lib/validators'
	import { mapActions, mapMutations } from 'vuex'
	import config from './../config'
	import storage from './../storage'

	export default {
		name: 'login',

		data () {
			return {
				isLogin: true,

				login: {
					username: '',
					password: '',
				},

				signup: {
					username: '',
					password: '',
					email: '',
					firstName: '',
					lastName: '',
					studyGroup: '',
				},
			}
		},

		validations: {
			login: {
				username: {
					required,
				},

				password: {
					required,
				},
			},

			signup: {
				username: {
					required,
					minLength: minLength(3),
					maxLength: maxLength(16),

					valid (username) {
						return /^\w{3,16}$/.test(username)
					},
				},

				password: {
					required,
					minLength: minLength(8),
					maxLength: maxLength(64),
				},

				email: {
					required,
					minLength: minLength(7),
					maxLength: maxLength(255),

					valid (firstName) {
						return /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(firstName)
					},
				},

				firstName: {
					required,
					maxLength: maxLength(35),

					valid (firstName) {
						return /^[\w -]{1,35}$/.test(firstName)
					},
				},

				lastName: {
					required,
					maxLength: maxLength(35),

					valid (lastName) {
						return /^[\w -]{1,35}$/.test(lastName)
					},
				},
			},
		},

		methods: {
			submit() {
				if (this.isLogin) {

					// Log in
					this.$root.api.accounts.auth(this.login)
						.then((json) => {
							console.log('Logged in:', json.result)
							storage.setItem(config.tokenName, json.result.token)
						})
						.then(() => {
							this.$router.push('/')
						})
						.catch((err) => {
							console.error('Logging in error:', err)
						})
				} else {

					// Sign up
					this.$root.api.accounts.create(this.signup)
						.then((json) => {
							console.log('Signed up:', json.result)
							storage.setItem(config.tokenName, json.result.token)
						})
						.then(() => {
							// Sing up for Innopoints account using just the token
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
