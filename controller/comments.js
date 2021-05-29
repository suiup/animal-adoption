const Comments = require('../models/comments');
const User = require('../models/user');

//save new comments
exports.save = function (req, res) {
    var user = req.session.user;
    let userData = req.body;
    console.log(req);
    if (userData == null) {
        res.status(403).send('No data sent!')
    }
    if (user == null) {
        res.status(403).send('Sorry, you need to login first')
    }

    User.findOne({_id: user._id},function (err, userDatabase) {
            if(err){
                return res.status(500).json({
                    error_code: 500,
                    message: err.message
                })
            }
        try {
            let comments = new Comments({
                userId: user._id,
                animalId: userData.animalId,
                userName: userDatabase.username,
                img: /*"uploads/" + req.file.filename,*/"",
                comments: userData.comment,
            });
            console.log('received: ' + comments);
            comments.save(function (err, results) {
                console.log(results._id);
                if (err)
                    res.status(500).send('Invalid data!');
                res.setHeader('Content-Type', 'application/json');
                res.send(JSON.stringify(comments));
            });
        } catch (e) {
            res.status(500).send('error ' + e);
        }


        }
    );




};


//commentList
exports.commentList = function(req, res){
    var noMatch = null;
    var userData = req.query;
    console.log(userData);

   /* Comments.find({animalId: userData.id},function (err, characters) {
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
    );*/
};