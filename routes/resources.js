var express   = require("express"),
	router    = express.Router(),
	Resource  = require("../models/resources")

router.get("/", function(req, res){
	Resource.find({}, function(err, allResources){
		if(err){
			console.log(err);
		} else{
			res.render("resourceDirectory/resources", {resources: allResources});
		}
	});
});

router.get("/new", function(req, res){
	res.render("resourceDirectory/new")
});

router.post("/", function(req, res){
	var title        = req.body.title
	var link         = req.body.link
	var image        = req.body.image
	var owner        = req.body.owner
	var newResource  = {title: title, link: link, image: image, owner: owner}
	
	Resource.create(newResource, function(err, newlyCreatedResource){
		if(err){
			console.log(err);
		} else{
			res.redirect("resourceIndex");
		}
	});
});


module.exports = router;