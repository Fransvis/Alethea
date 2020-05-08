var express = require("express"),
    router  = express.Router(),
	Blog    = require("../models/blog")
	

router.get("/", function(req, res){
	// Get all blogs from db
	Blog.find({}, function(err, allBlogs){
		if(err){
			console.log(err);
		} else {
			res.render("blogDirectory/blog", {blogs: allBlogs})
		}
	});
});

router.get("/new", function(req, res){
	res.render("blogDirectory/new");
});

router.post("/", function(req, res){
	// get data from form and add it to blog array
	var name  = req.body.name
	var image = req.body.image
	var intro = req.body.intro
	var blogContent = req.body.blogContent
	var newBlog = {name: name, image: image, intro: intro, blogContent: blogContent}
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

module.exports = router