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
			v-on:oninput="console.log($event)"
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
			oninput="passwordInputEvent"
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
	import {authorize} from './scripts/api.js'
	import {createAccount} from './scripts/api.js'

	export default {
		data () {
			return {
				user : require('./scripts/userModel.js')
			}
		},
		methods : {
			login (e) {
				e.preventDefault();
				//if (this.checkUsernameInput('strict'))
					authorize(this.user.username, password.value, this.formSuccessCallback, this.formErrorCallback);
			},
			register (e) {
				e.preventDefault();
				if (this.checkUsernameInput('strict') && this.checkPasswordInput('strict'))
					createAccount(this.user.username, password.value, this.formSuccessCallback, this.formErrorCallback);
			},
			/// Form Callbacks
			//
			formSuccessCallback (result) {
				this.user.token = result.token;
				this.user.id = result.id;
				this.user.username = result.username;
				this.user.role = result.role;
				this.user.firstName = result.firstName;
				this.user.lastName = result.lastName;
				this.user.studyGroup = result.studyGroup;
				this.user.tgId = result.tgId;
			},
			formErrorCallback (result) {
				// TODO set error tooltip info
			},
			//
			///

			///Reusable LoginData checkers
			//
			usernameInputEvent (e) { checkUsernameInput(); },

			checkUsernameInput (strict = false) {
				console.log('checkLoginInput fired');
				let regex = strict ? /^([0-9]|[a-z]|[A-Z]|[_]){3,32}$/ : /^([0-9]|[a-z]|[A-Z]|[_])*$/;
				let ufe = !regex.test(this.user.username);

				if (ufe)
					setError(inputErrors.usernameFormatError, 'username');
				else
					removeError('username');

				return !ufe;
			},

			passwordInputEvent (e) { checkPasswordInput(); },

			checkPasswordInput (strict = false) {
				console.log('checkLoginInput fired');
				let regex = strict ? /^.{5,64}$/ : /^.*$/;
				let pfe = !regex.test(password.value);

				if (pfe)
					setError(inputErrors.passwordFormatError, 'password');
				else
					removeError('password');

				return !pfe;
			},

			//TODO
			setError (error ,toWhat) {
				console.log(error + ": " + toWhat);
			},

			//TODO
			removeError (fromWhat) {
				console.log(fromWhat);
			}
			//
			///
		}
	}
</script>