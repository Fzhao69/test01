module.exports ={
	DB_HOST:"192.168.1.97",
	DB_PORT: "`30139`",
	DB_NAME: "a9ecb1d6d9664",
	DB_USERNAME: "1104a761af3b4",
	DB_PASSWORD: "ee83f95bbe524",
	SESSION_KEY:"warehouse",
	SESSION_TABLE:"admin_sessions",

	getConnectionUri:function(){
		var protocol = "mongodb://";
		var account = this.DB_USERNAME != "" ? this.DB_USERNAME + ":" + this.DB_PASSWORD  + "@" : "";
		var port = this.DB_PORT === "27017" ? "": ":" + this.DB_PORT ;
		return (protocol + account + this.DB_HOST + port + "/" + this.DB_NAME);
	}
}