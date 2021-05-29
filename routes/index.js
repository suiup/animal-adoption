var express = require('express');
var router = express.Router();
var bodyParser= require("body-parser");
var character = require('../controller/animalsController');
var adoptAnimal = require('../controller/adoptController');
var user = require('../controller/user');
var filter = require('../controller/filter');
var comments = require('../controller/comments');
var multer = require('multer');

// storage defines the storage options to be used for file upload with multer
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/');
    },
    filename: function (req, file, cb) {
        var original = file.originalname;
        var file_extension = original.split(".");
// Make the file name the date + the file extension
        filename = Date.now() + '.' + file_extension[file_extension.length-1];
        cb(null, filename);
    }
});
var upload = multer({ storage: storage });

router.get('/addForAdoption', function(req, res, next) {
    res.render('addForAdoption',{user: req.session.user ==  undefined?null : req.session.user});
});


router.get('/adoptAnimal',function(req,res){
    res.render('adoptAnimal',{user: req.session.user == undefined ? null : req.session.user, image: req.query.img, name: req.query.name});
});

router.post('/adoptAnimal', function (req, res, next) {
    adoptAnimal.add(req, res);
});

router.get('/database', function (req, res, next) {
    res.render('database',{name: 'database'})
});

router.get('/adoptedList', function (req, res) {
    character.adoptedList(req, res);
});

router.get('/animal', function (req, res, next) {
    console.log(req);
    character.findAnimalById(req, res);
});

router.get('/about', function (req, res, next) {
    res.render('about',{user: req.session.user == undefined ? null : req.session.user})
});

router.get('/',function (req, res, next) {
    filter.searchList(req, res);
});

router.get('/search', function (req, res, next) {
    filter.searchList(req, res);
});

router.get('/filter', function (req, res, next) {
    filter.filterList(req, res);
});

router.post('/delete', function (req, res) {
    character.delete(req, res)
});

router.post('/add', upload.single('myImg'), function(req, res) {
    character.add(req,res);
});

router.post('/comment', function (req, res) {
    comments.save(req, res);
});

router.get('/comment', function (req, res) {
    comments.commentList(req, res);
});

router.post('/register', function (req, res) {
    user.register(req, res);
});

router.post('/login',function (req, res) {
    req.session.user = user;
    user.login(req, res);
});

router.get('/logout', function (req, res) {
    req.session.user = null;
    res.redirect('/');
});

router.get('/thanks', function (req, res) {
    res.render('thanks',{user: req.session.user ==  undefined?null : req.session.user});
});


module.exports = router;