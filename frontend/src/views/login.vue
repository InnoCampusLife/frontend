<template>
<!-- <link type="text/css" rel="stylesheet" href="/css/login.css"> -->
<style type="text/css" media="screen">
	main[wrapper] * {
		box-sizing: border-box;
		margin: 0;
		padding: 0;
	}

	main[wrapper][login] [container] {
		font-family: 'Source Sans Pro', sans-serif;
		color: white;
		font-weight: 100;
	}

	main[wrapper][login] [container] ::-webkit-input-placeholder,
	main[wrapper][login] [container] :-moz-placeholder,
	main[wrapper][login] [container] :-ms-input-placeholder,
	main[wrapper][login] [container] ::-moz-placeholder {
		font-family: 'Source Sans Pro', sans-serif;
		color: white;
		opacity: 1;
		font-weight: lighter;
	}
	main[wrapper][login] {
		transition: none;
		/* background: -webkit-linear-gradient(top left, #50a3a2 0%, #53e3a6 100%); */
		background: hsl(225, 14%, 22%);
		position: absolute;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		overflow: hidden;
	}
	main[wrapper][form-success] [container] h1 {
		transform: translateY(85px);
	}
	[container] {
	    z-index: 1;
	    max-width: 600px;
	    text-align: center;
	}
	[container] h1 {
		font-size: 40px;
		transition-duration: 1s;
		transition-timing-function: ease-in-put;
		font-weight: 200;
	}

	main[wrapper] form {
		height: 25rem;
	    padding: 20px 0;
	    position: relative;
	    text-align: center;
	    z-index: 2;
	}

	main[wrapper] form input {
		-webkit-appearance: none;
		-moz-appearance: none;
		appearance: none;
		outline: 0;
		border: 0;
		background-color: rgba(255, 255, 255, 0.2);
		width: 250px;
		border-radius: 5px;
		padding: 10px 15px;
		margin: 0 auto 10px auto;
		display: block;
		/* text-align: center; */
		font-size: 18px;
		color: white;
		transition-duration: 0.25s;
	}

	main[wrapper] form input[error] {
		border: 1px solid red;
	}

	main[wrapper] form input:hover {
		background-color: rgba(255, 255, 255, 0.4);
	}

	main[wrapper] form input:active,
	main[wrapper] form input:focus {
		background-color: rgba(255,255,255,0.25);
	}

	main[wrapper] form button[place] {
	    -webkit-appearance: none;
	    -moz-appearance: none;
	    appearance: none;
	    position: absolute;
	    padding: 10px 15px;
	    color: #fff;
	    font-size: 1.2rem;
	    outline: 0;
	    border: 0;
	    border-top: 1px solid transparent;
	    cursor: pointer;
	    transform: translate3d(-50%,0,0);
	    transition: transform ease .5s, width ease .5s, background-color ease .2s, border-color ease .3s;
	    -webkit-user-select: none;
	    -moz-user-select: none;
	    -ms-user-select: none;
	    user-select: none;
	}

	main[wrapper] form button[place="form"] {
	    border-radius: 5px;
	    width: 250px;
	    background-color: rgba(255,255,255,0.3);
	}

	main[wrapper] form button[place="bottom"][purp="login"] {
	    transform: translate3d(-50%,5rem,0);
	}

	main[wrapper] form button[place="form"]:focus {
		background-color: rgba(255,255,255,0.2);
	}

	main[wrapper] form button[place="form"]:hover {
		background-color: rgba(255,255,255,0.4);
		/* transition: transform ease 0.5s, width ease .5s, background-color ease 0s, border-color ease .3s; */

	}
	main[wrapper] form button[place="form"]:active {
		background-color: rgba(255,255,255,.6);
	}

	main[wrapper] form button[place="bottom"] {
	    width: 7rem;
	    transform: translate3d(-50%,18.2rem,0);
	    z-index: 99;
	    border-top: 1px solid #fff;
	}

	main[wrapper] button[place="bottom"]:active,
	main[wrapper] button[place="bottom"]:hover {
	    border-top: 1px solid transparent;
	}

	main[wrapper] [background] {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 0;
		opacity: 0.5;
		background: url('http://66.media.tumblr.com/c548439697291ff097986d530edee2ed/tumblr_npz4tbnGlA1uv05vvo4_1280.jpg');
		background-repeat: no-repeat;
		background-position: center;
		background-size: cover;
	}
	/* main[wrapper] [background] li {
		position: absolute;
		list-style: none;
		display: block;
		width: 40px;
		height: 40px;
		background-color: #fff;
		opacity: 0.5;
		bottom: -160px;
		animation: square 25s infinite;
		transition-timing-function: linear; Chrome, Safari, Opera
		animation-delay: calc(12s + 60s);
	}
	main[wrapper] [background] li:nth-child(1) {
		left: 10%;
	}
	main[wrapper] [background] li:nth-child(2) {
		left: 20%;
		width: 80px;
		height: 80px;
		animation-delay: calc(2s + 60s);
		animation-duration: 17s;
	}
	main[wrapper] [background] li:nth-child(3) {
		left: 25%;
		animation-delay: calc(4s + 60s);
	}
	main[wrapper] [background] li:nth-child(4) {
		left: 40%;
		width: 60px;
		height: 60px;
		animation-duration: 22s;
		opacity: 0.25;
	}
	main[wrapper] [background] li:nth-child(5) {
		left: 70%;
	}
	main[wrapper] [background] li:nth-child(6) {
		left: 80%;
		width: 120px;
		height: 120px;
		animation-delay: calc(3s + 60s);
		opacity: 0.07;
	}
	main[wrapper] [background] li:nth-child(7) {
		left: 32%;
		width: 160px;
		height: 160px;
		animation-delay: calc(7s + 60s);
	}
	main[wrapper] [background] li:nth-child(8) {
		left: 55%;
		width: 20px;
		height: 20px;
		animation-delay: calc(15s + 60s);
		animation-duration: 40s;
	}
	main[wrapper] [background] li:nth-child(9) {
		left: 25%;
		width: 10px;
		height: 10px;
		animation-delay: calc(2s + 60s);
		animation-duration: 40s;
		opacity: 0.05;
	}
	main[wrapper] [background] li:nth-child(10) {
		left: 90%;
		width: 160px;
		height: 160px;
		animation-delay: calc(11s + 60s);
	}
	@keyframes square {
		0% {
			transform: translateY(0);
		}
		100% {
			transform: translateY(-160vh) rotate(600deg);
		}
	} */
</style>
<main wrapper login flex center children scroller-y>
	<div container>
		<!-- <h1 style="font-family: 'Source Sans Pro', sans-serif;color: white;font-weight:lighter;">Welcome</h1> -->
		<form login>
			<!-- TODO : rework oninput events -->
			<input
				type="text"
				name="username"
				id="username"
				placeholder="Username"
				autocomplete="off"
				maxlength="32"
				v-on:input="usernameInputEvent"
				v-model="user.account.username"
				@keyup.enter="isLogin ? login($event) : register($event)"
			>
			<input
				type="password"
				name="password"
				id="password"
				placeholder="Password"
				autocomplete="off"
				maxlength="64"
				v-on:input="passwordInputEvent"
				@keyup.enter="isLogin ? login($event) : register($event)"
			>
			<div v-show="!isLogin" transition="height" transition-mode="out-in" style="height:212px"> 
				<input
					type="email"
					name="email"
					id="email"
					placeholder="Email"
					autocomplete="off"
					v-on:input="emailInputEvent"
					@keyup.enter="isLogin ? login($event) : register($event)"
				>
				<input
					type="text"
					name="firstname"
					id="firstname"
					placeholder="First Name"
					autocomplete="off"
					v-on:input="/*usernameInputEvent*/"
					v-model="user.account.firstName"
					@keyup.enter="isLogin ? login($event) : register($event)"
				>
				<input
					type="text"
					name="lastname"
					id="lastname"
					placeholder="Last Name"
					autocomplete="off"
					v-on:input="/*usernameInputEvent*/"
					v-model="user.account.lastName"
					@keyup.enter="isLogin ? login($event) : register($event)"
				>
				<input
					type="text"
					name="group"
					id="group"
					placeholder="Study Group (BS1-2, BS4-1)"
					autocomplete="off"
					v-on:input="/*usernameInputEvent*/"
					v-model="user.account.studyGroup"
					@keyup.enter="isLogin ? login($event) : register($event)"
				>
			</div>

			<button :place="isLogin ? 'form' : 'bottom'" style="color:#fff" purp="login"
				type="button"
				@click="login"
				@keyup.enter="login"
			>Log in</button>
			<button :place="isLogin ? 'bottom' : 'form'" style="color:#fff"
				type="button"
				@click="register"
				@keyup.enter="register"
			>Register</button>
		</form>
	</div>
	<ul background>
<!-- 		<li></li>
		<li></li>
		<li></li>
		<li></li>
		<li></li>
		<li></li>
		<li></li>
		<li></li>
		<li></li>
		<li></li> -->
	</ul>
</main>
</template>

<script>
	module.exports =  {
		data  : function () {
			return {
				user : this.$router.app.user,
				isLogin : true
			}
		},
		methods : {
			login  : function (e) {
				e.preventDefault();
				if (this.isLogin)
					this.user.account.authorize(password.value, this.formSuccessCallback, this.formErrorCallback);
				else {
					this.isLogin = true;
					e.target.blur();
				}
			},
			register  : function (e) {
				e.preventDefault();
				if (!this.isLogin) {
					if (this.checkUsernameInput('strict')
					 && this.checkPasswordInput('strict')
					 && this.checkEmailInput()
					 && this.checkNameInput()
				 	)
						this.user.account.create(password.value, email.value, this.formSuccessCallback, this.formErrorCallback);
				}
				else {
					this.isLogin = false;
					e.target.blur();
				}
			},

			/// Form Callbacks
			//
			formSuccessCallback  : function (result) {
				this.user.account.set(result);
				this.$router.go("/");
			},
			formErrorCallback  : function (result) {
				//this.setError(result, 'username');
			},
			//
			///

			///Reusable LoginData checkers
			//
			usernameInputEvent  : function (e) { this.checkUsernameInput(); },

			checkUsernameInput : function (strict) {
				let regex = strict ? /^([0-9]|[a-z]|[A-Z]|[_]){3,32}$/ : /^([0-9]|[a-z]|[A-Z]|[_])*$/;
				let ufe = !regex.test(this.user.account.username);

				if (ufe)
					this.setError('username');
				else
					this.removeError('username');

				return !ufe;
			},

			passwordInputEvent : function (e) { this.checkPasswordInput(); },

			checkPasswordInput : function (strict) {
				let regex = strict ? /^.{5,64}$/ : /^.*$/;
				let pfe = !regex.test(password.value);

				if (pfe)
					this.setError('password');
				else
					this.removeError('password');

				return !pfe;
			},

			emailInputEvent  : function (e) { this.checkEmailInput(); },

			checkEmailInput  : function () {
				let regex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
				let pfe = !regex.test(email.value);

				if (pfe)
					this.setError('email');
				else
					this.removeError('email');

				return !pfe;
			},

			nameInputEvent  : function (e) { this.checkNameInput(); },

			checkNameInput  : function () {
				//([BS]|[MS])[1-4]-[0-9]+
				let regex = /^.+$/
				let pfe = !regex.test(firstname.value) && !regex.test(lastname.value);

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
			setError  : function (toWhat) {
				var elem = document.getElementById(toWhat);
				elem.setAttribute('error', '');
			},

			//TODO
			removeError  : function (fromWhat) {
				var elem = document.getElementById(fromWhat);
				elem.removeAttribute('error');
			},
			//
			///
			///
			
			// usernameHasError() { return document.getElementById('username').hasAttribure('error'); },
			// passwordHasError() { return  document.getElementById('password').hasAttribure('error'); },
			// emailHasError() { return document.getElementById('email').hasAttribure('error'); },
			// firstnameHasError() { return document.getElementById('firstname').hasAttribure('error'); },
			// lastnameHasError() { return document.getElementById('lastname').hasAttribure('error'); },
		}
	}
</script>