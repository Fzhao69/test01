module.exports = {
	DB_HOST:"192.168.1.234",
	DB_PORT: "30067",
	DB_NAME: "57c5a817176a4",
	DB_USERNAME: "ee4e9d9080e64",
	DB_PASSWORD: "470d44c8917c4",
	SESSION_KEY:"warehouse_",
	SESSION_TABLE:"admin_sessions",

	getConnectionUri:function(){
		var protocol = "mongodb://";
		var account = this.DB_USERNAME != "" ? this.DB_USERNAME + ":" + this.DB_PASSWORD  + "@" : "";
		var port = this.DB_PORT === "27017" ? "" : ":" + this.DB_PORT;
		return (protocol + account + this.DB_HOST + port + "/" + this.DB_NAME);
	}
}