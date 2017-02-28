module.exports = {
	DB_HOST:"127.0.0.1",
	DB_PORT: "27017",
	DB_NAME: "warehouse",
	DB_USERNAME: "",
	DB_PASSWORD: "",
	SESSION_KEY:"warehouse_",
	SESSION_TABLE:"admin_sessions",

	getConnectionUri:function(){
		var protocol = "mongodb://";
		var account = this.DB_USERNAME != "" ? this.DB_USERNAME + ":" + this.DB_PASSWORD  + "@" : "";
		var port = this.DB_PORT === "27017" ? "" : ":" + this.DB_PORT;
		return (protocol + account + this.DB_HOST + port + "/" + this.DB_NAME);
	}
}