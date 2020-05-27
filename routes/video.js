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
			res.render("videoDirectory/video", {videos: allVideos, currentUser: req.user})
		}
	});
});

router.get("/new", isLoggedIn, function(req, res){
	res.render("videoDirectory/new");
});

router.post("/", isLoggedIn,function(req, res){
		// get data from form and add it to video array
	var title = req.body.title
	var video = req.body.source
	var newVideo = {title: title, video: video}
	
	Video.create(newVideo, function(err, newlyCreatedVideo){
		if(err){
			console.log(err)
		} else{
			res.redirect("/videoIndex")
		}
	});
});




module.exports = router;