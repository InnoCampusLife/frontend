var Module = require('./module.js');

var config = {
	server : {
		ip : "85.143.215.11",
		port : 8770,
		get api_url() { return "http://" + this.ip + ":" + this.port + "/api/" } 
	},
	token_name: "usertoken",
	modules: {}
};


config.modules['uis'] = new Module('uis', ['ghost', 'student', 'moderator']);

module.exports = config;