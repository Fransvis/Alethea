# Alethea 
* Alethea focuses on sharing biblical content with fellow Christians
* It is, in reality, the answer to the question: What resources would you prescribe as a theologian?

# # Technologies included
* Bootstrap 4.4.1
* Font-awesome
* nodejs v12.18.0 - be sure to install node.js on whichever system you are running (https://nodejs.org/en/download/)

# NPM Packages installed
* body-parser 1.19.0
* ejs 3.1.5
* express 4.17.1
* express-session 1.17.1
* git 0.1.5
* method-override 3.0.0
* mongodb 3.6.2
* mongoose 5.10.7
* multer 1.4.2
* passport 0.4.1
* passport-local 1.0.0
* passport-local-mongoose" 6.0.1


# Launch

* Be sure to install nodejs on your system(https://nodejs.org/en/download/)

1. Run command: `npm init` and set up your project (you can choose your own starting point. This project's starting point is declared as: app.js)

2. Require all packages and set app to use express for your routes

```javascript
var express          = require("express"),
app              = express(),
mongoose         = require("mongoose"),
bodyParser       = require("body-parser"),
methodOverride   = require("method-override"),
passport         = require("passport"),
LocalStrategy    = require("passport-local"),
```

3. Create a starting route (usually a simple landing page)

``` javascript
app.get("/", function(req, res){
	res.render("landing");
});
```

4. Create a database (local or cloud based) and connect to it
``` Javascript
mongoose.connect('mongodb://localhost:27017/<yourdatabasename>', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
```

5. Set up PORT address
```Javascript
app.listen(process.env.PORT || 5000, function(){
	console.log("Server is running");
});
```

6.  Run with command `node app.js` or with the starting point that you specified in your npm init setup


* Alternatively you can simply pull this entire project and run it in your terminal with the command:
 `node app.js` (remember to have nodejs installed on your system - https://nodejs.org/en/download/)