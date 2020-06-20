var express   = require("express"),
	router    = express.Router(),
	Resource  = require("../models/resources")

router.get("/", function(req, res){
	Resource.find({}, function(err, allResources){
		if(err){
			console.log(err);
		} else{
			res.render("resourceDirectory/resources", {resources: allResources.reverse(), currentUser: req.user});
		}
	});
});

router.get("/new", function(req, res){
	res.render("resourceDirectory/new")
});

router.post("/", function(req, res){
	var title        = req.body.title
	var subtitle     = req.body.subtitle
	var link         = req.body.link
	var image        = req.body.image
	var author       = req.body.author
	var newResource  = {title: title, subtitle: subtitle, link: link, image: image, author: author}
	
	Resource.create(newResource, function(err, newlyCreatedResource){
		if(err){
			console.log(err);
		} else{
			res.redirect("resourceIndex");
		}
	});
});


router.delete("/:id", function(req, res){
	Resource.findByIdAndRemove(req.params.id, function(err){
		if(err){
			res.redirect("/")
		} else{
			res.redirect("/resourceIndex")
		}
	});
});

module.exports = router;