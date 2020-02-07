const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require('mongoose');
const keys = require("../config/keys");

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
  done(null, user.id);
})

passport.deserializeUser( (id, done) => {
  User.findById(id)
    .then( user => {
      done(null, user);
    })
})

passport.use(
    new GoogleStrategy(
      {
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        callbackURL: "/auth/google/callback",
      }, (accessToken, refreshToken, profile, done) => {
        console.log("accessToken : ",accessToken);
        console.log("refreshToken : ", refreshToken);
        console.log("profile : ", profile);
        User.findOne({googleId: profile.id})
          .then( (existingUser) => {
            if(existingUser){
                // we aleady have a record with the given profile ID
                console.log('User already exists');
                done(null, existingUser);
            } else {
              // we don't have a record with this ID, make a new record 
              new User({ googleId: profile.id })
                .save()
                .then( user => {
                  done(null, user);
                })
            }
          })
      }
    )
  );
  