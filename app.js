(function(exports) {

	///TODO - optimize rendering
	var mainElement = 'html';
	///

	var userModel = {
		id : 		 '',
		username : 	 '',
		role : 		 '',
		firstName :  '',
		lastName : 	 '',
		patronymic : '',
		studyGroup : '',
		tgId : 		 '',
		loggedIn: false,
		fullName : function() {
			let ln = (userModel.lastName 	!= null ? 		userModel.lastName + ' ' : '');
			let fn = (userModel.firstName 	!= null ? 		userModel.firstName 	 : '');
			let pn = (userModel.patronymic 	!= null ? ' ' + userModel.patronymic 	 : '');
			return ln + fn + pn;
		},
		token : { 
			get : function() {
				return userModel.storage.get('usertoken');
			},
			set : function(newValue) {
				return userModel.storage.set('usertoken', newValue);
			}
		},
		storage: {
			get : function(key) {
				if (typeof(Storage) != undefined) {
					return sessionStorage.getItem(key);
				}
				else {
					let oCrumbles = document.cookie.split(';');
				    for(let i=0; i<oCrumbles.length;i++)
				    {
				        let oPair= oCrumbles[i].split('=');
				        let sKey = decodeURIComponent(oPair[0].trim());
				        let sValue = oPair.length>1 ? oPair[1] : '';
				        if(sKey == key) {
				            return decodeURIComponent(sValue);
				        }
				    }
				    return undefined;
				}
			},
			set : function(key, value) {
				if (typeof(Storage) != undefined) {
					sessionStorage.setItem(key, value);
					return sessionStorage.getItem(key);
				}
				else {
					let cookie = sName + '=' + value;
					document.cookie = cookie;
					return cookie;
				}
			},
			clear : function () {
				if (typeof(Storage) != undefined)
					sessionStorage.clear();
				else
					document.cookie = '';
			}
		},
		menuElements : function() {
			let elements = [
				{
					name : 'statistics',
					event: ''
				}, {
					name : 'settings',
					event: ''
				}
			];
			if (userModel.role == 'moderator' || userModel.role == 'student')
				elements.push({ name:'innopoints', event:''});

			return elements;
		}
	}

	var loginModel = {
		tooltipTitle : '',
		showTooltip  : false,
		usernameError: false,
		passwordError: false
	}

	var inputErrors = {
		usernameFormatError : 'Username should be from 3 to 32 alpha-numeric characters!',
		passwordFormatError : 'Password\'s length should be between 8 and 64 characters!'
	};


	///TODO split into 2 apps: login and dashboard
	//
	var app = new Vue({
		created : function () {
			console.log('created fired');
			let token = userModel.storage.get('usertoken');

			if (token)
				getAccount(token, formSuccessCallback);
		},
		el : mainElement,
		data : {
			title: 'Hello! | Login, please',
			user: userModel,
			loginData: loginModel,
			loaded : false,
			bgtransitionEnabled: false
		},
		methods : {
			login: function () {
				console.log('login fired');
				if (checkUsernameInput('strict'))
					authorize(app.user.username, password.value, formSuccessCallback, formErrorCallback);
			},
			register: function () {
				console.log('register fired');
				if (checkUsernameInput('strict') && checkPasswordInput('strict'))
					createAccount(app.user.username, password.value, formSuccessCallback, function(result) {
						app.loginData.usernameError = true;
						formErrorCallback(result);
					});
			},
			logout: function() {
				console.log('logout fired');
				app.bgtransitionEnabled = true;

				app.title = "hello! | Login, please"

				app.user.storage.clear();
				app.user.loggedIn = false;

				setTimeout(function() { 
					app.bgtransitionEnabled = false;
					app.user.id = '';
					app.user.tgId = '';
					app.user.role = '';
					app.user.firstName = '';
					app.user.lastName = '';
					app.user.patronymic = '';
					app.user.studyGroup = '';
				password.oninput = passwordInputEvent;
				username.oninput = usernameInputEvent;
				}, 1000);
			}
		},
	});
	//
	///

	/// Form input watcher - 'oninput' event
	//
	username.oninput = usernameInputEvent;
	password.oninput = passwordInputEvent;
	//
	///

	///Reusable LoginData checkers
	//
	function usernameInputEvent(e) { checkUsernameInput(); }

	function checkUsernameInput(strict = false) {
		console.log('checkLoginInput fired');
		let regex = strict ? /^([0-9]|[a-z]|[A-Z|_]){3,32}$/ : /^([0-9]|[a-z]|[A-Z|_])*$/;
		let ufe = !regex.test(app.user.username);

		if (ufe)
			setError(inputErrors.usernameFormatError, 'username');
		else
			removeError('username');

		return !ufe;
	}

	function passwordInputEvent(e) { checkPasswordInput(); }

	function checkPasswordInput(strict = false) {
		console.log('checkLoginInput fired');
		let regex = strict ? /^.{5,64}$/ : /^.*$/;
		let pfe = !regex.test(password.value);

		if (pfe)
			setError(inputErrors.passwordFormatError, 'password');
		else
			removeError('password');

		return !pfe;
	}

	function setError(error, toWhat = 'both') {
		console.log('setError fired');
		if (toWhat != 'password') app.loginData.usernameError = true;
		if (toWhat != 'username') app.loginData.passwordError = true;

		app.loginData.tooltipTitle = error;
		app.loginData.showTooltip = true;
		login_button.disabled = true;
		reg_button.disabled = true;
	}

	function removeError(toWhat = 'both') {
		if (toWhat != 'password' && app.loginData.usernameError) {
			app.loginData.usernameError = false;
			app.loginData.showTooltip = false;
			if (!app.loginData.passwordError) {
				login_button.disabled = false;
				reg_button.disabled = false;
			}
		}
		else if (app.loginData.passwordError) {
			app.loginData.passwordError = false;
			app.loginData.showTooltip = false;
			if (!app.loginData.usernameError) {
				login_button.disabled = false;
				reg_button.disabled = false;
			}
		}
	}
	//
	///

	/// Form Callbacks
	//
	function formSuccessCallback(result) {
		app.loginData.showTooltip = false;

		app.bgtransitionEnabled = true;

		let user = app.user;
		user.token.set(result.token);

		user.id = result.id;
		user.username = result.username;
		user.firstName = result.firstName;
		user.lastName = result.lastName;
		user.role = result.role;

		app.title = result.role + "'s dashboard";

		app.user.loggedIn = true;

		setTimeout(function() { 
			app.bgtransitionEnabled = false;
		}, 1000);
	}

	function formErrorCallback(result) {
		app.loginData.tooltipTitle = result == '' ? 'Unknown error' : result;
		app.loginData.showTooltip = true;
	}
	//
	///
	
	document.addEventListener('DOMContentLoaded', function() {
		app.loaded = true;
	}, false);

})(window);