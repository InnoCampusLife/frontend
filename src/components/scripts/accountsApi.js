let api_url = "/api/v1/accounts/",
	user_api = {
		createAccount : function (_username, _password, successCallback, errorCallback) {
			let 
			type = "POST",
			url  = api_url,
			data = {
				username: _username,
				password: _password
			},
			error = function (message) {
				if (errorCallback)
					errorCallback(message);
			};

			ajax(type, url, data, successCallback, error);
		},


		authorize : function (_username, _password, successCallback, errorCallback) {
			let 
			type = "POST",
			url  = api_url + "auth",
			data = {
				username: _username,
				password: _password
			};

			ajax(type, url, data, successCallback, errorCallback);
		},

		getAccount : function (token, successCallback, errorCallback) {
			let 
			type = "GET",
			url  = api_url + token;

			ajax(type, url, '', successCallback, errorCallback);
		},

		listAccounts : function (moder_token, successCallback, errorCallback) {
			let
			type = "GET",
			url = api_url + moder_token + "/listAccounts";
			
			ajax(type, url, '', successCallback, errorCallback);
		},

		updateRole : function (moder_token, account_id, new_role, successCallback, errorCallback) {
			let
			type = "PUT",
			url = api_url + moder_token + "/updateRole",
			data = { accountId: account_id, newRole: new_role };

			ajax(type, url, data, successCallback, errorCallback);
		},

		accountExists : function (token, successCallback, errorCallback) {
			let 
			type = "GET",
			url  = api_url + token + "/exists";

			ajax(type, url, '', successCallback, errorCallback);
		}
	};

function ajax (type, url, data, successCallback, errorCallback) {
	let r = new XMLHttpRequest();
	r.open(type, url, true);
	r.onload = function() {
	  	if (r.status >= 200 && r.status <= 202) {
			console.log(r.response.status);

			if (successCallback)
				successCallback(r.response.result);
	  	}
	  	else {
			console.log(r.response.error);

	  		if (errorCallback)
	  			errorCallback(r.response.error);
		}
	};
	r.dataType = "json";
	r.contentType = 'json';
	r.responseType = 'json';
	r.setRequestHeader('Content-Type', 'application/json');

	r.send(JSON.stringify(data));
}

module.exports = user_api;