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
					var oCrumbles = document.cookie.split(';');
				    for(var i=0; i<oCrumbles.length;i++)
				    {
				        var oPair= oCrumbles[i].split('=');
				        var sKey = decodeURIComponent(oPair[0].trim());
				        var sValue = oPair.length>1 ? oPair[1] : '';
				        if(sKey == sName) {
				            return decodeURIComponent(sValue);
				        }
				    }
				    return '';
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
		showTooltip : false,
		usernameError: false,
		passwordError: false
	}

	var inputErrors = {
		usernameLengthError : 'Username\'s length should be between 3 and 32 characters!',
		usernameFormatError : 'Username should consist only of alpha-numeric characters!',
		passwordLengthError : 'Password\'s length should be between 8 and 64 characters!'
	};


	///TODO split into 2 apps: login and dashboard
	//

	var app = new Vue({
		created : function () {
			console.log('created fired');
			let token = sessionStorage.getItem('usertoken');
			if (token) {
				getAccount(token, function (result) {
					console.log('created fired');
					app.user.token.set(token);

					app.bgtransitionEnabled = true;

					let user = app.user;

					user.id = result.id;
					user.username = result.username;
					user.firstName = result.firstName;
					user.lastName = result.lastName;
					user.role = result.role;

					app.title = result.role + "'s dashboard"

					app.user.loggedIn = true;
				});
			}
		},
		el : mainElement,
		data : {
			title: 'Hello! | Login, please',
			user: userModel,
			loginData: loginModel,
			bgtransitionEnabled: false
		},
		methods : {
			login: function () {
				console.log('login fired');
				if (usernameTooShort())
					setError(inputErrors.usernameLengthError, 'username');
				else
					authorize(app.user.username, password.value, formSuccessCallback, formErrorCallback);
			},
			register: function () {
				console.log('register fired');
				let errorSource = 
					usernameTooShort() ? 
						(
							passwordTooShort() ?
								'both' : 'username'
						) : (
							passwordTooShort() ?
								'password' : false
						);

				if (errorSource)
					setError(inputErrors.passwordLengthError, errorSource);
				else
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
				app.user.id = '';
				app.user.tgId = '';
				app.user.role = '';
				app.user.firstName = '';
				app.user.lastName = '';
				app.user.patronymic = '';
				app.user.studyGroup = '';
				app.user.loggedIn = false;

				setTimeout(function() { 
					app.bgtransitionEnabled = false;
				}, 1000);
			}
		}
	});
	//
	///

	/// Form input watchers - 'oninput' events
	//
	password.oninput = checkLoginInput;
	username.oninput = checkLoginInput;
	//
	///

	///Reusable LoginData checkers
	//
	function checkLoginInput() {
		console.log('checkLoginInput fired');
		let utl = usernameTooLong(),
			ptl = passwordTooLong(),
			ufe = !/^([0-9]|[a-z]|[A-Z|_])*$/.test(app.user.username);
		if (utl || ptl || ufe) { 
			utl && setError(inputErrors.usernameLengthError, 'username');
			ptl && setError(inputErrors.passwordLengthError, 'password');
			ufe && setError(inputErrors.usernameFormatError, 'username');
		}
		else 
			removeError();
	}

	function usernameTooShort() { return app.user.username.length < 3; }

	function usernameTooLong() { return app.user.username.length > 32; }

	function passwordTooShort() { return password.value.length < 8; }

	function passwordTooLong() { return password.value.length > 64; }

	function setError(error, toWhat) {
		console.log('setError fired');
		app.loginData.usernameError = (toWhat != 'password');
		app.loginData.passwordError = (toWhat != 'username');

		app.loginData.tooltipTitle = error;
		app.loginData.showTooltip = true;
		login_button.disabled = true;
		reg_button.disabled = true;
	}

	function removeError() {
		if (app.loginData.usernameError) {
			app.loginData.usernameError = false;
			app.loginData.showTooltip = false;
			if (!app.loginData.passwordError) {
				login_button.disabled = false;
				reg_button.disabled = false;
			}
		}
		if (app.loginData.passwordError) {
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

		app.title = result.role + "'s dashboard"

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

})(window);