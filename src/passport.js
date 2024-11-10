const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const db = require('./models/index');

// Set up Passport with Google Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
      scope: ["profile", "email"],
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await db.User.findOne({ where: { googleId: profile.id } });
        if (!user) {
          // If user doesn't exist, create a new record
          user = await db.User.create({
            email: profile.emails[0].value,
            googleId: profile.id,
            name: profile.displayName,
            profilePicture: profile.photos[0].value,
            authProvider: "google",
            role: 'user',
          });
        }

        done(null, user);
      } catch (error) {
        done(error, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await db.User.findOne({where: {id: id}});
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

