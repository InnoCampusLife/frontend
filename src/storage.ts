const storage = {
	getItem (key: string) {
		return localStorage.getItem(key)
	},

	setItem (key: string, data: string) {
		localStorage.setItem(key, data)
	},

	clear() {
		localStorage.clear()
	},

	removeItem(key: string) {
		localStorage.removeItem(key)
	},
}

export default storage
