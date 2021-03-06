var express        = require("express"),
    router         = express.Router(),
		Video          = require("../models/video")

function isLoggedIn(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect("/login");
}


router.get("/", function(req, res){
	Video.find({}, function(err, allVideos){
		if(err){
			console.log(err);
		} else{
			res.render("videoDirectory/video", {videos: allVideos.reverse(), currentUser: req.user})
		}
	});
});

router.get("/new", function(req, res){
	res.render("videoDirectory/new");
});

router.post("/", function(req, res){
		// get data from form and add it to video array
	var title = req.body.title;
	var video = req.body.source;
	var newVideo = {title: title, source: video}
	
	Video.create(newVideo, function(err, newlyCreatedvideo){
		if(err){
			console.log(err)
		} else{
			res.redirect("/videoIndex")
		}
	});
});

router.delete("/:id", isLoggedIn, function(req, res){
	Video.findByIdAndRemove(req.params.id, function(err){
		if(err){
			res.redirect("/videoIndex")
		} else {
			res.redirect("/videoIndex")
		}
	});
});




module.exports = router;