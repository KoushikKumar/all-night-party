const Yelp = require('yelp');
const User = require("../models/user");
const dotenv= require('dotenv');

dotenv.load();

exports.search = function(req,res,next) {
    const yelp = new Yelp({
      consumer_key: process.env.YELP_CONSUMER_KEY,
      consumer_secret: process.env.YELP_CONSUMER_SECRET,
      token: process.env.YELP_TOKEN,
      token_secret: process.env.YELP_TOKEN_SECRET,
    });
    const location = req.params.location;
    yelp.search({ term: 'food', location: location })
        .then(function (data) {
          const hotels = [];
          data.businesses.forEach((business) => {
            var hotel = {};
            hotel.name = business.name;
            hotel.id = business.id;
            hotel.url = business.url;
            if(business.snippet_text) {
              hotel.snippet_text = business.snippet_text;
            } else {
              hotel.snippet_text = "There are no customer reviews found!!";
            }
            
            User.find({},function(err, users) {
              if(err) {
                return next(err);
              }
              hotel.peopleInterested = [];
              users.forEach((user) => {
                if(user.hotelIds.indexOf(business.id) > -1){
                  hotel.peopleInterested.push(user.userId);
                }
              });
              hotel.noOfPeopleGoing = hotel.peopleInterested.length;
              hotels.push(hotel);
              if(hotels.length == data.businesses.length) {
                sendResponse(res, hotels);
              }
            });
          });
        })
        .catch(function (err) {
          console.error(err);
          res.json({"error":"Currently we don't support in this location"});
        });
    
};

function sendResponse(res, hotels) {
  res.json(hotels);
}
