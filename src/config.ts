export default {
	server: {
		ip: 'campuslife.innopolis.ru',
		port: 7777,
		get apiURL() {
			return `http://${this.ip}:${this.port || 21}/api/`
		},
	},
	tokenName: 'usertoken',
}
