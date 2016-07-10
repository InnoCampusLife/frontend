(function(exports) {

	///TODO - optimize rendering
	var mainElement = 'html';
	///

	var userModel = {
		id : '',
		username : '',
		role : '',
		firstName : '',
		lastName : '',
		patronymic : '',
		studyGroup : '',
		tgId : '',
		loggedIn: false,
		fullName : function() {
			var ln = (userModel.lastName 	!= null ? 		userModel.lastName + ' ' : '');
			var fn = (userModel.firstName 	!= null ? 		userModel.firstName 	 : '');
			var pn = (userModel.patronymic 	!= null ? ' ' + userModel.patronymic 	 : '');
			return ln + fn + pn;
		},
		token : { 
			get : function() {
				return userModel.cookie.get('usertoken');
			},
			set : function(newValue) {
				return userModel.cookie.set('usertoken', newValue);
			}
		},
		cookie : {
			get : function(sName) {
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
			},
			///TODO - set expiration time for cookies
			//
			set : function(sName, value, expTime) {
				var cookie = sName + '=' + value;
				document.cookie = cookie;
				return cookie;
			},
			add : function(sName, value, expTime) {
				var cookie = sName + '=' + value;
				document.cookie = document.cookie + cookie;
				return cookie;
			},
			//
			///
			clear : function() {
				document.cookie = '';
			}
		},
		menuElements : function() {
			var elements = [ 
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
		usernameFormatError : 'Username should consist only of alphanumeric characters!',
		passwordLengthError : 'Password\'s length should be between 8 and 64 characters!'
	};


	///TODO split into 2 apps: login and dashboard
	//
	var app = new Vue({
		el : mainElement,
		data : {
			title: 'Hello! | Login, please',
			user: userModel,
			loginData: loginModel,
			bgtransitionEnabled: false,
		},
		methods : {
			login: function () {
				if (usernameTooShort())
					setUsernameError(inputErrors.usernameLengthError);
				else
					authorize(app.user.username, password.value, formSuccessCallback, formErrorCallback);
			},
			register: function () {
				if (passwordTooShort())
					setPasswordError(inputErrors.passwordLengthError);
				else
					createAccount(app.user.username, password.value, formSuccessCallback, function(result) {
						app.loginData.usernameError = true;
						formErrorCallback(result);
					});
			},
			logout: function() {
				app.user.cookie.clear();

				app.title = "hello! | Login, please"

				app.user.loggedIn = false;

				setTimeout(function() { 
					app.bgtransitionEnabled = false;
				}, 1000);
			}
		}
	});
	//
	///

	/// Form input watchers - 'onchange' events
	//
	app.$watch('user.username', function() {
		if (usernameTooLong()) 
			setUsernameError(inputErrors.usernameLengthError);

		else if (!/^([0-9]|[a-z]|[A-Z|_])*$/.test(app.user.username)) 
			setUsernameError(inputErrors.usernameFormatError);

		else 
			removeUsernameError();
	});

	app.$watch('user.password', function() {
		if (passwordTooLong()) 
			setPasswordError(inputErrors.passwordLengthError);

		else 
			removePasswordError();
	});
	//
	///

	///Reusable LoginData checkers
	//
	function usernameTooShort() { return app.user.username.length < 3; }

	function usernameTooLong() { return app.user.username.length > 32; }

	function setUsernameError(error) {
		app.loginData.usernameError = true;
		app.loginData.tooltipTitle = error;
		app.loginData.showTooltip = true;
		login_button.disabled = true;
		reg_button.disabled = true;
	}

	function removeUsernameError() {
		app.loginData.usernameError = false;
		app.loginData.showTooltip = false;
		login_button.disabled = false;
		reg_button.disabled = false;
	}

	function passwordTooShort() { return password.length < 8; }

	function passwordTooLong() { return password.length > 64; }

	function setPasswordError(error) {
		app.loginData.passwordError = true;
		app.loginData.tooltipTitle = error;
		app.loginData.showTooltip = true;
		login_button.disabled = true;
		reg_button.disabled = true;
	}

	function removePasswordError() {
		app.loginData.passwordError = false;
		app.loginData.showTooltip = false;
		login_button.disabled = false;
		reg_button.disabled = false;
	}
	//
	///

	/// Form Callbacks
	//
	function formSuccessCallback(result) {
		app.loginData.showTooltip = false;
		app.user.token = result.token;

		app.bgtransitionEnabled = true;

		var user = app.user;

		user.id = result.id;
		user.username = result.username;
		user.firstName = result.firstName;
		user.lastName = result.lastName;
		user.role = result.role;

		app.title = result.role + "'s dashboard"

		app.user.loggedIn = true;
	}

	function formErrorCallback(result) {
		app.loginData.tooltipTitle = result == '' ? 'Unknown error' : result;
		app.loginData.showTooltip = true;
	}
	//
	///

})(window);