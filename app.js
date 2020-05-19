var express          = require("express"),
	app              = express(),
    mongoose         = require("mongoose"),
	bodyParser       = require("body-parser"),
	Blog             = require("./models/blog"),
	methodOverride   = require("method-override"),
    blogRoutes       = require("./routes/blog"),
	videoRoutes      = require("./routes/video"),
	upload           = require("express-fileupload")
	

mongoose.set('useUnifiedTopology', true);
mongoose.set('useFindAndModify', false);
mongoose.connect("mongodb://localhost/jared_web", { useNewUrlParser: true });
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(upload());


// Landing Page
app.get("/", function(req, res){
	res.render("landing");
});

// routes are set and app is now told to use those routes with universal start code
app.use("/blogIndex", blogRoutes);
app.use("/videoIndex", videoRoutes);




app.listen("3000", function(){
	console.log("Server is running");
});