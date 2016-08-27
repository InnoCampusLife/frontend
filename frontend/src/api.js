var api_url = config.server.api_url;

var api = {
	url : api_url,
	accounts : {
		version : 1,
		name : "accounts",
		get url() {	return api_url + "v" + this.version + "/" + this.name + "/"; },

		/**
		 * Requests to create a new user account in accounts API
		 * 
		 * @param {string} _username
		 * @param {string} _password
		 * @param {any} successCallback
		 * @param {any} errorCallback
		 */
		create : function (_username, _password, successCallback, errorCallback) {
			let 
			type = "POST",
			url  = this.url,
			data = {
				username: _username,
				password: _password
			};

			ajax(type, url, data, successCallback, errorCallback);
		},

		/**
		 * 
		 * 
		 * @param {string} _username
		 * @param {string} _password
		 * @param {any} successCallback
		 * @param {any} errorCallback
		 */
		authorize : function (_username, _password, successCallback, errorCallback) {
			let 
			type = "POST",
			url  = this.url + "auth",
			data = {
				username: _username,
				password: _password
			};

			ajax(type, url, data, successCallback, errorCallback);
		},

		/**
		 * 
		 * 
		 * @param {any} token
		 * @param {any} successCallback
		 * @param {any} errorCallback
		 */
		get : function (token, successCallback, errorCallback) {
			let 
			type = "GET",
			url  = this.url + token,
			data = '';

			ajax(type, url, data, successCallback, errorCallback);
		},

		///MODER METHODS
		//
		/**
		 * 
		 * 
		 * @param {any} moder_token
		 * @param {any} successCallback
		 * @param {any} errorCallback
		 */
		list : function (moder_token, successCallback, errorCallback) {
			let
			type = "GET",
			url = this.url + moder_token + "/listAccounts",
			data = '';
			
			ajax(type, url, data, successCallback, errorCallback);
		},

		/**
		 * 
		 * 
		 * @param {any} moder_token
		 * @param {any} account_id
		 * @param {any} new_role
		 * @param {any} successCallback
		 * @param {any} errorCallback
		 */
		updateRole : function (moder_token, account_id, new_role, successCallback, errorCallback) {
			let
			type = "PUT",
			url = this.url + moder_token + "/updateRole",
			data = { accountId: account_id, newRole: new_role };

			ajax(type, url, data, successCallback, errorCallback);
		},
		//
		///

		/**
		 * 
		 * 
		 * @param {any} token
		 * @param {any} successCallback
		 * @param {any} errorCallback
		 */
		exists : function (token, successCallback, errorCallback) {
			let 
			type = "GET",
			url  = this.url + token + "/exists",
			data = '';

			ajax(type, url, data, successCallback, errorCallback);
		},

		/**
		 * 
		 * 
		 * @param {any} token
		 * @param {object} identifier contains id xor username
		 * @param {any} successCallback
		 * @param {any} errorCallback
		 */
		getBio : function (token, identifier, successCallback, errorCallback) {
			let 
			type = "GET",
			url  = this.url + token + "/getBio",
			data = {
				id: identifier.id,
				username: identifier.username
			};

			ajax(type, url, data, successCallback, errorCallback);
		}
	},
	innopoints : {
		version : 1,
		name : "points",
		get url() { return api_url + "v" + this.version + "/" + this.name + "/"; },

		/**
		 * 
		 * 
		 * @param {any} skip_count
		 * @param {any} limit_count
		 * @param {any} successCallback
		 * @param {any} errorCallback
		 */
		getActivities : function (skip_count, limit_count, successCallback, errorCallback) {
			let
			type = "GET",
			url = this.url + "activities",
			data = { skip: skip_count, limit: limit_count };

			ajax(type, url, data, successCallback, errorCallback);
		},

		/**
		 * 
		 * 
		 * @param {any} cat_id
		 * @param {any} skip_count
		 * @param {any} limit_count
		 * @param {any} successCallback
		 * @param {any} errorCallback
		 */
		getActivitiesInCategory : function (cat_id, skip_count, limit_count, successCallback, errorCallback) {
			let
			type = "GET",
			url = this.url + "activities/" + cat_id,
			data = { skip: skip_count, limit: limit_count };

			ajax(type, url, data, successCallback, errorCallback);
		},

		/**
		 * 
		 * 
		 * @param {any} skip_count
		 * @param {any} limit_count
		 * @param {any} successCallback
		 * @param {any} errorCallback
		 */
		getCategories : function (skip_count, limit_count, successCallback, errorCallback) {
			let
			type = "GET",
			url = this.url + "categories",
			data = { skip: skip_count, limit: limit_count };

			ajax(type, url, data, successCallback, errorCallback);
		},

		///USER METHODS
		//
		user : {
			get url() { return api.innopoints.url + "accounts/" },

			/**
			 * 
			 * 
			 * @param {any} token
			 * @param {any} successCallback
			 * @param {any} errorCallback
			 */
			getAccount : function (token, successCallback, errorCallback) {
				let 
				type = "GET",
				url  = this.url + token,
				data = '';

				ajax(type, url, data, successCallback, errorCallback);
			},

			/**
			 * 
			 * 
			 * @param {any} token
			 * @param {any} successCallback
			 * @param {any} errorCallback
			 */
			createAccount : function (token, successCallback, errorCallback) {
				let 
				type = "POST",
				url  = this.url + token,
				data = '';

				ajax(type, url, data, successCallback, errorCallback);
			},
			
			/**
			 * 
			 * 
			 * @param {any} appl_id
			 * @param {any} file_id
			 * @param {any} token
			 * @param {any} successCallback
			 * @param {any} errorCallback
			 */
			getFile : function (appl_id, file_id, token, successCallback, errorCallback) {
				let 
				type = "GET",
				url  = this.url + token + "/applications/" + appl_id + "/files/" + file_id,
				data = '';

				ajax(type, url, data, successCallback, errorCallback);
			},

			/**
			 * 
			 * 
			 * @param {any} token
			 * @param {any} application
			 * @param {any} successCallback
			 * @param {any} errorCallback
			 */
			createApplication : function (token, application, successCallback, errorCallback) {
				let 
				type = "POST",
				url  = this.url + token + "/applications",
				data = { applicaiton : application };

				ajax(type, url, data, successCallback, errorCallback);
			},
			
			/**
			 * 
			 * 
			 * @param {any} appl_id
			 * @param {any} new_params
			 * @param {any} token
			 * @param {any} successCallback
			 * @param {any} errorCallback
			 */
			updateApplication : function (appl_id, new_params, token, successCallback, errorCallback) {
				let 
				type = "PUT",
				url  = this.url + token + "/applications/" + appl_id,
				data = new_params;

				ajax(type, url, data, successCallback, errorCallback);
			},
			
			/**
			 * 
			 * 
			 * @param {any} appl_id
			 * @param {any} token
			 * @param {any} successCallback
			 * @param {any} errorCallback
			 */
			sendApplication : function (appl_id, token, successCallback, errorCallback) {
				let 
				type = "PUT",
				url  = this.url + token + "/applications/" + appl_id,
				data = '';

				ajax(type, url, data, successCallback, errorCallback);
			},
			
			/**
			 * 
			 * 
			 * @param {any} appl_id
			 * @param {any} token
			 * @param {any} successCallback
			 * @param {any} errorCallback
			 */
			getApplication : function (appl_id, token, successCallback, errorCallback) {
				let 
				type = "GET",
				url  = this.url + token + "/applications/" + appl_id,
				data = '';

				ajax(type, url, data, successCallback, errorCallback);
			},
			
			/**
			 * 
			 * 
			 * @param {any} appl_id
			 * @param {any} token
			 * @param {any} successCallback
			 * @param {any} errorCallback
			 */
			deleteApplication : function (appl_id, token, successCallback, errorCallback) {
				let 
				type = "DELETE",
				url  = this.url + token + "/applications/" + appl_id,
				data = '';

				ajax(type, url, data, successCallback, errorCallback);
			},
			
			/**
			 * 
			 * 
			 * @param {any} token
			 * @param {any} skip_count
			 * @param {any} limit_count
			 * @param {any} successCallback
			 * @param {any} errorCallback
			 */
			getApplications : function (token, skip_count, limit_count, successCallback, errorCallback) {
				let 
				type = "GET",
				url  = this.url + token + "/applications",
				data = { skip: skip_count, limit: limit_count };

				ajax(type, url, data, successCallback, errorCallback);
			},

			/**
			 * 
			 * 
			 * @param {any} status
			 * @param {any} token
			 * @param {any} skip_count
			 * @param {any} limit_count
			 * @param {any} successCallback
			 * @param {any} errorCallback
			 */
			getApplicationsWithStatus : function (status, token, skip_count, limit_count, successCallback, errorCallback) {
				let 
				type = "GET",
				url  = this.url + token + "/applications/" + status,
				data = { skip: skip_count, limit: limit_count };

				ajax(type, url, data, successCallback, errorCallback);
			},
		},
		//
		///

		///ADMIN METHODS
		//
		admin : {
			get url() { return api.url + "admin/"; },
			/**
			 * 
			 * 
			 * @param {any} admin_token
			 * @param {any} skip_count
			 * @param {any} limit_count
			 * @param {any} successCallback
			 * @param {any} errorCallback
			 */
			getUserAccounts : function (admin_token, skip_count, limit_count, successCallback, errorCallback) {
				let 
				type = "GET",
				url  = this.url + admin_token,
				data = { skip: skip_count, limit: limit_count };

				ajax(type, url, data, successCallback, errorCallback);
			},

			/**
			 * 
			 * 
			 * @param {any} id
			 * @param {any} admin_token
			 * @param {any} successCallback
			 * @param {any} errorCallback
			 */
			getUserAccount : function (id, admin_token, successCallback, errorCallback) {
				let 
				type = "GET",
				url  = this.url + admin_token + "/accounts/" + id,
				data = '';

				ajax(type, url, data, successCallback, errorCallback);
			},

			/**
			 * 
			 * 
			 * @param {any} id
			 * @param {any} points
			 * @param {any} admin_token
			 * @param {any} successCallback
			 * @param {any} errorCallback
			 */
			updateUserAccount : function (id, points, admin_token, successCallback, errorCallback) {
				let 
				type = "PUT",
				url  = this.url + admin_token + "/accounts/" + id,
				data = { points_amount : points };

				ajax(type, url, data, successCallback, errorCallback);
			},

			/**
			 * 
			 * 
			 * @param {any} status
			 * @param {any} admin_token
			 * @param {any} skip_count
			 * @param {any} limit_count
			 * @param {any} successCallback
			 * @param {any} errorCallback
			 */
			getAllApplicationsWithStatus : function (status, admin_token, skip_count, limit_count, successCallback, errorCallback) {
				let 
				type = "GET",
				url  = this.url + admin_token + "/applications/" + status,
				data = { skip: skip_count, limit: limit_count };

				ajax(type, url, data, successCallback, errorCallback);
			},

			/**
			 * 
			 * 
			 * @param {any} admin_token
			 * @param {any} application
			 * @param {any} successCallback
			 * @param {any} errorCallback
			 */
			createApplication : function (admin_token, application, successCallback, errorCallback) {
				let 
				type = "POST",
				url  = this.url + admin_token + "/applications",
				data = { applicaiton : application };

				ajax(type, url, data, successCallback, errorCallback);
			},
			
			/**
			 * 
			 * 
			 * @param {any} appl_id
			 * @param {any} new_params
			 * @param {any} admin_token
			 * @param {any} successCallback
			 * @param {any} errorCallback
			 */
			updateApplication : function (appl_id, new_params, admin_token, successCallback, errorCallback) {
				let 
				type = "PUT",
				url  = this.url + admin_token + "/applications/" + appl_id,
				data = new_params;

				ajax(type, url, data, successCallback, errorCallback);
			},
			
			/**
			 * 
			 * 
			 * @param {any} appl_id
			 * @param {any} admin_token
			 * @param {any} successCallback
			 * @param {any} errorCallback
			 */
			getApplication : function (appl_id, admin_token, successCallback, errorCallback) {
				let 
				type = "GET",
				url  = this.url + admin_token + "/applications/" + appl_id,
				data = '';

				ajax(type, url, data, successCallback, errorCallback);
			},
			
			/**
			 * 
			 * 
			 * @param {any} appl_id
			 * @param {any} admin_token
			 * @param {any} successCallback
			 * @param {any} errorCallback
			 */
			approveApplication : function (appl_id, admin_token, successCallback, errorCallback) {
				let 
				type = "PUT",
				url  = this.url + admin_token + "/applications/" + appl_id + "/approve",
				data = '';

				ajax(type, url, data, successCallback, errorCallback);
			},
			
			/**
			 * 
			 * 
			 * @param {any} appl_id
			 * @param {any} admin_token
			 * @param {any} successCallback
			 * @param {any} errorCallback
			 */
			rejectApplication : function (appl_id, admin_token, successCallback, errorCallback) {
				let 
				type = "PUT",
				url  = this.url + admin_token + "/applications/" + appl_id + "/reject",
				data = '';

				ajax(type, url, data, successCallback, errorCallback);
			},
			
			/**
			 * 
			 * 
			 * @param {any} appl_id
			 * @param {any} admin_token
			 * @param {any} successCallback
			 * @param {any} errorCallback
			 */
			dismissApplication : function (appl_id, admin_token, successCallback, errorCallback) {
				let 
				type = "PUT",
				url  = this.url + admin_token + "/applications/" + appl_id + "/to_rework",
				data = '';

				ajax(type, url, data, successCallback, errorCallback);
			}
		}
		//
		///
	},
	polls : {}
};

function ajax (type, url, data, successCallback, errorCallback) {
	let xhr = new XMLHttpRequest();
	xhr.open(type, url, true);
	xhr.onload = function() {
	  	if (xhr.response.result) {
			console.log(xhr.response.status);

			if (successCallback)
				successCallback(xhr.response.result);
	  	} else if (xhr.response.error) {
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