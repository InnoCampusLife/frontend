var userModel = {
	id : 		 '',
	username : 	 '',
	role : 		 '',
	firstName :  '',
	lastName : 	 '',
	patronymic : '',
	studyGroup : '',
	tgId : 		 '',
	loggedIn () {
		return this.storage.get('usertoken') ? true : false;
	},
	fullName () {
		let ln = (this.lastName 	!= null ? 		this.lastName + ' ' : '');
		let fn = (this.firstName 	!= null ? 		this.firstName 	 	: '');
		let pn = (this.patronymic 	!= null ? ' ' + this.patronymic 	: '');
		return ln + fn + pn;
	},
	token : { 
		get () {
			return this.storage.get('usertoken');
		},
		set (newValue) {
			return this.storage.set('usertoken', newValue);
		}
	},
	storage: {
		get (key) {
			if (typeof(Storage) != undefined) {
				return sessionStorage.getItem(key);
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
				sessionStorage.setItem(key, value);
				return sessionStorage.getItem(key);
			}
			else {
				let cookie = sName + '=' + value;
				document.cookie = cookie;
				return cookie;
			}
		},
		clear () {
			if (typeof(Storage) != undefined)
				sessionStorage.clear();
			else
				document.cookie = '';
		}
	},
	menuElements () {
		let elements = [
			{
				name : 'statistics',
				event: ''
			}, {
				name : 'settings',
				event: ''
			}
		];
		if (this.role == 'moderator' || this.role == 'student')
			elements.push({ name:'innopoints', event:''});

		return elements;
	}
};

module.exports = userModel;