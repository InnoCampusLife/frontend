export default {
	server: {
		ip: 'campuslife.innopolis.ru/innopoints',
		get apiURL() {
			return `https://${this.ip}/api/`
		},
	},
	tokenName: 'usertoken',
}
