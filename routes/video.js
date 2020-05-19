var express = require("express"),
    router  = express.Router(),
	Video   = require("../models/video"),
	Upload  = require("express-fileupload")

router.get("/", function(req, res){
	res.render("videoDirectory/video")
});

// router.get("/new", function(req, res){
// 	res.sendFile(__dirname + "/new");
// });

// router.post("/new", function(req, res){
// 	if(req.files)
// 	console.log(req.files);
// });


module.exports = router;