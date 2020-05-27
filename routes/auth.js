var express     = require("express"),
    router      = express.Router(),
	User        = require("../models/user"),
	passport    = require("passport")

// Show login Form
router.get("/register", function(req, res){
	res.render("authDirectory/register");
});

// handle sign up logic
router.post("/register", function(req, res){
	// Sign new User up
	var newUser = new User({username: req.body.username});
	User.register(newUser, req.body.password, function(err, user){
		if(err){
			// if err redirect to form
			console.log(err);
			return res.render("authDirectory/register");
		}
		// Create new User
		passport.authenticate("local")(req, res, function(){
			res.redirect("/")
		});
	});
});

// Show Login form
router.get("/login", function(req, res){
	res.render("authDirectory/login");
});

// Assume User exists and log them in
// If they do not exist redirect to login form
router.post("/login", passport.authenticate("local", 
			{
	 			successRedirect: "/",
				failureRedirect: "/login"
			}),
			
			function(req, res){
	
});

// Logout Route

router.get("/logout", function(req, res){
	req.logout();
	res.redirect("/")
});



module.exports = router;