var mongoose = require("mongoose")

var videoSchema = new mongoose.Schema({
	title: String,
	image: String
});

module.exports = mongoose.model("videos", videoSchema)