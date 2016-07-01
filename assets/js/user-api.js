function createAccount(_username, _password, successCallback, errorCallback) {
	var request = $.ajax(
		{
			type: "POST",
			url: "/api/v1/accounts/",
			data: JSON.stringify(
				{
					username: _username,
					password: _password
				}
			),
			contentType: "application/json; charset=utf-8",
			dataType: "json",
			response: "json",
			success: function (message) {
				console.log(message.status);
				successCallback(message.result);
			},
			error: function (message) {
				console.log(message.responseJSON.error);
				errorCallback(message.responseJSON.error);
			}
		}
	);
}


function authorize(_username, _password, successCallback, errorCallback) {
	var request = $.ajax(
		{
			type: "POST",
			url: "/api/v1/accounts/auth",
			data: JSON.stringify(
				{ 
					username: _username,
					password: _password
				}
			),
			contentType: "application/json; charset=utf-8",
			dataType: "json",
			response: "json",
			success: function (message) {
				console.log(message.status);
				successCallback(message.result);
			},
			error: function (message) {
				console.log(message.responseJSON.error);
				errorCallback(message.responseJSON.error);
			}
		}
	);
}

function getAccount (token, successCallback, errorCallback) {
	var request = $.ajax(
		{
			type: "GET",
			url: "/api/v1/accounts/" + token,
			contentType: "application/json; charset=utf-8",
			dataType: "json",
			response: "json",
			success: function (message) {
				console.log(message.status);
				successCallback(message.result);
			},
			error: function (message) {
				console.log(message.responseJSON.error);
				errorCallback(message.responseJSON.error);
			}
		}
	);
}

function listAccounts (moder_token, successCallback, errorCallback) {
	var request = $.ajax(
		{
			type: "GET",
			url: "/api/v1/accounts/" + moder_token + "/listAccounts",
			contentType: "application/json; charset=utf-8",
			dataType: "json",
			response: "json",
			success: function (message) {
				console.log(message.status);
				successCallback(message.result);
			},
			error: function (message) {
				console.log(message.responseJSON.error);
				errorCallback(message.responseJSON.error);
			}
		}
	);
}

function updateRole (moder_token, account_id, new_role, successCallback, errorCallback) {
	var request = $.ajax(
		{
			type: "PUT",
			url: "/api/v1/accounts/" + moder_token + "/updateRole",
			data: JSON.stringify({ accountId: account_id, newRole: new_role }),
			contentType: "application/json; charset=utf-8",
			dataType: "json",
			response: "json",
			success: function (message) {
				console.log(message.status);
				successCallback(message.result);
			},
			error: function (message) {
				console.log(message.responseJSON.error);
				errorCallback(message.responseJSON.error);
			}
		}
	);
}

function accountExists (token, successCallback, errorCallback) {
	var result;

	var request = $.ajax(
		{
			type: "GET",
			url: "/api/v1/accounts/" + token + "/exists",
			contentType: "application/json; charset=utf-8",
			dataType: "json",
			response: "json",
			success: function (message) {
				console.log(message.status);
				successCallback(message.result);
			},
			error: function (message) {
				console.log(message.responseJSON.error);
				errorCallback(message.responseJSON.error);
			}
		}
	);
}