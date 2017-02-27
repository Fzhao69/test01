module.exports = {
	DB_HOST:"192.168.1.97",
	DB_PORT: "30153",
	DB_NAME: "b691557c42f84",
	DB_USERNAME: "408e9fb358544",
	DB_PASSWORD: "c1ffe83925094",
	SESSION_KEY:"warehouse_",
	SESSION_TABLE:"admin_sessions",

	getConnectionUri:function(){
		var protocol = "mongodb://";
		var account = this.DB_USERNAME != "" ? this.DB_USERNAME + ":" + this.DB_PASSWORD  + "@" : "";
		var port = this.DB_PORT === "27017" ? "" : ":" + this.DB_PORT;
		return (protocol + account + this.DB_HOST + port + "/" + this.DB_NAME);
	}
}