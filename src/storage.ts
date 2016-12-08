export const storage = {
	get(key) {
		return localStorage.getItem(key);
	},

	set(key, value) {
		if (value) localStorage.setItem(key, value);
		return localStorage.getItem(key);
	},

	clear() { 
		localStorage.clear(); 
	},
}

export default storage;
