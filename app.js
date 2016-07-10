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
			userModel.cookie.set('usertoken', newValue);
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
		///
		clear : function() {
			document.cookie = '';
		}
	},
	menuElements : {
		get : function() {
			var elements = [ 
				{ 
					name : 'statistics',
					event: ''
				},
				{ 
					name : 'settings',
					event: ''
				}
			];
			if (userModel.role == 'moderator' || userModel.role == 'student')
				elements.push({ name:'innopoints', event:''});

			return elements;
		}
	}
}

var loginModel = {
	tooltipTitle : '',
	showTooltip : false,
	registerError: false,
}


///TODO split into 2 apps: login and dashboard

var app =
	new Vue({
		/*compiled : function() {
			if (app.user.cookie.get())
				app.user.loggedIn = true;
		},*/
		el : mainElement,
		data : {
			title: 'Hello! | Login, please',
			user: userModel,
			loginData: loginModel,
			bgtransitionEnabled: false,
		},
		methods : {
			login: function () {
				authorize(app.user.username, password.value, formSuccessCallback, formErrorCallback);
			},
			register: function () {
				createAccount(app.user.username, password.value, formSuccessCallback, function(result) {
					app.loginData.registerError = true;
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
///

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

})(window);