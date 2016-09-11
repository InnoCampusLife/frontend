var storage = require('./storage.js');
var config  = require('./config.js');
var api_url = config.server.api_url;

var modules = {
	accounts : {
		roles : [
			'ghost',
			'student',
			'moderator'
		],
		have (role) {
			return !!(this.roles.indexOf(role) > -1);
		},

		//data

		id			: null,
		username	: null,
		role		: null,
		firstName	: null,
		lastName	: null,
		patronymic	: null,
		studyGroup	: null,
		tgId		: null,

		get token() {
			return this.storage.get(config.token_name);
		},

		set token(value) {
			return this.storage.set(config.token_name, value);
		},

		get fullName () {
			var ln = (!!this.lastName 	? 		this.lastName + ' ' : '');
			var fn = (!!this.firstName 	? 		this.firstName 	 	: '');
			var pn = (!!this.patronymic	? ' ' + this.patronymic 	: '');
			return ln + fn + pn;
		},
		
		get loggedIn () {
			return this.storage.get(config.token_name) ? true : false;
		},

		get isGhost () {
			return !!this.is('ghost');
		},

		get isStudent () {
			return !!this.is('student');
		},

		get isModerator () {
			return !!this.is('moderator');
		},

		is (ofType) {
			return !!this.role && !!modules.accounts.have(ofType) && !!(this.role.toLowerCase() === ofType.toLowerCase());
		},

		clear () {
			this.id         = null;
			this.role       = null;
			this.firstName  = null;
			this.lastName   = null;
			this.patronymic = null;
			this.studyGroup = null;
			this.token      = null;
			this.storage.clear();
		},

		set (data) {
			this.id         = !!data.id 		/*&& !!this.id 			*/&& data.id;
			this.username   = !!data.username 	/*&& !!this.username 		*/&& data.username;
			this.role       = !!data.role 		/*&& !!this.role 			*/&& data.role;
			this.firstName  = !!data.firstName 	/*&& !!this.firstName 	*/&& data.firstName;
			this.lastName   = !!data.lastName 	/*&& !!this.lastName 		*/&& data.lastName;
			this.patronymic = !!data.patronymic /*&& !!this.patronymic 	*/&& data.patronymic;
			this.studyGroup = !!data.studyGroup /*&& !!this.studyGroup 	*/&& data.studyGroup;
			this.token      = !!data.token 		/*&& !!this.token 		*/&& data.token;
		},

		update (successCallback, errorCallback) {
			this.get((result) => {
					this.set(result);
					if (successCallback) successCallback(result);
				},
				errorCallback
			);
		},

		storage : storage,

		//
		
		//api

		version : 1,
		name : "accounts",
		get url() {	return api_url + "v" + this.version + "/" + this.name + "/"; },

		create : function (password, successCallback, errorCallback) {
			let 
			type = "POST",
			url  = this.url,
			data = {
				username: this.username,
				password: password
			};

			ajax(type, url, data, successCallback, errorCallback);
		},

		authorize : function (password, successCallback, errorCallback) {
			let 
			type = "POST",
			url  = this.url + "auth",
			data = {
				username: this.username,
				password: password
			};

			ajax(type, url, data, successCallback, errorCallback);
		},

		get : function (successCallback, errorCallback) {
			let 
			type = "GET",
			url  = this.url + this.token,
			data = '';

			ajax(type, url, data, successCallback, errorCallback);
		},

		///MODER METHODS
		//
		list : function (successCallback, errorCallback) {
			let
			type = "GET",
			url  = this.url + this.token + "/listAccounts",
			data = '';
			
			ajax(type, url, data, successCallback, errorCallback);
		},

		updateRole : function (account_id, new_role, successCallback, errorCallback) {
			let
			type = "PUT",
			url  = this.url + this.token + "/updateRole",
			data = { accountId: account_id, newRole: new_role };

			ajax(type, url, data, successCallback, errorCallback);
		},
		//
		///

		exists : function (successCallback, errorCallback) {
			let 
			type = "GET",
			url  = this.url + this.token + "/exists",
			data = '';

			ajax(type, url, data, successCallback, errorCallback);
		},

		getBio : function (identifier, successCallback, errorCallback) {
			let 
			type = "GET",
			url  = this.url + this.token + "/getBio?" + (identifier.id ? "id=" + identifier.id : "username=" + identifier.username),
			data = '';			

			ajax(type, url, data, successCallback, errorCallback);
		},

		//
	},
	innopoints : {
		roles : [
			'student',
			'admin'
		],
		have (role) {
			return !!(this.roles.indexOf(role) > -1);
		},
		data : {
			id		: null,
			amount	: null,
			role 	: null,

			activities: [],
			categories: [],

			items :		[],
			currentItem : null,

			get isStudent () {
				return !!this.is('student');
			},

			get isAdmin () {
				return !!this.is('admin');
			},

			is (ofType) {
				return !!this.role && !!modules.accounts.have(ofType) && !!(this.role.toLowerCase() === ofType.toLowerCase());
			},

			update (successCallback, errorCallback)	{
				modules.innopoints.api.user.get(result => {
					this.id = result.id;
					this.amount = result.points_amount || 0;
					this.role = result.type;
				});
			}
		},

		api : {
			version : 1,
			name : "points",
			get url() { return api_url + "v" + this.version + "/" + this.name + "/"; },

			getActivities : function (skip_count, limit_count, successCallback, errorCallback) {
				let
				type = "GET",
				url = this.url + "activities",
				data = { skip: skip_count, limit: limit_count };

				ajax(type, url, data, successCallback, errorCallback);
			},

			getActivitiesInCategory : function (cat_id, skip_count, limit_count, successCallback, errorCallback) {
				let
				type = "GET",
				url = this.url + "activities/" + cat_id,
				data = { skip: skip_count, limit: limit_count };

				ajax(type, url, data, successCallback, errorCallback);
			},

			getCategories : function (skip_count, limit_count, successCallback, errorCallback) {
				let
				type = "GET",
				url = this.url + "categories",
				data = { skip: skip_count, limit: limit_count };

				ajax(type, url, data, successCallback, errorCallback);
			},

			shop : {
				get url() { return modules.innopoints.api.url + "shop/" },

				getItems : function (skip_count, limit_count, fields, order, successCallback, errorCallback) {
					let
					type = "GET",
					url = this.url + "items",
					data = {
						skip: skip_count || 0,
						limit: limit_count || 1000,
						fields: fields || 'title',
						order: order || 'ASC'
					};

					ajax(type, url, data, successCallback, errorCallback);
				},

				getItemsInCategory : function (skip_count, limit_count, fields, order, category_id, successCallback, errorCallback) {
					let
					type = "GET",
					url = this.url + "items",
					data = {
						skip: skip_count || 0,
						limit: limit_count || 1000,
						fields: fields || 'title',
						order: order || 'ASC',
						category_id: category_id
					};

					ajax(type, url, data, successCallback, errorCallback);
				},

				getItem : function (id, successCallback, errorCallback) {
					let
					type = "GET",
					url = this.url + "items/" + id,
					data = '';

					ajax(type, url, data, successCallback, errorCallback);
				},
			},

			///USER METHODS
			//
			user : {
				get url() { return modules.innopoints.api.url + "accounts/" },

				get : function (successCallback, errorCallback) {
					let 
					type = "GET",
					url  = this.url + modules.accounts.token,
					data = '';

					ajax(type, url, data, successCallback, errorCallback);
				},

				create : function (successCallback, errorCallback) {
					let 
					type = "POST",
					url  = this.url + modules.accounts.token,
					data = '';

					ajax(type, url, data, successCallback, errorCallback);
				},
				
				getFile : function (appl_id, file_id, successCallback, errorCallback) {
					let 
					type = "GET",
					url  = this.url + modules.accounts.token + "/applications/" + appl_id + "/files/" + file_id,
					data = '';

					ajax(type, url, data, successCallback, errorCallback);
				},

				applicaiton : {
					get url() { return modules.innopoints.api.user.url },
					create : function (application, successCallback, errorCallback) {
						let 
						type = "POST",
						url  = this.url + modules.accounts.token + "/applications",
						data = { application };

						ajax(type, url, data, successCallback, errorCallback);
					},
					
					update : function (appl_id, new_params, successCallback, errorCallback) {
						let 
						type = "PUT",
						url  = this.url + modules.accounts.token + "/applications/" + appl_id,
						data = new_params;

						ajax(type, url, data, successCallback, errorCallback);
					},
					
					send : function (appl_id, successCallback, errorCallback) {
						let 
						type = "PUT",
						url  = this.url + modules.accounts.token + "/applications/" + appl_id,
						data = '';

						ajax(type, url, data, successCallback, errorCallback);
					},
					
					get : function (appl_id, successCallback, errorCallback) {
						let 
						type = "GET",
						url  = this.url + modules.accounts.token + "/applications/" + appl_id,
						data = '';

						ajax(type, url, data, successCallback, errorCallback);
					},
					
					delete : function (appl_id, successCallback, errorCallback) {
						let 
						type = "DELETE",
						url  = this.url + modules.accounts.token + "/applications/" + appl_id,
						data = '';

						ajax(type, url, data, successCallback, errorCallback);
					},
				},
				
				applications : {
					get url() { return modules.innopoints.api.user.url },
					get : function (skip_count, limit_count, successCallback, errorCallback) {
						let 
						type = "GET",
						url  = this.url + modules.accounts.token + "/applications",
						data = { skip: skip_count, limit: limit_count };

						ajax(type, url, data, successCallback, errorCallback);
					},

					getWithStatus : function (status, skip_count, limit_count, successCallback, errorCallback) {
						let 
						type = "GET",
						url  = this.url + modules.accounts.token + "/applications/" + status,
						data = { skip: skip_count, limit: limit_count };

						ajax(type, url, data, successCallback, errorCallback);
					},
				},
			},
			//
			///

			///ADMIN METHODS
			//
			admin : {
				get url() { return modules.innopoints.api.url + "admin/"; },

				getUserAccounts : function (skip_count, limit_count, successCallback, errorCallback) {
					let 
					type = "GET",
					url  = this.url + modules.accounts.token,
					data = { skip: skip_count, limit: limit_count };

					ajax(type, url, data, successCallback, errorCallback);
				},

				getUserAccount : function (id, admin_successCallback, errorCallback) {
					let 
					type = "GET",
					url  = this.url + modules.accounts.token + "/accounts/" + id,
					data = '';

					ajax(type, url, data, successCallback, errorCallback);
				},

				updateUserAccount : function (id, points, admin_successCallback, errorCallback) {
					let 
					type = "PUT",
					url  = this.url + modules.accounts.token + "/accounts/" + id,
					data = { points_amount : points };

					ajax(type, url, data, successCallback, errorCallback);
				},

				applications : {
					get url() { return modules.innopoints.api.admin.url },

					getWithStatus : function (status, skip_count, limit_count, successCallback, errorCallback) {
						let 
						type = "GET",
						url  = this.url + modules.accounts.token + "/applications/" + status,
						data = { skip: skip_count, limit: limit_count };

						ajax(type, url, data, successCallback, errorCallback);
					},

				},

				applicaiton : {
					get url() { return modules.innopoints.api.admin.url },
					create : function (application, successCallback, errorCallback) {
						let 
						type = "POST",
						url  = this.url + modules.accounts.token + "/applications",
						data = { applicaiton : application };

						ajax(type, url, data, successCallback, errorCallback);
					},
					
					update : function (appl_id, new_params, successCallback, errorCallback) {
						let 
						type = "PUT",
						url  = this.url + modules.accounts.token + "/applications/" + appl_id,
						data = new_params;

						ajax(type, url, data, successCallback, errorCallback);
					},
					
					get : function (appl_id, successCallback, errorCallback) {
						let 
						type = "GET",
						url  = this.url + modules.accounts.token + "/applications/" + appl_id,
						data = '';

						ajax(type, url, data, successCallback, errorCallback);
					},
					
					approve : function (appl_id, successCallback, errorCallback) {
						let 
						type = "PUT",
						url  = this.url + modules.accounts.token + "/applications/" + appl_id + "/approve",
						data = '';

						ajax(type, url, data, successCallback, errorCallback);
					},
					
					reject : function (appl_id, successCallback, errorCallback) {
						let 
						type = "PUT",
						url  = this.url + modules.accounts.token + "/applications/" + appl_id + "/reject",
						data = '';

						ajax(type, url, data, successCallback, errorCallback);
					},
					
					dismiss : function (appl_id, successCallback, errorCallback) {
						let 
						type = "PUT",
						url  = this.url + modules.accounts.token + "/applications/" + appl_id + "/to_rework",
						data = '';

						ajax(type, url, data, successCallback, errorCallback);
					}
				}
			}
			//
			///
		}
	}
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
	if (!(url.indexOf("getBio") > -1))
		xhr.setRequestHeader('Content-Type', 'application/json');

	xhr.send(JSON.stringify(data));
}

module.exports = modules;
module.exports.token = modules.accounts.token;