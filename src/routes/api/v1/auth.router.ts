import express, {Router, Request} from 'express';
import passport from 'passport';
import {Profile} from 'passport-apple';

interface IRequest extends Request {
  profile?: Profile;
}

const router: Router = express.Router();

// GET /api/v1/auth/signin
router.get('/signin', passport.authenticate('apple'));

// POST /api/v1/auth/callback
router.post('/callback', (req: IRequest, res, next) => {
  passport.authenticate('apple', (err, profile: Profile) => {
    req.profile = profile;
    console.log(profile);
    next();
  })(req, res, next);
  return res.json(req.profile);
});

export default router;
