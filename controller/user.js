const User = require('../models/user');

exports.register = function (req, res) {
    //get the data in the body
    let userData = req.body;
    User.findOne({
       username: userData.username
    }, function (err, data) {
        if(err){
            return res.status(500).json({
                success: false,
                message: 'server error'
            })
        }
        if(data){
            //if data exist
            return res.status(200).json({
                error_code: 1,
                message: 'username has already exists'
            })
        }
        try {
            let user = new User({
                username: userData.username,
                password: userData.password,
            });
            user.save(function (err, results) {
                if (err) {
                    return res.status(500).json({
                        error_code : 500,
                        message: 'Internal error'
                    })
                }
                //if register successful, then record login status by using Session
                req.session.user = user;
                res.status(200).json({
                    error_code : 0,
                    message: 'OK'
                })
            });
        } catch (e) {
            return res.status(500).json({
                error_code : 500,
                message: 'Internal error' + e
            })
        }
    });
};

exports.login = function (req, res) {
    let userData = req.body;
    if (userData == null) {
        res.status(403).send('No data sent!')
    }
    User.findOne({username: userData.username, password: userData.password},function (err, user) {
            if(err){
                return res.status(500).json({
                    error_code: 500,
                    message: err.message
                })
            }
            if(!user){
                return res.status(200).json({
                    error_code: 1,
                    message: 'username or password is invalid.'
                })
            }
            console.log(user);
            // if user exist, then login successful. using session recording status
            req.session.user = user;
            res.status(200).json({
                error_code: 0,
            });
        }
    )
};
