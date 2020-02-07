const express = require("express");
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');

require('./models/user');
require('./services/passport');

mongoose.connect(keys.mongoURI, { useUnifiedTopology:true, useNewUrlParser: true }, err => {
  if(err) 
    throw new Error('Unable to connect to mongodb');
});

const app = express();

// here we are enabling the cookie to access token
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);

//here we are essentially telling passport to use cookie to manage authentication 
app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("App is listening on PORT", PORT);
});


//middleware our small functions that can be used to modify incoming requests to our app before they are sent off to route handlers.
// production username :-  emailyProd 
// password:- 3kl9I9A5MJkdUj7Y
// mongodb+srv://emailyProd:<password>@cluster0-zia9y.mongodb.net/test?retryWrites=true&w=majority
// prod clientID - 315091753351-aeformh8a4koc4mciunvhpn42ius6opa.apps.googleusercontent.com
// prod client secret - dFbG3fSavV6ufOMTLe_S6XeC






/**
 * deployment in the heroku git
 *  git init
 *  git add .
 *  git commit -m "message"
 *  heroku -v
 *  heroku login
 *  heroku create
 *  git remote add heroku <heroku git link got after creating heroku project>
 *  git push heroku master
 *  heroku open
 *  heroku logs (for log to see)
 *  subsequent deployment
 *  git add .
 *  git commit -m "message"
 *  git push heroku master
 *  heroku open
 *  Strategy in the passport.js is a module that helps authenticate a very specific provider (like Google/Facebook/Twitter etc)
 * http://localhost:5000/auth/google/callback
 * https://console.developers.google.com
 * ClientID 943912397436-e0njk3sf98vuktilfdecieiajrpjinfq.apps.googleusercontent.com
 * ClientSecret kdwAwfv8aEJeS4fOFXU8vsUH
 * mongo connection string - mongodb+srv://rajeshmbg3:<password>@emaily-ewv5w.mongodb.net/test?retryWrites=true&w=majority
 * */

 