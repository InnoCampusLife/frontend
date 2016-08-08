<template>
	<form stacked>
		<!-- TODO : rework oninput events -->
		<input
			type="text"
			name="username"
			id="username"
			placeholder="Username"
			autocomplete="off"
			maxlength="32"
			autofocus 
			v-on:input="usernameInputEvent"
			v-model="user.username"
			@keyup.enter="login"
		>
		<input
			type="password"
			name="password"
			id="password"
			placeholder="Password"
			autocomplete="off"
			maxlength="64"
			v-on:input="passwordInputEvent"
			@keyup.enter="login"
		>
		<div>
			<button
				type="button"
				@click="login"
				@keyup.enter="login"
			>login</button>

			<button
				type="button"
				@click="register"
				@keyup.enter="register"
			>register</button>
		</div>
	</form>
</template>

<script>
	import user from './../scripts/user.js'

	export default {
		data () {
			return {
				user : user
			}
		},
		methods : {
			login (e) {
				e.preventDefault();
				this.user.authorize(password.value, this.formSuccessCallback, this.formErrorCallback);
			},
			register (e) {
				e.preventDefault();
				if (this.checkUsernameInput('strict') && this.checkPasswordInput('strict'))
					this.user.authorize(password.value, this.formSuccessCallback, this.formErrorCallback);
			},
			/// Form Callbacks
			//
			formSuccessCallback (result) {
				this.user.set(result);
				this.$router.go("/");
			},
			formErrorCallback (result) {
				// TODO set error tooltip info
			},
			//
			///

			///Reusable LoginData checkers
			//
			usernameInputEvent (e) { this.checkUsernameInput(); },

			checkUsernameInput (strict = false) {
				let regex = strict ? /^([0-9]|[a-z]|[A-Z]|[_]){3,32}$/ : /^([0-9]|[a-z]|[A-Z]|[_])*$/;
				let ufe = !regex.test(this.user.username);

				if (ufe)
					this.setError("Username must contain at least 3 alphanumeric characters!", 'username');
				else
					this.removeError('username');

				return !ufe;
			},

			passwordInputEvent (e) { this.checkPasswordInput(); },

			checkPasswordInput (strict = false) {
				let regex = strict ? /^.{5,64}$/ : /^.*$/;
				let pfe = !regex.test(password.value);

				if (pfe)
					this.setError("Password must be more than 8 symbols long!", 'password');
				else
					this.removeError('password');

				return !pfe;
			},

			//TODO
			setError (error ,toWhat) {
				console.log(error);
			},

			//TODO
			removeError (fromWhat) {
				// console.log(fromWhat);
			}
			//
			///
		}
	}
</script>