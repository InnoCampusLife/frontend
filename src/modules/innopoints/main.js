var api_url = require("./../../config.ts").default.server.api_url;
var accounts = { get token() { return localStorage.getItem('usertoken'); } };

const innopoints = {
	name: "innopoints",
	roles: [
		'student',
		'admin'
	],
	have : function (role) {
		return !!(this.roles.indexOf(role) > -1);
	},
	data: {
		id		: null,
		amount	: null,
		role 	: null,

		get isStudent () {
			return !!this.is('student');
		},

		get isAdmin () {
			return !!this.is('admin');
		},

		is: function (ofType) {
			return !!this.role && !!innopoints.have(ofType) && !!(this.role.toLowerCase() === ofType.toLowerCase());
		},

		update: function (successCallback, errorCallback)	{
			var that = this;
			innopoints.api.user.get({
				successCallback: result => {
					that.id = result.id;
					that.amount = result.points_amount || 0;
					that.role = result.type;

					if (successCallback) successCallback(result);
				},
				errorCallback: errorCallback
			});
		}
	},

	api: {
		version: 1,
		name: "points",
		get url() { return api_url + "v" + this.version + "/" + this.name + "/"; },

		getActivities: function (args) {
			var
			type = "GET",
			url = this.url + "activities" + (args.cat_id ? '/' + args.cat_id: ''),
			data = { skip: args.skip_count || null, limit: args.limit_count || null };

			ajax(type, url, data, args.successCallback, args.errorCallback);
		},

		getCategories: function (args) {
			var
			type = "GET",
			url = this.url + "categories",
			data = { skip: args.skip_count || null, limit: args.limit_count || null };

			ajax(type, url, data, args.successCallback, args.errorCallback);
		},

		shop: {
			get url() { return innopoints.api.url + "shop/" },

			getItems: function (args) {
				var
				type = "GET",
				url = this.url + "items",
				data = {
					skip: args.skip_count || null,
					limit: args.limit_count || null,
					fields: args.fields || 'title',
					order: args.order || 'ASC',
					category_id: args.category_id || null
				};

				ajax(type, url, data, args.successCallback, args.errorCallback);
			},

			getItem: function (id, successCallback, errorCallback) {
				var
				type = "GET",
				url = this.url + "items/" + id,
				data = '';

				ajax(type, url, data, successCallback, errorCallback);
			},

			order: {
				get url() { return innopoints.api.user.url },

				create: function(args) {
					var
					type = "POST",
					url  = this.url + accounts.token + '/orders',
					data = '';

					ajax(type, url, data, args.successCallback, args.errorCallback);
				},

				update: function(args) {
					var
					type = "POST",
					url  = this.url + accounts.token + '/orders/' + args.id + '/contributors/' + args.action,
					data = '';

					ajax(type, url, data, args.successCallback, args.errorCallback);
				},

				delete: function(args) {
					var
					type = "DELETE",
					url  = this.url + accounts.token + '/orders/' + args.id,
					data = '';

					ajax(type, url, data, args.successCallback, args.errorCallback);
				}
			}
		},

		user: {
			get isAdmin() { return innopoints.data.isAdmin; },
			get url() { return innopoints.api.url + (this.isAdmin ? "admin/": "accounts/") },

			get: function (args) {
				var 
				type = "GET",
				url  = innopoints.api.url + 'accounts/' + accounts.token,
				data = '';

				if (this.isAdmin) if(args.id)
					url += "/accounts/" + args.id;

				ajax(type, url, data, args.successCallback, args.errorCallback);
			},

			create: function (successCallback, errorCallback) {
				var 
				type = "POST",
				url  = this.url + accounts.token,
				data = '';

				ajax(type, url, data, successCallback, errorCallback);
			},
			
			getFile: function (appl_id, file_id, successCallback, errorCallback) {
				var 
				type = "GET",
				url  = this.url + accounts.token + "/applications/" + appl_id + "/files/" + file_id,
				data = '';

				ajax(type, url, data, successCallback, errorCallback);
			},

			getAccounts: function (args) {
				var 
				type = "GET",
				url  = this.url + accounts.token,
				data = { skip: args.skip_count || null, limit: args.limit_count || null };

				ajax(type, url, data, args.successCallback, args.errorCallback);
			},

			updateAccount: function (args) {
				var 
				type = "PUT",
				url  = this.url + accounts.token + "/accounts/" + args.id,
				data = { points_amount: args.points };

				ajax(type, url, data, args.successCallback, args.errorCallback);
			},

			application: {
				get url() { return innopoints.api.user.url },

				create: function (application, successCallback, errorCallback) {
					var 
					type = "POST",
					url  = this.url + accounts.token + "/applications",
					data = { application:application };

					ajax(type, url, data, successCallback, errorCallback);
				},
				
				update: function (appl_id, new_params, successCallback, errorCallback) {
					var 
					type = "PUT",
					url  = this.url + accounts.token + "/applications/" + appl_id,
					data = new_params;

					ajax(type, url, data, successCallback, errorCallback);
				},
				
				send: function (appl_id, successCallback, errorCallback) {
					var 
					type = "PUT",
					url  = this.url + accounts.token + "/applications/" + appl_id + '/approve',
					data = '';

					ajax(type, url, data, successCallback, errorCallback);
				},
				
				get: function (appl_id, successCallback, errorCallback) {
					var 
					type = "GET",
					url  = this.url + accounts.token + "/applications/" + appl_id,
					data = '';

					ajax(type, url, data, successCallback, errorCallback);
				},
				
				delete: function (appl_id, successCallback, errorCallback) {
					var 
					type = "DELETE",
					url  = this.url + accounts.token + "/applications/" + appl_id,
					data = '';

					ajax(type, url, data, successCallback, errorCallback);
				},
				
				approve: function (appl_id, successCallback, errorCallback) {
					var 
					type = "PUT",
					url  = this.url + accounts.token + "/applications/" + appl_id + "/approve",
					data = '';

					ajax(type, url, data, successCallback, errorCallback);
				},
				
				reject: function (appl_id, successCallback, errorCallback) {
					var 
					type = "PUT",
					url  = this.url + accounts.token + "/applications/" + appl_id + "/reject",
					data = '';

					ajax(type, url, data, successCallback, errorCallback);
				},
				
				dismiss: function (appl_id, successCallback, errorCallback) {
					var 
					type = "PUT",
					url  = this.url + accounts.token + "/applications/" + appl_id + "/to_rework",
					data = '';

					ajax(type, url, data, successCallback, errorCallback);
				}
			},
			
			applications: {
				get url() { return innopoints.api.user.url },

				get: function (args) {
					if (args.status == 'all')
						args.status = null;

					var 
					type = "GET",
					url  = this.url + accounts.token + "/applications" + (args.status ? '/' + args.status: ''),
					data = { skip: args.skip_count, limit: args.limit_count };

					ajax(type, url, data, args.successCallback, args.errorCallback);
				}
			}
		}
	}
};

module.exports = innopoints;
