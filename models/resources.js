var mongoose = require("mongoose");

var resourceSchema = new mongoose.Schema({
	title: String,
	subtitle: String,
	link: String,
	image: String,
	author: String,
	auth: String
});

module.exports = mongoose.model("resource", resourceSchema);