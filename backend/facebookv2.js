const FacebookStrategy = require("passport-facebook").Strategy;
require("dotenv").config();

//__ Import the user model TO STORE THE DATA into DB __ //

// __  Get the data from ENV __ //
const facebookAppID = process.env.FACEBOOK_CLIENT_ID;
const facebookAppSecret = process.env.FACEBOOK_CLIENT_SECRET;
const facebookAppCallback = "http://localhost:5000/auth/facebook/callback";

const connectionDB = mysql.createConnection({
  host: process.env.host,
  user: process.env.user,
  password: process.env.password,
  database: process.env.database,
});

module.exports = (passport) => {
  passport.serializeUser(function (user, cb) {
    cb(null, user);
  });

  passport.deserializeUser(function (obj, cb) {
    cb(null, obj);
  });

  passport.use(
    new FacebookStrategy(
      {
        clientID: facebookAppID,
        clientSecret: facebookAppSecret,
        callbackURL: facebookAppCallback,
        profileFields: ["id", "displayName", "photos", "email"],
      },
      (accessToken, refreshToken, profile, done) => {
        console.log("refresh", refreshToken);

        createOrUpdateProfile(
          profile._json.id,
          profile._json.name,
          profile._json.email,
          profile._json.picture.url,
          accessToken,
          refreshToken
        )
          .then((user) => {
            return done(null, user);
          })
          .catch((err) => {
            return done(null, false, { message: "User alreardy exist" });
          });
      }
    )
  );
};

//__ Save the Data into DB __ //
async function createOrUpdateProfile(
  id,
  firstName,
  email,
  imageUrl,
  accessToken,
  refreshToken
) {
  return User.findOne({ profileId: id })
    .exec()
    .then(async (user) => {
      if (!user) {
        user = await new User({
          email,
          profileId: id,
          fileName: imageUrl,
          isEmailVerified: true,
          password: email + firstName,
          firstName: firstName || "NA",
        }).save();
      }
      user.socialAccessToken = accessToken;
      user.socialRefreshToken = refreshToken;

      return await user.save();
    })
    .catch((err) => {});
}
