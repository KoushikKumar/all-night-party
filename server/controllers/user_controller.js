const User = require("../models/user");

exports.changeCount = function(req, res, next) {
    const userId = req.body.userId;
    const hotelId = req.body.hotelId;
    
    User.findOne({"userId":userId}, function(err, user){
        if(err) {
            return next(err);
        }
        if(user) {
            if(user.hotelIds.indexOf(hotelId) > -1) {
                user.hotelIds = user.hotelIds.filter((id) => {
                   return id!==hotelId; 
                });
            } else {
                user.hotelIds.push(hotelId);   
            }
            User.findOneAndUpdate({_id:user._id}, user, function(err, user){
                if(err) {
                    return next(err);
                }
                res.json({"status":"OK"});
            });
        } else {
            const receivedUser = {};
            receivedUser.userId = userId;
            receivedUser.hotelIds = [hotelId];
            
            const newUser = new User(receivedUser);
            newUser.save(function(err){
                if(err) {
                    return next(err);
                }
                res.json({"status":"OK"});
            });
        }
    });
};