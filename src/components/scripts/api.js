var api_url = require('./../../config.js').server.api_url;

var api = {
	url : api_url,
	accounts : {
		version : 1,
		name : "accounts",
		get url() {	return api_url + "v" + this.version + "/" + this.name + "/"; },

		create (_username, _password, successCallback, errorCallback) {
			let 
			type = "POST",
			url  = this.url,
			data = {
				username: _username,
				password: _password
			};

			ajax(type, url, data, successCallback, errorCallback);
		},

		authorize (_username, _password, successCallback, errorCallback) {
			let 
			type = "POST",
			url  = this.url + "auth",
			data = {
				username: _username,
				password: _password
			};

			ajax(type, url, data, successCallback, errorCallback);
		},

		get (token, successCallback, errorCallback) {
			let 
			type = "GET",
			url  = this.url + token,
			data = '';

			ajax(type, url, data, successCallback, errorCallback);
		},

		///MODER METHODS
		//
		list (moder_token, successCallback, errorCallback) {
			let
			type = "GET",
			url = this.url + moder_token + "/listAccounts",
			data = '';
			
			ajax(type, url, data, successCallback, errorCallback);
		},

		updateRole (moder_token, account_id, new_role, successCallback, errorCallback) {
			let
			type = "PUT",
			url = this.url + moder_token + "/updateRole",
			data = { accountId: account_id, newRole: new_role };

			ajax(type, url, data, successCallback, errorCallback);
		},
		//
		///

		exists (token, successCallback, errorCallback) {
			let 
			type = "GET",
			url  = this.url + token + "/exists",
			data = '';

			ajax(type, url, data, successCallback, errorCallback);
		}
	},
	innopoints : {
		version : 1,
		name : "points",
		get url() { return api_url + "v" + this.version + "/" + this.name + "/"; },

		///USER METHODS
		//
		getActivities (skip_count, limit_count, successCallback, errorCallback) {
			let
			type = "GET",
			url = this.url + "activities",
			data = { skip: skip_count, limit: limit_count };

			ajax(type, url, data, successCallback, errorCallback);
		},

		getActivitiesInCategory (cat_id, skip_count, limit_count, successCallback, errorCallback) {
			let
			type = "GET",
			url = this.url + "activities/" + cat_id,
			data = { skip: skip_count, limit: limit_count };

			ajax(type, url, data, successCallback, errorCallback);
		},

		getCategories (skip_count, limit_count, successCallback, errorCallback) {
			let
			type = "GET",
			url = this.url + "categories",
			data = { skip: skip_count, limit: limit_count };

			ajax(type, url, data, successCallback, errorCallback);
		},

		getAccount (token, successCallback, errorCallback) {
			let 
			type = "GET",
			url  = this.url + "accounts/" + token,
			data = '';

			ajax(type, url, data, successCallback, errorCallback);
		},

		createAccount (token, successCallback, errorCallback) {
			let 
			type = "POST",
			url  = this.url + "accounts/" + token,
			data = '';

			ajax(type, url, data, successCallback, errorCallback);
		},
		
		getFile (appl_id, file_id, token, successCallback, errorCallback) {
			let 
			type = "GET",
			url  = this.url + "accounts/" + token + "/applications/" + appl_id + "/files/" + file_id,
			data = '';

			ajax(type, url, data, successCallback, errorCallback);
		},

		createApplication (token, application, successCallback, errorCallback) {
			let 
			type = "POST",
			url  = this.url + "accounts/" + token + "/applications",
			data = { applicaiton : application };

			ajax(type, url, data, successCallback, errorCallback);
		},
		
		updateApplication (appl_id, new_params, token, successCallback, errorCallback) {
			let 
			type = "PUT",
			url  = this.url + "accounts/" + token + "/applications/" + appl_id,
			data = new_params;

			ajax(type, url, data, successCallback, errorCallback);
		},
		
		sendApplication (appl_id, token, successCallback, errorCallback) {
			let 
			type = "PUT",
			url  = this.url + "accounts/" + token + "/applications/" + appl_id,
			data = '';

			ajax(type, url, data, successCallback, errorCallback);
		},
		
		getApplication (appl_id, token, successCallback, errorCallback) {
			let 
			type = "GET",
			url  = this.url + "accounts/" + token + "/applications/" + appl_id,
			data = '';

			ajax(type, url, data, successCallback, errorCallback);
		},
		
		deleteApplication (appl_id, token, successCallback, errorCallback) {
			let 
			type = "DELETE",
			url  = this.url + "accounts/" + token + "/applications/" + appl_id,
			data = '';

			ajax(type, url, data, successCallback, errorCallback);
		},
		
		getApplications (token, skip_count, limit_count, successCallback, errorCallback) {
			let 
			type = "GET",
			url  = this.url + "accounts/" + token + "/applications",
			data = { skip: skip_count, limit: limit_count };

			ajax(type, url, data, successCallback, errorCallback);
		},

		getApplicationsWithStatus (status, token, skip_count, limit_count, successCallback, errorCallback) {
			let 
			type = "GET",
			url  = this.url + "accounts/" + token + "/applications/" + status,
			data = { skip: skip_count, limit: limit_count };

			ajax(type, url, data, successCallback, errorCallback);
		},
		//
		///

		///ADMIN METHODS
		//
		getUserAccounts (admin_token, skip_count, limit_count, successCallback, errorCallback) {
			let 
			type = "GET",
			url  = this.url + "admin/" + admin_token,
			data = { skip: skip_count, limit: limit_count };

			ajax(type, url, data, successCallback, errorCallback);
		},

		getUserAccount (id, admin_token, successCallback, errorCallback) {
			let 
			type = "GET",
			url  = this.url + "admin/" + admin_token + "/accounts/" + id,
			data = '';

			ajax(type, url, data, successCallback, errorCallback);
		},

		updateUserAccount (id, admin_token, successCallback, errorCallback) {
			let 
			type = "PUT",
			url  = this.url + "admin/" + admin_token + "/accounts/" + id,
			data = '';

			ajax(type, url, data, successCallback, errorCallback);
		},

		getAllApplicationsWithStatus (status, admin_token, skip_count, limit_count, successCallback, errorCallback) {
			let 
			type = "GET",
			url  = this.url + "admin/" + admin_token + "/applications/" + status,
			data = { skip: skip_count, limit: limit_count };

			ajax(type, url, data, successCallback, errorCallback);
		},

		createApplication (admin_token, application, successCallback, errorCallback) {
			let 
			type = "POST",
			url  = this.url + "admin/" + admin_token + "/applications",
			data = { applicaiton : application };

			ajax(type, url, data, successCallback, errorCallback);
		},
		
		updateApplication (appl_id, new_params, admin_token, successCallback, errorCallback) {
			let 
			type = "PUT",
			url  = this.url + "admin/" + admin_token + "/applications/" + appl_id,
			data = new_params;

			ajax(type, url, data, successCallback, errorCallback);
		},
		
		getApplication (appl_id, admin_token, successCallback, errorCallback) {
			let 
			type = "GET",
			url  = this.url + "admin/" + admin_token + "/applications/" + appl_id,
			data = '';

			ajax(type, url, data, successCallback, errorCallback);
		},
		
		approveApplication (appl_id, admin_token, successCallback, errorCallback) {
			let 
			type = "PUT",
			url  = this.url + "admin/" + admin_token + "/applications/" + appl_id + "/approve",
			data = '';

			ajax(type, url, data, successCallback, errorCallback);
		},
		
		rejectApplication (appl_id, admin_token, successCallback, errorCallback) {
			let 
			type = "PUT",
			url  = this.url + "admin/" + admin_token + "/applications/" + appl_id + "/reject",
			data = '';

			ajax(type, url, data, successCallback, errorCallback);
		},
		
		dismissApplication (appl_id, admin_token, successCallback, errorCallback) {
			let 
			type = "PUT",
			url  = this.url + "admin/" + admin_token + "/applications/" + appl_id + "/to_rework",
			data = '';

			ajax(type, url, data, successCallback, errorCallback);
		},
		//
		///
	},
	polls : {}
};

function ajax (type, url, data, successCallback, errorCallback) {
	let xhr = new XMLHttpRequest();
	xhr.open(type, url, true);
	xhr.onload = function() {
	  	if (xhr.status >= 200 && xhr.status < 300) {
			console.log(xhr.response.status);

			if (successCallback)
				successCallback(xhr.response.result);
	  	}
	  	else {
			console.log(xhr.response.error);

	  		if (errorCallback)
	  			errorCallback(xhr.response.error);
		}
	};
	xhr.dataType = "json";
	xhr.contentType = 'json';
	xhr.responseType = 'json';
	xhr.setRequestHeader('Content-Type', 'application/json');

	xhr.send(JSON.stringify(data));
}

module.exports = api;