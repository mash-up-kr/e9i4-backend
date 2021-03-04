import express, {Router} from 'express';
import passport from 'passport';

const router: Router = express.Router();

router.get('/signin', passport.authenticate('apple')); // GET /api/v1/auth/signin

router.post('/callback', (req, res, next) => {
  passport.authenticate('apple', (err, profile) => {
    // req.profile = profile;
    console.log(profile);
    next();
  })(req, res, next);
});

export default router;
