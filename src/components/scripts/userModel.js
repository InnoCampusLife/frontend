module.exports = {
	id : 		 undefined,
	username : 	 undefined,
	role : 		 undefined,
	firstName :  undefined,
	lastName : 	 undefined,
	patronymic : undefined,
	studyGroup : undefined,
	tgId : 		 undefined,
	get loggedIn () {
		return this.storage.get('usertoken') ? true : false;
	},
	get fullName () {
		let ln = (this.lastName 	!= undefined ? 		this.lastName + ' ' : '');
		let fn = (this.firstName 	!= undefined ? 		this.firstName 	 	: '');
		let pn = (this.patronymic 	!= undefined ? ' ' + this.patronymic 	: '');
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
			if (typeof(Storage) != undefined) {
				return localStorage.getItem(key);
			}
			else {
				let oCrumbles = document.cookie.split(';');
			    for(let i=0; i<oCrumbles.length;i++)
			    {
			        let oPair	= oCrumbles[i].split('=');
			        let sKey 	= decodeURIComponent(oPair[0].trim());
			        let sValue 	= oPair.length>1 ? oPair[1] : '';
			        if(sKey == key) {
			            return decodeURIComponent(sValue);
			        }
			    }
			    return undefined;
			}
		},
		set (key, value) {
			if (typeof(Storage) != undefined) {
				localStorage.setItem(key, value);
				return localStorage.getItem(key);
			}
			else {
				let cookie = sName + '=' + value;
				document.cookie = cookie;
				return cookie;
			}
		},
		clear () {
			if (typeof(Storage) != undefined)
				localStorage.clear();
			else
				document.cookie = '';
		}
	},

	///Helpers
	//
	get isAdmin () { return this.role == 'moderator' || this.role == 'admin'; },
	get isStudent () { return this.role == 'student'; },
	get isGhost () { return this.role == 'ghost'; },

	clear () {
		this.id = undefined;
		this.firstName = undefined;
		this.lastName = undefined;
		this.patronymic = undefined;
		this.role = undefined;
		this.studyGroup = undefined;
		this.tgId = undefined;
		this.token = undefined;
		this.storage.clear();
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
		this.token = user.token == undefined ? this.token : user.token;
	},
	//
	///

	///Innopoints account
	//
	innopoints : {
		id :	undefined,
		amount : 0,
		transactions : {},
		applications : {},
		orders : {}
	}
	//
	///
};