module.exports = {
	DB_HOST:"192.168.1.233",
	DB_PORT: "30066",
	DB_NAME: "7b94bfd838b44",
	DB_USERNAME: "09c791379bf54",
	DB_PASSWORD: "5224b31899d14",
	SESSION_KEY:"warehouse_",
	SESSION_TABLE:"admin_sessions",

	getConnectionUri:function(){
		var protocol = "mongodb://";
		var account = this.DB_USERNAME != "" ? this.DB_USERNAME + ":" + this.DB_PASSWORD  + "@" : "";
		var port = this.DB_PORT === "27017" ? "" : ":" + this.DB_PORT;
		return (protocol + account + this.DB_HOST + port + "/" + this.DB_NAME);
	}
}