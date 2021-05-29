const Adopter = require('../models/animalAdopt');
const Character = require('../models/animal');

exports.add = function (req, res) {
    var user = req.session.user;
    if(!user){
        return res.status(200).json({
            error_code: 1,
            message: "Sorry, you need to login first"
        })
    }
    let userData = req.body;
    if (userData == null) {
        res.status(403).send('No data sent!')
    }
    try {
        let adopter = new Adopter({
            name: userData.name,
            phone: userData.phone,
            email: userData.email,
            method: true,
            address: userData.address,
            animalId: userData.animalId,
            userId: user._id
        });
        console.log('received: ' + adopter);
        adopter.save(function (err, results) {
            if (err)
                res.status(500).send('Invalid data!');

            //change the status of the adopted to the true
            //firstly, find the animal by id
            Character.findOneAndUpdate({_id: userData.animalId},{adopted: true},function(err, doc){
                if(err){
                    return res.status(200).json({
                        error_code: 1,
                        message: 'server error'
                    })
                }else{
                    return res.status(200).json({
                        error_code: 0,
                        message: "adopt successful"
                    })
                }
            });
        });
    } catch (e) {
        res.status(500).send('error ' + e);
    }
};

exports.list = function (req, res) {
    Adopter.find({}, 'name phone email method address', function (err, adopters) {
        if (err) {
            return res.send(500, err);
        }
        res.render('adoptList', {
            title: "Here all all the available characters",
            data: adopters
        });
    });
};


exports.delete = function (req, res) {
    var userData = req.body;
    Adopter.findOne({_id: userData[1]}, 'name phone email address', function (err, adopterFound) {
        if (err) {
            return res.send(500, err);
        }
        else{
            Adopter.deleteOne({_id: userData[1]}, function (err, adopterDeleted) {
                if (err) {
                    return res.send(500, err);
                }
                else{
                    res.setHeader('Content-Type', 'application/json');
                    res.send(JSON.stringify(adopterFound));
                }
            });
        }
    });
};
