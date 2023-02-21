const passport = require('passport');
const GoogleStratergy = require('passport-google-oauth20');

passport.use(new GoogleStratergy({
  clientID: '604305499880-f1o43dv52k9f6hkgpmofnv1hda5s4jtc.apps.googleusercontent.com',
  clientSecret: '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',
  callbackURL: 'https://localhost:3009/authGoogle/callBack',
  passReqToCallback: true,
}, (accessToken, requestToken, profile, done) => done(profile)));
