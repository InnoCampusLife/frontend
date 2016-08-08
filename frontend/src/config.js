module.exports = {
	server : {
		ip : "85.143.215.101",
		port : "",
		get api_url() { return "http://" + this.ip + this.port + "/api/"; }
	}
};