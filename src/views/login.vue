<template lang="jade">

	.login-page
		.wrap
			header.header
				h1 Unified Information System

			.form
				form.form-group
					// TODO: rework oninput events
					.form-group
						input.form-control(
							type="text"
							name="username"
							id="username"
							placeholder="Username"
							autocompvare="off"
							maxlength="32"
							v-on:input="usernameInputEvent"
							v-model="user.account.username"
							@keyup.enter="isLogin ? login($event): register($event)"
						)

					.form-group
						input.form-control(
							type="password"
							name="password"
							id="password"
							placeholder="Password"
							autocompvare="off"
							maxlength="64"
							v-on:input="passwordInputEvent"
							@keyup.enter="isLogin ? login($event): register($event)"
						)

					div(v-show="!isLogin" transition="height" transition-mode="out-in")
						.form-group
							input.form-control(
								type="email"
								name="email"
								id="email"
								placeholder="Email"
								autocompvare="off"
								v-on:input="emailInputEvent"
								@keyup.enter="isLogin ? login($event): register($event)"
							)

						.form-group
							input.form-control(
								type="text"
								name="firstname"
								id="firstname"
								placeholder="First Name"
								autocompvare="off"
								v-on:input="usernameInputEvent"
								v-model="user.account.firstName"
								@keyup.enter="isLogin ? login($event): register($event)"
							)

						.form-group
							input.form-control(
								type="text"
								name="lastname"
								id="lastname"
								placeholder="Last Name"
								autocompvare="off"
								v-on:input="usernameInputEvent"
								v-model="user.account.lastName"
								@keyup.enter="isLogin ? login($event): register($event)"
							)

						.form-group
							input.form-control(
								type="text"
								name="group"
								id="group"
								placeholder="Study Group (BS1-2, BS4-1)"
								autocompvare="off"
								v-on:input="usernameInputEvent"
								v-model="user.account.studyGroup"
								@keyup.enter="isLogin ? login($event): register($event)"
							)

					template(v-if="isLogin")
						button.btn.btn-block.btn-primary(
							:place="isLogin ? 'form': 'bottom'" purp="login",
							type="button",
							@click="login",
							@keyup.enter="login",
						) Log In

						button.btn.btn-block.btn-info(
							:place="isLogin ? 'bottom': 'form'",
							type="button",
							@click="register",
							@keyup.enter="register",
						) Sign Up?

					template(v-else="isLogin")
						button.btn.btn-block.btn-primary(
							:place="isLogin ? 'bottom': 'form'",
							type="button",
							@click="register",
							@keyup.enter="register",
						) Sign Up

						button.btn.btn-block.btn-info(
							:place="isLogin ? 'form': 'bottom'" purp="login",
							type="button",
							@click="login",
							@keyup.enter="login",
						) Log In?

			footer.footer-main
				p.text-muted 2016 © InnoDev

</template>

<script>
	export default {

		name: 'login',

		data() {
			return {
				user: this.$router.app.user,
				isLogin: true
			}
		},

		methods: {
			login(e) {
				e.preventDefault();
				if (this.isLogin)
					this.user.account.authorize(
						password.value,
						this.formSuccessCallback,
						this.formErrorCallback
					);
				else {
					this.isLogin = true;
					e.target.blur();
				}
			},

			register(e) {
				e.preventDefault();
				if (!this.isLogin) {
					if (this.checkUsernameInput('strict')
					 && this.checkPasswordInput('strict')
					 && this.checkEmailInput()
					 && this.checkNameInput())
						this.user.account.create(
							password.value,
							email.value,
							this.formSuccessCallback,
							this.formErrorCallback
						);
				}
				else {
					this.isLogin = false;
					e.target.blur();
				}
			},

			formSuccessCallback : function (result) {
				this.user.account.set(result);
				this.$router.push("/");
			},
			formErrorCallback : function (result) {
				//this.setError(result, 'username');
			},

			///Reusable LoginData checkers
			usernameInputEvent(e) {
				this.checkUsernameInput();
			},

			checkUsernameInput(strict) {
				var regex = strict ? /^([0-9]|[a-z]|[A-Z]|[_]){3,32}$/: /^([0-9]|[a-z]|[A-Z]|[_])*$/;
				var ufe = !regex.test(this.user.account.username);

				if (ufe)
					this.setError('username');
				else
					this.removeError('username');

				return !ufe;
			},

			passwordInputEvent(e) {
				this.checkPasswordInput();
			},

			checkPasswordInput(strict) {
				var regex = strict ? /^.{5,64}$/: /^.*$/;
				var pfe = !regex.test(password.value);

				if (pfe)
					this.setError('password');
				else
					this.removeError('password');

				return !pfe;
			},

			emailInputEvent(e) {
				this.checkEmailInput();
			},

			checkEmailInput() {
				var regex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
				var pfe = !regex.test(email.value);

				if (pfe)
					this.setError('email');
				else
					this.removeError('email');

				return !pfe;
			},

			nameInputEvent(e) {
				this.checkNameInput();
			},

			checkNameInput() {
				//([BS]|[MS])[1-4]-[0-9]+
				var regex = /^.+$/
				var pfe = !regex.test(firstname.value) && !regex.test(lastname.value);

				if (pfe) {
					this.setError('firstname');
					this.setError('lastname');
				}
				else {
					this.removeError('firstname');
					this.removeError('lastname');
				}

				return !pfe;
			},

			//TODO
			setError(toWhat) {
				var elem = document.getElementById(toWhat);
				elem.setAttribute('error', '');
			},

			//TODO
			removeError(fromWhat) {
				var elem = document.getElementById(fromWhat);
				elem.removeAttribute('error');
			},

			// usernameHasError() { return document.getElementById('username').hasAttribure('error'); },
			// passwordHasError() { return  document.getElementById('password').hasAttribure('error'); },
			// emailHasError() { return document.getElementById('email').hasAttribure('error'); },
			// firstnameHasError() { return document.getElementById('firstname').hasAttribure('error'); },
			// lastnameHasError() { return document.getElementById('lastname').hasAttribure('error'); },
		}
	}
</script>