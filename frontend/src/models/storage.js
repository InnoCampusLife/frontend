module.exports = {
	get : function (key) {
		return localStorage.getItem(key);
	},

	set : function (key, value) {
		if (value) localStorage.setItem(key, value);
		return localStorage.getItem(key);
	},

	clear : function () { localStorage.clear(); }
}