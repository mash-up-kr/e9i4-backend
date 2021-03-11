import passport from 'passport';
import AppleStrategy from 'passport-apple';
import path from 'path';

export function initPassport() {
  passport.serializeUser((user, cb) => {
    cb(null, JSON.stringify(user));
  });

  passport.deserializeUser((serialized: string, cb) => {
    cb(null, JSON.parse(serialized));
  });

  passport.use(
    new AppleStrategy(
      {
        clientID: 'kr.co.mashup.e9i4.Rrrr.authentication',
        teamID: 'CHL8Y83Z89',
        keyID: '2HZYGS7RSJ',
        callbackURL: `${
          process.env.ROOT_URL ?? 'http://localhost:3000'
        }/api/v1/auth/callback`,
        privateKeyLocation: path.join(__dirname, './config/AuthKey.p8'),
        passReqToCallback: true,
      },
      (req, accessToken, refreshToken, decodedIdToken, profile, cb) => {
        process.nextTick(() => cb(null, decodedIdToken));
      }
    )
  );
}
