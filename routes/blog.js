var express = require("express"),
    router  = express.Router(),
	Blog    = require("../models/blog")

// Middleware

function isLoggedIn(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect("/login");
}
	
// go to blogIndex page
router.get("/", function(req, res){
	// Get all blogs from db
	Blog.find({}, function(err, allBlogs){
		if(err){
			console.log(err);
		} else {
			res.render("blogDirectory/blog", {blogs: allBlogs, currentUser: req.user})
		}
	});
});

// go to new blog form page
router.get("/new", function(req, res){
	res.render("blogDirectory/new");
});

// add new form into database and post it to blogIndex page
router.post("/", function(req, res){
	// get data from form and add it to blog array
	var title       = req.body.title
	var subtitle    = req.body.subtitle
	var image       = req.body.image
	var abstract    = req.body.abstract
	var blogContent = req.body.blogContent
	var newBlog     = {title: title, subtitle: subtitle, image: image, abstract: abstract, blogContent: blogContent}
	// create new blog and save to db
	Blog.create(newBlog, function(err, newlyCreatedBlog){
		if(err){
			console.log(err);
		} else {
			// redirect back to blogindex page
	       	res.redirect("/blogIndex")
		}
	});
});

// find id of blog and show more information on it
router.get("/:id", function(req, res){
	// find blog with given id
	Blog.findById(req.params.id, function(err, foundBlog){
		if(err){
			console.log(err)
		} else{
				// render a page with that blogs info
			res.render("blogDirectory/show", {blog: foundBlog})
		}
	});
});

// find blog by id and redirect to edit page of specific id
router.get("/:id/edit", function(req, res){
	Blog.findById(req.params.id, function(err, foundBlog){
		if(err){
			res.redirect("/blogIndex");
		} else {
			res.render("blogDirectory/edit", {blog: foundBlog});
		}
	});
});

// add edited/updated data to database and show on front end
router.put("/:id", function(req, res){
	Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog){
		if(err){
			res.redirect("/blogIndex");
		} else {
			res.redirect("/blogIndex/" + req.params.id);
		}
	});
});

// find blog by id and remove from database
router.delete("/:id", function(req, res){
	Blog.findByIdAndRemove(req.params.id, function(err){
		if(err){
			res.redirect("/blogIndex");
		} else {
			res.redirect("/blogIndex");
		}
	});
});

module.exports = router
	