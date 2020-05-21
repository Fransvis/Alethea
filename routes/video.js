var express        = require("express"),
    upload         = require("../app"),
    router         = express.Router()


router.get("/", function(req, res){
	res.render("videoDirectory/video")
});

router.get("/new", function(req, res){
	res.render("videoDirectory/new");
});

router.post("/", upload.single("file"), function(req, res){
	res.send({file: req.file})
});




module.exports = router;