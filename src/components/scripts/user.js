var user = {
	//id
	get id 			()		{ return this.storage.get('id');				},
	set id 			(value) { return this.storage.set('id', value);			},

	//username
	get username	()		{ return this.storage.get('username');			},
	set username	(value)	{ return this.storage.set('username', value);	},

	//role
	get role		()		{ return this.storage.get('role');				},
	set role		(value)	{ return this.storage.set('role', value);		},

	//firstName
	get firstName	()		{ return this.storage.get('firstName');			},
	set firstName	(value)	{ return this.storage.set('firstName', value);	},

	//lastName
	get lastName	()		{ return this.storage.get('lastName');			},
	set lastName	(value)	{ return this.storage.set('lastName', value);	},

	//patronymic
	get patronymic	()		{ return this.storage.get('patronymic');		},
	set patronymic	(value)	{ return this.storage.set('patronymic', value); },

	//studyGroup
	get studyGroup	()		{ return this.storage.get('studyGroup');		},
	set studyGroup	(value)	{ return this.storage.set('studyGroup', value); },

	//tgId
	get tgId		()		{ return this.storage.get('tgId');				},
	set tgId 		(value)	{ return this.storage.set('tgId', value);		},

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
		clear () {
			localStorage.clear();
		}
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
	},
	//
	///

	///Innopoints account
	//
	points : {
		//id
		get id 		()		{ return user.storage.get('innopoints.id');				},
		set id 		(value) { return user.storage.set('innopoints.id', value);		},

		//amount
		get amount 	()		{ return user.storage.get('innopoints.amount');			},
		set amount 	(value) { return user.storage.set('innopoints.amount', value);	},

		transactions : [],
		applications : [],
		orders : [],

		set (points) {
			this.owner = points._id;
			this.amount = points.points_amount;
		}
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