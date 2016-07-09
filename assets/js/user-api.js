//import "app.js"

function createAccount(_username, _password, successCallback, errorCallback) {
	var 
	type = "POST",
	url  = "/api/v1/accounts/",
	data = {
		username: _username,
		password: _password
	},
	error = function (message) {
		errorCallback(message);
	};

	ajax(type, url, data, successCallback, error);
}


function authorize(_username, _password, successCallback, errorCallback) {
	var 
	type = "POST",
	url  = "/api/v1/accounts/auth",
	data = {
		username: _username,
		password: _password
	};

	ajax(type, url, data, successCallback, errorCallback);
}

function getAccount (token, successCallback, errorCallback) {
	var 
	type = "GET",
	url  = "/api/v1/accounts/" + token;

	ajax(type, url, '', successCallback, errorCallback);
}

function listAccounts (moder_token, successCallback, errorCallback) {
	var
	type = "GET",
	url = "/api/v1/accounts/" + moder_token + "/listAccounts";
	
	ajax(type, url, '', successCallback, errorCallback);
}

function updateRole (moder_token, account_id, new_role, successCallback, errorCallback) {
	var
	type = "PUT",
	url = "/api/v1/accounts/" + moder_token + "/updateRole",
	data = { accountId: account_id, newRole: new_role };

	ajax(type, url, data, successCallback, errorCallback);
}

function accountExists (token, successCallback, errorCallback) {
	var 
	type = "GET",
	url  = "/api/v1/accounts/" + token + "/exists";

	ajax(type, url, '', successCallback, errorCallback);
}