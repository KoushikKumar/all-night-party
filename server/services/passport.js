const passport = require("passport");
const TwitterTokenStrategy = require('passport-twitter-token');

const authenticateUser = new TwitterTokenStrategy(getTwitterOptions(), function(token, tokenSecret, profile, done) {
        if(profile) {
           done(null, profile);
        } else {
           done(null, false);
        }
});

function getTwitterOptions() {
    return {
        consumerKey: 'BaHsxCPOU2zjwJO5FT1jtVO6X',
        consumerSecret: 'bMse9oi7IBiuxTuIvBISHMI2MK2ZYl4a05vemL1zFct4xy0b1A'
    };
}

passport.use(authenticateUser);