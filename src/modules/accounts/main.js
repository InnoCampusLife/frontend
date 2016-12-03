var config  = require('./config.js');
var api_url = require("./../../config.js").server.api_url;

module.exports = {
	name : "accounts",
	roles : [
		'ghost',
		'student',
		'moderator'
	],

	have : function (role) {
		return !!this.roles.includes(role.toLowerCase());
	},

	data : {
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
			return fn + ln + pn;
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

		is : function (ofType) {
			return !!this.role && !!modules.accounts.have(ofType) && !!(this.role.toLowerCase() === ofType.toLowerCase());
		},

		clear : function () {
			this.id         = null;
			this.role       = null;
			this.firstName  = null;
			this.lastName   = null;
			this.patronymic = null;
			this.studyGroup = null;
			this.token      = null;
			this.storage.clear();
		},

		set : function (data) {
			if (data.id) 		 this.id         = data.id;
			if (data.username) 	 this.username   = data.username;
			if (data.role) 		 this.role       = data.role;
			if (data.firstName)  this.firstName  = data.firstName;
			if (data.lastName) 	 this.lastName   = data.lastName;
			if (data.patronymic) this.patronymic = data.patronymic;
			if (data.studyGroup) this.studyGroup = data.studyGroup;
			if (data.token) 	 this.token      = data.token;
		},

		update : function (successCallback, errorCallback) {
			var that = this;
			this.get(result => {
					that.set(result);
					if (successCallback) successCallback(result);
				},
				errorCallback
			);
		},

		storage : require('./../../storage.js'),

		preferences : {
			//TODO
			fixHeader: true,

			save : function(successCallback, errorCallback) {
				var that = this;
				var 
				type = "PUT",
				url  = this.url + modules.accounts.token + '/updatePreferences',
				data = { 
					preferences : that
				};

				ajax(type, url, data, successCallback, errorCallback);
			},

			get : function(successCallback, errorCallback) {
				var 
				type = "GET",
				url  = this.url + modules.accounts.token + '/getPreferences',
				data = '';

				ajax(type, url, data, successCallback, errorCallback);
			}
		},
	},
	//
	
	api : {
		version : 1,
		name : "accounts",
		get url() {	return api_url + "v" + this.version + "/" + this.name + "/"; },

		create : function (password, email, successCallback, errorCallback) {
			var 
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

		authorize : function (password, successCallback, errorCallback) {
			var 
			type = "POST",
			url  = this.url + "auth",
			data = {
				username: this.username,
				password: password
			};

			ajax(type, url, data, successCallback, errorCallback);
		},

		get : function (successCallback, errorCallback) {
			var 
			type = "GET",
			url  = this.url + this.token,
			data = '';

			ajax(type, url, data, successCallback, errorCallback);
		},

		///MODER METHODS
		//
		list : function (successCallback, errorCallback) {
			var
			type = "GET",
			url  = this.url + this.token + "/listAccounts",
			data = '';
			
			ajax(type, url, data, successCallback, errorCallback);
		},

		updateRole : function (account_id, new_role, successCallback, errorCallback) {
			var
			type = "PUT",
			url  = this.url + this.token + "/updateRole",
			data = { accountId: account_id, newRole: new_role };

			ajax(type, url, data, successCallback, errorCallback);
		},
		//
		///

		exists : function (successCallback, errorCallback) {
			var 
			type = "GET",
			url  = this.url + this.token + "/exists",
			data = '';

			ajax(type, url, data, successCallback, errorCallback);
		},

		getBio : function (args, successCallback, errorCallback) {
			var 
			type = "GET",
			url  = this.url + this.token + "/getBio?" + (args.id ? "id=" + args.id : "username=" + args.username),
			data = '';

			ajax(type, url, data, successCallback, errorCallback);
		},
	}
};
