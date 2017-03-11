
const twitterAPI = require('node-twitter-api');
const dotenv= require('dotenv');

var _requestSecret;
var _oauth_token;
var _oauth_token_secret;
var _user_id;

dotenv.load();

const twitter = new twitterAPI({
    consumerKey: process.env.TWITTER_CONSUMER_KEY,
    consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
    callback: process.env.TWITTER_CALLBACK
});


exports.generateToken = function(req,res,next) {
    twitter.getRequestToken(function(err, requestToken, requestSecret) {
        if (err){
            next(err);
        } else {
            _requestSecret = requestSecret;
            res.redirect(process.env.TWITTER_AUTHENTICATE_URI + requestToken);
        }
    });
};

exports.getAccessTokenCallback = function(req,res,next) {
    var requestToken = req.query.oauth_token,
        verifier = req.query.oauth_verifier;
    twitter.getAccessToken(requestToken, _requestSecret, verifier, function(err, accessToken, accessSecret) {
        if (err){
            next(err);
        } else {
            twitter.verifyCredentials(accessToken, accessSecret, function(err, user) {
                if (err){
                    next(err);
                } else {
                   _oauth_token = accessToken;
                   _oauth_token_secret = accessSecret;
                   _user_id = user.id;
                   res.sendFile(process.cwd()+'/close.html');
                }
            });
        }
    });
};

exports.getOAuthToken = function(req,res,next) {
    var timer = setInterval(function(){
       if(_oauth_token && _oauth_token_secret && _user_id) {
           clearInterval(timer);
           res.json({oauth_token:_oauth_token, oauth_token_secret:_oauth_token_secret, user_id: _user_id});
           _oauth_token = null;
           _oauth_token_secret = null;
           _user_id = null;
           res.end();
       }
   }, 100);
};

exports.testAuthorization = function(req,res,next) {
    res.json({is_authorized:true});
};

