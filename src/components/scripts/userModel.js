module.exports = {
	id : 		 '',
	username : 	 '',
	role : 		 '',
	set Role(value) { this.role = value; this.storage.set('role', this.role); return this.role; },
	firstName :  '',
	lastName : 	 '',
	patronymic : '',
	studyGroup : '',
	tgId : 		 '',
	get loggedIn () {
		return this.storage.get('usertoken') ? true : false;
	},
	get fullName () {
		let ln = (this.lastName 	!= null ? 		this.lastName + ' ' : '');
		let fn = (this.firstName 	!= null ? 		this.firstName 	 	: '');
		let pn = (this.patronymic 	!= null ? ' ' + this.patronymic 	: '');
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
	}
};