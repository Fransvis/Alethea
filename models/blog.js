var mongoose = require("mongoose");

var blogSchema = new mongoose.Schema({
title: String,
subtitle: String,
abstract: String,
image: String,
blogContent: String,
topic: String,
author: {
      id: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User"
      },
      username: String
   }
});

module.exports = mongoose.model("blog", blogSchema); 