var mongoose = require("mongoose");

var resourceSchema = new mongoose.Schema({
	title: String,
	link: String,
	image: String,
	owner: String
});

module.exports = mongoose.model("resource", resourceSchema);