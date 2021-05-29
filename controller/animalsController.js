const Character = require('../models/animal');
const AnimalAdopt = require('../models/animalAdopt');
const Comment = require('../models/comments');

//add new animals
exports.add = function (req, res) {
    let userData = req.body;
    console.log(req);
    console.log(req.file.path);
    if (userData == null) {
        res.status(403).send('No data sent!')
    }
    try {
        let character = new Character({
            name: userData.name,
            breed: userData.breed,
            location: userData.location,
            img: "uploads/" + req.file.filename
        });
        console.log('received: ' + character);

        character.save(function (err, results) {
            console.log(results._id);
            if (err)
                res.status(500).send('Invalid data!');

            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify(character));
        });
    } catch (e) {
        res.status(500).send('error ' + e);
    }
};

//find animal by id
exports.findAnimalById = function(req, res){
    var user = req.session.user;
    Character.findOne({_id: req.query.id}, function (err, animal) {
        if(err){
            return res.status(500).json({
                success: false,
                message: 'server error'
            })
        }
        console.log(animal);
        Comment.find({animalId: req.query.id}, function (err, comments) {
            if(err){
                return res.status(500).json({
                    success: false,
                    message: 'server error'
                })
            }
            console.log(comments);
            res.render('animal', {
                name: animal.name,
                town: animal.location,
                breed:animal.breed,
                picture:animal.img,
                user: user
            })
        });
    })
};

//The whole animals list
exports.list = function (sreq, res) {
    Character.find({}, 'name breed location adopted', function (err, characters) {
        if (err) {
            return res.send(500, err);
        }
        res.render('list', {
            title: "Here all all the available characters",
            data: characters
        });
    });
};

//adopted animals list
exports.adoptedList = function (req, res) {
    var user = req.session.user;
    var noMatch = null;
    AnimalAdopt.find({userId: user._id},'animalId', function (err, adoptedAnimals) {
        if (err) {
            return res.send(500, err);
        }
        console.log(adoptedAnimals);
        var adoptedAnimalList = [];
        for(var i = 0; i < adoptedAnimals.length; i++){
            adoptedAnimalList.push(adoptedAnimals[i].animalId);
        }
        console.log(adoptedAnimalList);
        Character.find({_id: adoptedAnimalList},'name breed location adopted img',function (err, characters) {
                if(err){
                    return res.send(500, err);
                }
                console.log("this is the animals that has adopted");
                console.log(characters);
                if(characters.length < 1){
                    noMatch = "No animals match that query, please try again";
                }
                res.render('adoptList', {
                    title: "Here all all the available characters",
                    user: user,
                    data: characters,
                    noMatch: noMatch
                })
            }
        );
    });
};


exports.delete = function (req, res) {
    var userData = req.body;
    Character.findOne({_id: userData[1]}, 'name breed location', function (err, characterFound) {
        if (err) {
            return res.send(500, err);
        }
        else{
            Character.deleteOne({_id: userData[1]}, function (err, characterDeleted) {
                if (err) {
                    return res.send(500, err);
                }
                else{
                    res.setHeader('Content-Type', 'application/json');
                    res.send(JSON.stringify(characterFound));
                }
            });
        }
    });
};
