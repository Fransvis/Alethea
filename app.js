var express      = require("express"),
	app          = express(),
    mongoose     = require("mongoose"),
	bodyParser   = require("body-parser"),
	Blog         = require("./models/blog")
	

mongoose.set('useUnifiedTopology', true);
mongoose.connect("mongodb://localhost/jared_web", { useNewUrlParser: true });
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));


// Blog.create(
// 	{
// 		name: "Sovereignty of God", 
// 		image:"https://images.unsplash.com/photo-1579847911934-1bdedcdba11b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
// 	}, function(err, blog){
// 		if(err){
// 			console.log(err);
// 		} else {
// 			console.log("Newly created Blog")
// 			console.log(blog)
// 		}
// 	})


app.get("/", function(req, res){
	res.render("landing");
});


app.get("/blogIndex", function(req, res){
	// Get all blogs from db
	Blog.find({}, function(err, allBlogs){
		if(err){
			console.log(err);
		} else {
			res.render("blogDirectory/blog", {blogs: allBlogs})
		}
	});
});

app.get("/blogIndex/new", function(req, res){
	res.render("blogDirectory/new");
});

app.post("/blogIndex", function(req, res){
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

app.get("/blogIndex/:id", function(req, res){
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




app.listen("3000", function(){
	console.log("Server is running");
});