var express          = require("express"),
	app              = express(),
    mongoose         = require("mongoose"),
	bodyParser       = require("body-parser"),
	Blog             = require("./models/blog"),
	methodOverride   = require("method-override"),
    blogRoutes       = require("./routes/blog"),
	// videoRoutes      = require("./routes/video"),
 	path             = require("path"),
	crypto           = require("crypto"),
	multer           = require("multer"),
	GridFsStorage    = require("multer-gridfs-storage"),
	Grid             = require("gridfs-stream")

	

mongoose.set('useUnifiedTopology', true);
mongoose.set('useFindAndModify', false);
mongoose.connect("mongodb://localhost/jared_web", { useNewUrlParser: true });
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));

// Create Mongo connection
var conn = mongoose.connection

// Init gfs
let gfs;

conn.once('open', function () {
	// Init Stream
  var gfs = Grid(conn.db, mongoose.mongo);
	gfs.collection("uploads");

  // all set!
});

// Create Storage engine
var storage = new GridFsStorage({
  url: "mongodb://localhost/jared_web",
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString('hex') + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: 'uploads'
        };
        resolve(fileInfo);
      });
    });
  }
});
const upload = multer({ storage });


// Landing Page
app.get("/", function(req, res){
	res.render("landing");
});

// Vidroutestes
app.get("/videoIndex", function(req, res){
	res.render("videoDirectory/video")
});

app.get("/videoIndex/new", function(req, res){
	res.render("videoDirectory/new");
});

app.post("/videoIndex", upload.single("file"), function(req, res){
	res.redirect("/videoIndex")
});


// routes are set and app is now told to use those routes with universal start code
app.use("/blogIndex", blogRoutes);
// app.use("/videoIndex", videoRoutes);




app.listen("3000", function(){
	console.log("Server is running");
});