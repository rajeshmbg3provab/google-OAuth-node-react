// prod.js - projductions keys here !!!
// important by convention all the environment variable will be in the capital letters and underscore 
module.exports = {
    googleClientID : process.env.GOOGLE_CLIENT_ID,
    googleClientSecret : process.env.GOOGLE_CLIENT_SCERET,
    mongoURI: process.env.MONGO_URI,
    cookieKey: process.env.COOKIE_KEY,
}
