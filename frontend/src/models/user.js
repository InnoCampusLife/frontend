var config = require('./../config');

var user = {
	id 			: null,
	username	: null,
	firstName	: null,
	lastName	: null,
	patronymic	: null,
	studyGroup	: null,
	tgId		: null,
	email		: null,

	get token() {
		return this.storage.get(config.token_name);
	},

	set token(value) {
		return this.storage.set(config.token_name, value);
	},
	
	get fullName () {
		var ln = (this.lastName 	? 		this.lastName + ' ' : '');
		var fn = (this.firstName 	? 		this.firstName 	 	: '');
		var pn = (this.patronymic 	? ' ' + this.patronymic 	: '');
		return ln + fn + pn;
	},

	storage: require('./storage'),

	roles : {},

	/* Test roles dynamic parsing
	
	get _roles() {
		let roles = {};
		for(let _module in config.modules)
			roles[_module.name] = this.roles[_module.name] || _module.userTypes[0];
		return roles;
	},
	set _roles(obj) {
		for(let _module in obj)

	}

	*/

	is : {
		uis : {
			get moderator() {
				return config.modules['uis'].is(user, 'moderator');
			}
		}
	},
	
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
		this.email = user.email;
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

};


///User preferences - TODO
//
user.preferences = {
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

///Innopoints account
//
user.innopoints = {
		///For the sake of reactivity - C# style properties.
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

			api.innopoints.user.getAccount(cur_user.token, 
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

			api.innopoints.user.createAccount(cur_user.token,
				function (result) {
					cur_user.innopoints.set(result);
					if(successCallback) successCallback(result);
				},
				function (error) {
					if (errorCallback) errorCallback(error);
				}
			);
		},

		application : {
			create (application, successCallback, errorCallback) {
				if (user.is.uis.moderator) {
					api.innopoints.admin.createApplication(user.token, application, successCallback, errorCallback);
				} else if (user.is.uis.student) {
					api.innopoints.user.createApplication(user.token, application, successCallback, errorCallback);
				} else {
					if (errorCallback) errorCallback("Not enough rights");
				}
			},

			send (appl_id, successCallback, errorCallback) {
				if (user.is.uis.moderator) {
					api.innopoints.admin.sendApplication(appl_id, user.token, successCallback, errorCallback);
				} else if (user.is.uis.student) {
					api.innopoints.user.sendApplication(appl_id, user.token, successCallback, errorCallback);
				} else {
					if (errorCallback) errorCallback("Not enough rights");
				}
			},

			update (appl_id, new_params, successCallback, errorCallback) {
				if (user.is.uis.moderator) {
					api.innopoints.admin.updateApplication(appl_id, new_params, user.token, successCallback, errorCallback);
				} else if (user.is.uis.student) {
					api.innopoints.user.updateApplication(appl_id, new_params, user.token, successCallback, errorCallback);
				} else {
					if (errorCallback) errorCallback("Not enough rights");
				}
			},

			get (appl_id, successCallback, errorCallback) {
				if (user.is.uis.moderator) {
					api.innopoints.admin.getApplication(appl_id, user.token, successCallback, errorCallback);
				} else if (user.is.uis.student) {
					api.innopoints.user.getApplication(appl_id, user.token, successCallback, errorCallback);
				} else {
					if (errorCallback) errorCallback("Not enough rights");
				}
			},

			delete (appl_id, successCallback, errorCallback) {
				if (user.is.uis.student) {
					api.innopoints.user.deleteApplication(appl_id, user.token, successCallback, errorCallback);
				} else {
					if (errorCallback) errorCallback("Not enough rights");
				}
			},

			approve (appl_id, successCallback, errorCallback) {
				if (user.is.uis.moderator) {
					api.innopoints.admin.approveApplication(appl_id, user.token, successCallback, errorCallback);
				} else {
					if (errorCallback) errorCallback("Not enough rights");
				}
			},

			reject (appl_id, successCallback, errorCallback) {
				if (user.is.uis.moderator) {
					api.innopoints.admin.rejectApplication(appl_id, user.token, successCallback, errorCallback);
				} else {
					if (errorCallback) errorCallback("Not enough rights");
				}
			},

			dismiss (appl_id, successCallback, errorCallback) {
				if (user.is.uis.moderator) {
					api.innopoints.admin.dismissApplication(appl_id, user.token, successCallback, errorCallback);
				} else {
					if (errorCallback) errorCallback("Not enough rights");
				}
			},

			getFile(appl_id, file_id, successCallback, errorCallback) {
				if (user.is.uis.student) {
					api.innopoints.user.getFile(appl_id, file_id, user.token, successCallback, errorCallback);
				} else {
					if (errorCallback) errorCallback("Not enough rights");
				}
			}
		},

		applications : {
			get (status, successCallback, errorCallback) {
				if (status) {
					if (user.is.uis.moderator) {										///TODO - fix this numbers - pagination???
						api.innopoints.admin.getAllApplicationsWithStatus(status, user.token, 100, 100, successCallback, errorCallback);
					} if (user.is.uis.student) {
						api.innopoints.user.getApplicationsWithStatus(status, user.token, 100, 100, successCallback, errorCallback);
					} else {
						if (errorCallback) errorCallback("Not enough rights");
					}
				} else {
					if (user.is.uis.student) {
						api.innopoints.user.getApplications(user.token, 100, 100, successCallback, errorCallback);
					} else {
						if (errorCallback) errorCallback("Not enough rights");
					}
				}
			}
		},

		account : {
			get (id, successCallback, errorCallback) {
				if (user.is.uis.moderator) {
					api.innopoints.admin.getUserAccount(id, user.token, successCallback, errorCallback);
				} else {
					if (errorCallback) errorCallback("Not enough rights");
				}
			},

			update (id, points_amount, successCallback, errorCallback) {
				if (user.is.uis.moderator) {
					api.innopoints.admin.updateUserAccount(id, points_amount, user.token,
						function (result) {
							if (successCallback) successCallback(result);
						},
						function (error) {
							if (errorCallback) errorCallback(error);
						}
					);
				} else {
					if (errorCallback) errorCallback("Not enough rights");
				}
			}
		},

		accounts : {
			get (successCallback, errorCallback) {
				if (user.is.uis.moderator) {			///TODO - fix this numbers - pagination???
					api.innopoints.admin.getUserAccount(100, 100, user.token, successCallback, errorCallback);
				} else {
					if (errorCallback) errorCallback("Not enough rights");
				}
			}
		}
		//
		///
	},
	//
	///


for (let key in config.modules) {
	var _module = config.modules[key];
	user.roles[_module.name] = _module.userTypes[0];
}

// for (let _module in config.modules)
	console.log(user.roles);

module.exports = user;
module.exports.token = user.token;