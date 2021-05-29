const Character = require('../models/animal');

//click search button
exports.searchList = function(req, res){
    var user = req.session.user;
    var noMatch = null;
    if(req.query.search){
        const reg = new RegExp(req.query.search, 'i');
        //name: req.query.search, breed: req.query.search,location: req.query.search
        //only find not adopted animals
        Character.find({
            $or: [
                {name: {$regex: reg}},
                {breed: {$regex: reg}},
                {location: {$regex: reg}}]}, 'name breed location img adopted', function (err, characters) {
            if(err){
                return res.send(500, err);
            }
            if(characters.length < 1){
                noMatch = "No animals match that query, please try again";
            }
            console.log(characters);
            res.render('main', {
                title: "Here all all the available characters",
                data: characters,
                username: "",
                noMatch: noMatch,
                user: user
            })
        })
    }else{
        Character.find({},'name breed location adopted img',function (err, characters) {
                if(err){
                    return res.send(500, err);
                }
                res.render('main', {
                    title: "Here all all the available characters",
                    data: characters,
                    noMatch: noMatch,
                    user: user
                })
            }
        )
    }
};

//click check box and search under conditions
exports.filterList = function(req, res){
    var user = req.session.user;
    var noMatch = null;
    var userData = req.query;
    var search = userData.search;
    const reg = new RegExp(search, 'i');
    delete userData.search;
    Character.find(Object.keys(userData).length === 0 && !search ? {} : (!search ? userData: {
        $and:[{$or: [
                {name: {$regex: reg}},
                {breed: {$regex: reg}},
                {location: {$regex: reg}}]}
                ,userData]
        }),'name breed location adopted img',function (err, characters) {
            if(err){
                return res.send(500, err);
            }
            if(characters.length < 1){
                noMatch = "No animals match that query, please try again";
            }
            console.log(characters);
            res.render('public/main', {
                title: "Here all all the available characters",
                data: characters,
                noMatch: noMatch,
                user: user
            })
        }
    )
};