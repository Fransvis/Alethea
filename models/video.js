var mongoose = require("mongoose")

var videoSchema = new mongoose.Schema({
	title: String,
	source: String
});

module.exports = mongoose.model("video", videoSchema)