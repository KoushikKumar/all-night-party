const passportService = require("./services/passport");
const passport = require("passport");
const YelpController = require("./controllers/yelp_controller");
const TwitterController = require("./controllers/twitter_controller");
const UserController = require("./controllers/user_controller");

module.exports = function(app) {
    app.get('/',function(req,res){
       res.end("Server started successfully :)");
    });
    
    //Yelp
    app.get('/search/:location', YelpController.search);
    
    //User
    app.post('/hotel/changeCount', passport.authenticate('twitter-token',{session:false}), UserController.changeCount);
    
    //twitter handlers
    app.get('/generate-token',TwitterController.generateToken);
    app.get('/get-access-token-callback', TwitterController.getAccessTokenCallback);
    app.get('/get-oauth-token', TwitterController.getOAuthToken);
    app.post('/test-authorization', passport.authenticate('twitter-token',{session:false}), TwitterController.testAuthorization);
};