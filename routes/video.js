var express = require("express"),
    router  = express.Router(),
	Video   = require("../models/video")

router.get("/", function(req, res){
	Video.find({}, function(err, allVideos){
		if(err){
			console.log(err);
		} else {
			res.render("videoDirectory/video", {videos: allVideos})
		}
	});
});

router.get("/new", function(req, res){
	res.render("videoDirectory/new");
});

router.post("/", function(req, res){
	var title = req.body.title
	var image = req.body.image
	var newVideo = {title: title, image: image}
	
	Video.create(newVideo, function(err, newlyCreatedVideo){
		if(err){
			console.log("/videoIndex");
		} else {
			res.redirect("/videoIndex")
		}
	})
});

router.get("/:id", function(req, res){
	Video.findById(req.params.id, function(err, foundVideo){
		if(err){
			console.log(err)
		} else{
			res.render("videoDirectory/show", {video: foundVideo})
		}
	});
});

router.get("/:id/edit", function(req, res){
	Video.findById(req.params.id, function(err, foundVideo){
		if(err){
			res.redirect(err);
		} else {
			res.render("videoDirectory/edit", {video: foundVideo});
		}
	});
});

module.exports = router;