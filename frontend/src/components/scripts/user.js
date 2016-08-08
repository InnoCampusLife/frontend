var api = require('./api.js');

var user = {
	_id 		: null,
	_username	: null,
	_role		: null,
	_firstName	: null,
	_lastName	: null,
	_patronymic	: null,
	_studyGroup	: null,
	_tgId		: null,

	//id
	get id 			()		{ return this._id ? this._id : this.storage.get('id');								},
	set id 			(value) { this._id = value; return this.storage.set('id', this._id);						},

	//username
	get username	()		{ return this._username ? this._username : this.storage.get('username');			},
	set username	(value)	{ this._username = value; return this.storage.set('username', this._username);		},

	//role
	get role		()		{ return this._role ? this._role : this.storage.get('role');						},
	set role		(value)	{ this._role = value; return this.storage.set('role', this._role);					},

	//firstName
	get firstName	()		{ return this._firstName ? this._firstName : this.storage.get('firstName');			},
	set firstName	(value)	{ this._firstName = value; return this.storage.set('firstName', this._firstName);	},

	//lastName
	get lastName	()		{ return this._lastName ? this._lastName : this.storage.get('lastName');			},
	set lastName	(value)	{ this._lastName = value; return this.storage.set('lastName', this._lastName);		},

	//patronymic
	get patronymic	()		{ return this._patronymic ? this._patronymic : this.storage.get('patronymic');		},
	set patronymic	(value)	{ this._patronymic = value; return this.storage.set('patronymic', this._patronymic);},

	//studyGroup
	get studyGroup	()		{ return this._studyGroup ? this._studyGroup : this.storage.get('studyGroup');		},
	set studyGroup	(value)	{ this._studyGroup = value; return this.storage.set('studyGroup', this._studyGroup);},

	//tgId
	get tgId		()		{ return this._tgId ? this._tgId : this.storage.get('tgId');						},
	set tgId 		(value)	{ this._tgId = value; return this.storage.set('tgId', this._tgId);					},

	get loggedIn () {
		return this.storage.get('usertoken') ? true : false;
	},

	get fullName () {
		let ln = (this.lastName 	? 		this.lastName + ' ' : '');
		let fn = (this.firstName 	? 		this.firstName 	 	: '');
		let pn = (this.patronymic 	? ' ' + this.patronymic 	: '');
		return ln + fn + pn;
	},

	get token () {
		return this.storage.get('usertoken');
	},

	set token (value) {
		return this.storage.set('usertoken', value);
	},

	storage: {
		get (key) {
			return localStorage.getItem(key);
		},
		set (key, value) {
			if (value) localStorage.setItem(key, value);
			return localStorage.getItem(key);
		},
		clear () { localStorage.clear(); }
	},

	///Helpers
	//
	get isAdmin () { return this.role == 'moderator' || this.role == 'admin'; },
	get isStudent () { return this.role == 'student'; },
	get isGhost () { return this.role == 'ghost'; },

	clear () {
		let un = this.username;
		this.storage.clear();
		this.username = un;
	},

	set (user) {
		this.id = user.id;
		this.username = user.username;
		this.firstName = user.firstName;
		this.lastName = user.lastName;
		this.patronymic = user.patronymic;
		this.role = user.role;
		this.studyGroup = user.studyGroup;
		this.tgId = user.tgId;
		this.token = user.token;

		return this;
	},
	//
	///

	///API shorthand
	//
	authorize (password, successCallback, errorCallback) {
		api.accounts.authorize(this.username, password, successCallback, errorCallback);
	},
	register (password, successCallback, errorCallback) {
		api.accounts.createAccount(this.username, password, successCallback, errorCallback);
	},

	update (successCallback, errorCallback) {
		let cur_user = this;

		api.accounts.get(cur_user.token,
			function (result) {
				cur_user.set(result);
				if (successCallback) successCallback(cur_user);
			},
			function (error) {
		 		if (errorCallback) errorCallback(error);
	 		}
 		);
	},

	exists(successCallback, errorCallback) {
		api.accounts.exists(
			this.token,
			successCallback,
			errorCallback
		);
	},
	//
	///

	///Innopoints account
	//
	innopoints : {
		_id : null,
		_amount : null,

		//id
		get id 		()		{ return this._id ? this._id : user.storage.get('innopoints.id'); },
		set id 		(value) { return user.storage.set('innopoints.id', this._id = value);	  },

		//amount
		get amount 	()	{
			if (this._amount === null)
				if (user.storage.get('innopoints.amount'))
					return user.storage.get('innopoints.amount') 
				else
					return 0;
			else
				return this._amount;
		},
		set amount 	(value) { return user.storage.set('innopoints.amount', this._amount = value); },

		set (points) {
			this.id = points.owner;
			this.amount = points.points_amount;
		},

		///API shorthand
		//
		update (successCallback, errorCallback) {
			let cur_user = user;

			api.innopoints.getAccount(cur_user.token, 
				function (result) {
					cur_user.innopoints.set(result);
					if (successCallback) successCallback(result);
				},
				function (error) {
					if (errorCallback) errorCallback(error);
				}
			);
		},

		createAccount (successCallback, errorCallback) {
			let cur_user = user;

			api.innopoints.createAccount(cur_user.token,
				function (result) {
					cur_user.innopoints.set(result);
					if(successCallback) successCallback(result);
				},
				function (error) {
					if (errorCallback) errorCallback(error);
				}
			);
		}
		//
		///
	},
	//
	///

	///User preferences
	//
	preferences : {
		color : {
			//Primary Color in hex
			get primary () { return user.storage.get('preferences.color.primary'); },
			set primary (value) { return user.storage.set('preferences.color.primary', value); },

			//Secondary Color in hex
			get secondary () { return user.storage.get('preferences.color.secondary'); },
			set secondary (value) { return user.storage.set('preferences.color.secondary', value); }
		},

		//theme - boolean (dark/light)
		get theme () { return user.storage.get('preferences.theme'); },
		set theme (value) { return user.storage.set('preferences.theme', value); },

		//Rounded corners - boolean
		corners : {
			get rounded () { return user.storage.get('preferences.corners.rounded'); },
			set rounded (value) { return user.storage.set('preferences.corners.rounded', value); }
		},

		//opacity - boolean
		get opacity () { return user.storage.get('preferences.opacity'); },
		set opacity (value) { return user.storage.set('preferences.opacity', value); },

		//blurEnabled - boolean
		get blurEnabled () { return user.storage.get('preferences.blurEnabled'); },
		set blurEnabled (value) { return user.storage.set('preferences.blurEnabled', value); }
	}
	//
	///
};

module.exports = user;
module.exports.token = user.token;