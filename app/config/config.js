module.exports = {
	DB_HOST:"192.168.1.97",
	DB_PORT: "30152",
	DB_NAME: "252f3a87cea94",
	DB_USERNAME: "4977b54bb7584",
	DB_PASSWORD: "2833ddb78e134",
	SESSION_KEY:"warehouse",
	SESSION_TABLE:"admin_sessions",

	getConnectionUri:function(){
		var protocol = "mongodb://";
		var account = this.DB_USERNAME != "" ? this.DB_USERNAME + ":" + this.DB_PASSWORD + "@" : "";
		var port = this.DB_PORT === "27017" ? "" : ":" + this.DB_PORT;
		return (protocol + account + this.DB_HOST + port + "/" + this.DB_NAME);
	}
	
}