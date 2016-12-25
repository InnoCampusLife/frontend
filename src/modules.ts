import ajax from './modules/web'
import config from './config'
import storage from './storage'

const api_url = config.server.api_url;

// const testAccounts = require('entry-dir!!./modules/modules.config.js');
// console.log(testAccounts);

const modules = {
	accounts: {
		roles: [
			'ghost',
			'student',
			'moderator'
		],

		have(role) {
			return !!(this.roles.indexOf(role.toLowerCase()) > -1);
		},

		// Data

		id: null,
		username: null,
		role: null,
		firstName: null,
		lastName: null,
		patronymic: null,
		studyGroup: null,
		tgId: null,

		get token() {
			return this.storage.get(config.token_name);
		},

		set token(value) {
			this.storage.set(config.token_name, value);
		},

		get fullName() {
			const ln = (!!this.lastName 	? 		this.lastName + ' ': '');
			const fn = (!!this.firstName 	? 		this.firstName 	 	: '');
			const pn = (!!this.patronymic	? ' ' + this.patronymic 	: '');
			return fn + ln + pn;
		},

		get loggedIn() {
			return this.storage.get(config.token_name) ? true: false;
		},

		get isGhost() {
			return !!this.is('ghost');
		},

		get isStudent() {
			return !!this.is('student');
		},

		get isModerator() {
			return !!this.is('moderator');
		},

		is(ofType) {
			return !!this.role && !!modules.accounts.have(ofType) && !!(this.role.toLowerCase() === ofType.toLowerCase());
		},

		clear() {
			this.id         = null;
			this.role       = null;
			this.firstName  = null;
			this.lastName   = null;
			this.patronymic = null;
			this.studyGroup = null;
			this.token      = null;
			this.storage.clear();
		},

		set(data) {
			if (data.id)         this.id         = data.id;
			if (data.username)   this.username   = data.username;
			if (data.role)       this.role       = data.role;
			if (data.firstName)  this.firstName  = data.firstName;
			if (data.lastName) 	 this.lastName   = data.lastName;
			if (data.patronymic) this.patronymic = data.patronymic;
			if (data.studyGroup) this.studyGroup = data.studyGroup;
			if (data.token)      this.token      = data.token;
		},

		update(successCallback, errorCallback) {
			const self = this;
			this.get((result) => {
					console.log('Called update with result: ', result)
					self.set(result);
					if (successCallback) successCallback(result);
				},
				errorCallback)
		},

		storage,

		preferences: {

			save(successCallback, errorCallback) {
				const that = this;
				const type = "PUT",
				url  = this.url + modules.accounts.token + '/updatePreferences',
				data = {
					preferences: that
				};

				ajax(type, url, data, successCallback, errorCallback);
			},

			get(successCallback, errorCallback) {
				const type = "GET",
				url  = this.url + modules.accounts.token + '/getPreferences',
				data = '';

				ajax(type, url, data, successCallback, errorCallback);
			}
		},

		version: 1,
		name: "accounts",
		get url() {	return api_url + "v" + this.version + "/" + this.name + "/"; },

		create(password, email, successCallback, errorCallback) {
			const
			type = "POST",
			url  = this.url,
			data = {
				username: this.username,
				password: password,
				email: email,
				firstName: this.firstName,
				lastName: this.lastName,
				studyGroup: this.studyGroup
			};

			ajax(type, url, data, successCallback, errorCallback);
		},

		authorize(password, successCallback, errorCallback) {
			const
			type = "POST",
			url  = this.url + "auth",
			data = {
				username: this.username,
				password: password
			};

			ajax(type, url, data, successCallback, errorCallback);
		},

		get(successCallback, errorCallback) {
			const type = "GET"
			const url  = this.url + this.token
			const data = ''

			ajax(type, url, data, successCallback, errorCallback);
		},

		// Moderator methods

		list(successCallback, errorCallback) {
			const type = "GET",
			url  = this.url + this.token + "/listAccounts",
			data = '';

			ajax(type, url, data, successCallback, errorCallback);
		},

		updateRole(account_id, new_role, successCallback, errorCallback) {
			const type = "PUT",
			url  = this.url + this.token + "/updateRole",
			data = { accountId: account_id, newRole: new_role };

			ajax(type, url, data, successCallback, errorCallback);
		},

		exists(args, successCallback, errorCallback) {
			const type = "GET",
			url  = this.url + this.token + "/exists?" + 'token=' + this.token + '&' + (args.id ? "id=" + args.id : "username=" + args.username),
			data = '';

			ajax(type, url, data, successCallback, errorCallback);
		},

		getBio(args, successCallback, errorCallback) {
			const type = "GET",
			url  = this.url + this.token + "/getBio?" + (args.id ? "id=" + args.id : "username=" + args.username),
			data = '';

			ajax(type, url, data, successCallback, errorCallback);
		},
	},

	innopoints: {
		roles: [
			'student',
			'admin'
		],

		have (role) {
			return !!(this.roles.indexOf(role) > -1);
		},

		data: {
			id		: null,
			amount	: null,
			role 	: null,

			get isStudent() {
				return !!this.is('student');
			},

			get isAdmin() {
				return !!this.is('admin');
			},

			is(ofType) {
				return !!this.role && !!modules.innopoints.have(ofType) && !!(this.role.toLowerCase() === ofType.toLowerCase());
			},

			update(successCallback, errorCallback)	{
				const that = this;
				modules.innopoints.api.user.get({
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

			getActivities(args) {
				const type = "GET",
				url = this.url + "activities" + (args.cat_id ? '/' + args.cat_id: ''),
				data = { skip: args.skip_count || null, limit: args.limit_count || null };
				ajax(type, url, data, args.successCallback, args.errorCallback);
			},

			getCategories(args) {
				const type = "GET",
				url = this.url + "categories",
				data = { skip: args.skip_count || null, limit: args.limit_count || null };
				ajax(type, url, data, args.successCallback, args.errorCallback);
			},

			store: {
				get url() { return modules.innopoints.api.url + "shop/" },

				getItems(args) {
					const type = "GET",
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

				getItem(id, successCallback, errorCallback) {
					const type = "GET",
					url = this.url + "items/" + id,
					data = '';
					ajax(type, url, data, successCallback, errorCallback);
				},

				order: {
					get url() { return modules.innopoints.api.user.url },

					create(args) {
						const type = "POST",
						url  = this.url + modules.accounts.token + '/orders',
						data = args.order;

						ajax(type, url, data, args.successCallback, args.errorCallback);
					},

					update(args) {
						const type = "POST",
						url  = this.url + modules.accounts.token + '/orders/' + args.id + '/contributors/' + args.action,
						data = '';

						ajax(type, url, data, args.successCallback, args.errorCallback);
					},

					delete(args) {
						const type = "DELETE",
						url  = this.url + modules.accounts.token + '/orders/' + args.id,
						data = '';

						ajax(type, url, data, args.successCallback, args.errorCallback);
					}
				},
			},

			user: {
				get isAdmin() { return modules.innopoints.data.isAdmin; },
				get url() { return modules.innopoints.api.url + (this.isAdmin ? "admin/": "accounts/") },

				get(args) {
					let type = "GET",
					url  = modules.innopoints.api.url + 'accounts/' + modules.accounts.token,
					data = '';

					if (this.isAdmin) if(args.id)
						url += "/accounts/" + args.id;

					ajax(type, url, data, args.successCallback, args.errorCallback);
				},

				create(successCallback, errorCallback) {
					const type = "POST",
					url  = this.url + modules.accounts.token,
					data = '';

					ajax(type, url, data, successCallback, errorCallback);
				},

				getFile(appl_id, file_id, successCallback, errorCallback) {
					const type = "GET",
					url  = this.url + modules.accounts.token + "/applications/" + appl_id + "/files/" + file_id,
					data = '';

					ajax(type, url, data, successCallback, errorCallback);
				},

				getAccounts(args) {
					const type = "GET",
					url  = this.url + modules.accounts.token,
					data = { skip: args.skip_count || null, limit: args.limit_count || null };

					ajax(type, url, data, args.successCallback, args.errorCallback);
				},

				updateAccount(args) {
					const type = "PUT",
					url  = this.url + modules.accounts.token + "/accounts/" + args.id,
					data = { points_amount: args.points };

					ajax(type, url, data, args.successCallback, args.errorCallback);
				},

				getListOfOrders(successCallback, errorCallback) {
					const type = "GET",
					url = this.url + modules.accounts.token + '/orders',
					data = ''

					ajax(type, url, data, successCallback, errorCallback)
				},

				application: {
					get url() { return modules.innopoints.api.user.url },

					create(application, successCallback, errorCallback) {
						const type = "POST",
						url  = this.url + modules.accounts.token + "/applications",
						data = { application:application };

						ajax(type, url, data, successCallback, errorCallback);
					},

					update(appl_id, new_params, successCallback, errorCallback) {
						const type = "PUT",
						url  = this.url + modules.accounts.token + "/applications/" + appl_id,
						data = new_params;

						ajax(type, url, data, successCallback, errorCallback);
					},

					send(appl_id, successCallback, errorCallback) {
						const type = "PUT",
						url  = this.url + modules.accounts.token + "/applications/" + appl_id + '/approve',
						data = '';

						ajax(type, url, data, successCallback, errorCallback);
					},

					get(appl_id, successCallback, errorCallback) {
						const type = "GET",
						url  = this.url + modules.accounts.token + "/applications/" + appl_id,
						data = '';

						ajax(type, url, data, successCallback, errorCallback);
					},

					delete(appl_id, successCallback, errorCallback) {
						const type = "DELETE",
						url  = this.url + modules.accounts.token + "/applications/" + appl_id,
						data = '';

						ajax(type, url, data, successCallback, errorCallback);
					},

					approve(appl_id, successCallback, errorCallback) {
						const type = "PUT",
						url  = this.url + modules.accounts.token + "/applications/" + appl_id + "/approve",
						data = '';

						ajax(type, url, data, successCallback, errorCallback);
					},

					reject(appl_id, successCallback, errorCallback) {
						const type = "PUT",
						url  = this.url + modules.accounts.token + "/applications/" + appl_id + "/reject",
						data = '';

						ajax(type, url, data, successCallback, errorCallback);
					},

					to_rework({ appl_id, comment }, successCallback, errorCallback) {
						const type = "PUT",
						url  = this.url + modules.accounts.token + "/applications/" + appl_id + "/to_rework",
						data = { comment };

						ajax(type, url, data, successCallback, errorCallback);
					},

					dismiss(appl_id, successCallback, errorCallback) {
						const type = "PUT",
						url  = this.url + modules.accounts.token + "/applications/" + appl_id + "/to_rework",
						data = '';

						ajax(type, url, data, successCallback, errorCallback);
					}
				},

				applications: {
					get url() { return modules.innopoints.api.user.url },

					get(args) {
						if (args.status == 'all') args.status = null;
						const type = "GET",
						url  = this.url + modules.accounts.token + "/applications" + (args.status ? '/' + args.status: ''),
						data = { skip: args.skip_count, limit: args.limit_count };
						ajax(type, url, data, args.successCallback, args.errorCallback);
					}
				}
			}
		}
	}
};

module.exports = modules;
module.exports.token = modules.accounts.token;
