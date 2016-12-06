export default {
	server: {
		ip : "uis.university.innopolis.ru",
		port : 8770,
		get api_url() { return "http://" + this.ip + ":" + (this.port || 21) + "/api/" } 
	},

	token_name: "usertoken"
}
