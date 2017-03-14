export default {
	server: {
		ip: 'uis.university.innopolis.ru',
		port: 8770,
		get apiURL() {
			return `http://${this.ip}:${this.port || 21}/api/`
		},
	},
	tokenName: 'usertoken',
}
