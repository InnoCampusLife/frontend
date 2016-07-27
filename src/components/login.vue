<template>
	<form>
		<!-- TODO : rework oninput events -->
		<input block
			type="text"
			name="username"
			id="username"
			placeholder="Username"
			autocomplete="off"
			maxlength="32"
			autofocus 
			oninput="event.target.__v_model.vm.checkUsernameInput();"
			v-model="user.username"
			@keyup.enter="login"
		>
		<input block
			type="password"
			name="password"
			id="password"
			placeholder="Password"
			autocomplete="off"
			maxlength="64"
			oninput="passwordInputEvent"
			@keyup.enter="login"
		>

		<button block
			@click="login"
			@keyup.enter="login"
		>LOGIN</button>
	</form>
</template>

<script>
	import userModel from './scripts/userModel.js'
	import accountsApi from './scripts/accountsApi.js'

	export default {
		data () {
			return {
				user : userModel
			}
		},
		methods : {
			login (e) {
				e.preventDefault();
				//if (this.checkUsernameInput('strict'))
					accountsApi.authorize(this.user.username, password.value, this.formSuccessCallback, this.formErrorCallback);
			},
			register (e) {
				e.preventDefault();
				if (this.checkUsernameInput('strict') && this.checkPasswordInput('strict'))
					accountsApi.createAccount(this.user.username, password.value, this.formSuccessCallback, this.formErrorCallback);
			},
			/// Form Callbacks
			//
			formSuccessCallback (result) {
				this.user.token.set(result.token);

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
				let regex = strict ? /^([0-9]|[a-z]|[A-Z|_]){3,32}$/ : /^([0-9]|[a-z]|[A-Z|_])*$/;
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

			setError (error ,toWhat) {
				console.log(error + ": " + toWhat);
			},

			removeError (fromWhat) {
				console.log(fromWhat);
			}
			//
			///
		}
	}
</script>