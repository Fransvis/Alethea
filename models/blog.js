var mongoose = require("mongoose");

var blogSchema = new mongoose.Schema({
name: String,
intro: String,
created: {type: Date, default: Date.now},
image: String,
blogContent: String,
author: {
      id: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User"
      },
      username: String
   }
});

module.exports = mongoose.model("blog", blogSchema); 