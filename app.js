var express      = require("express"),
	app          = express(),
    mongoose     = require("mongoose"),
	bodyParser   = require("body-parser"),
	Blog         = require("./models/blog")

var blogRoutes   = require("./routes/blog")
	

mongoose.set('useUnifiedTopology', true);
mongoose.connect("mongodb://localhost/jared_web", { useNewUrlParser: true });
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));



app.get("/", function(req, res){
	res.render("landing");
});


app.use("/blogIndex", blogRoutes);



app.listen("3000", function(){
	console.log("Server is running");
});