var express          = require("express"),
	app              = express(),
    mongoose         = require("mongoose"),
	bodyParser       = require("body-parser"),
	methodOverride   = require("method-override"),
	passport         = require("passport"),
	LocalStrategy    = require("passport-local"),
    blogRoutes       = require("./routes/blog"),
	videoRoutes      = require("./routes/video"),
	resourceRoutes   = require("./routes/resources"),
	authRoutes       = require("./routes/auth"),
	User             = require("./models/user"),
	Blog             = require("./models/blog")

	

mongoose.set('useUnifiedTopology', true);
mongoose.set('useFindAndModify', false);
mongoose.connect("mongodb://localhost/jared_web", { useNewUrlParser: true });
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));

// Middleware
app.use(function(req, res, next){
	res.locals.currentUser = req.user;
	next();
});

// PASSPORT CONFIG/
app.use(require("express-session")({
	secret: "The truth will be revealed",
	resave: false,
	saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Create Mongo connection
var conn = mongoose.connection


function isLoggedIn(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect("/login");
}


// Landing Page
app.get("/", function(req, res){
	res.render("landing");
});

app.get("/about", function(req, res){
	res.render("about");
});

app.get("/blogIndex/ephesians", function(req, res){
	Blog.find({topic: "Ephesians"}, function(err, allBlogs){
		if(err){
			console.log(err);
		} else {
			res.render("blogDirectory/ephesians", {blogs: allBlogs})
		}
	});
});



// Set route usage and initial url
app.use("/blogIndex", blogRoutes);
app.use("/videoIndex", videoRoutes);
app.use("/resourceIndex", resourceRoutes);
app.use(authRoutes);




app.listen("3000", function(){
	console.log("Server is running");
});