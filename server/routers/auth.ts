import * as express from 'express';
import {InvalidRequestError, UnauthorizedError} from '../utilities/Errors';
import {executeController} from '../utilities/Global';
import AccountService from '../services/AccountService';
import {ServerRoutes} from '../../src/app/shared/api/server-routes';

const router = express.Router();


module.exports = (passport) => {

  router.post('/login', passport.authenticate('local'), function (req, res) {
    res.json(req.user);
  });

  // handle logout
  router.get('/logout', function (req, res) {
    req.logOut();
    res.status(200).send({loggedOut: true});
  });

  // loggedin
  router.get(`${ServerRoutes.LOGGED_IN}`, executeController(async (req, res) => {
    if (req.isAuthenticated()) {
      if (req.user.isGradingSheetAccessAccount === true) {
        res.status(200).send(req.user);
        return;
      }
      const mostRecentAccountObj = await AccountService.getAccountById(req.user.documentId);
      res.status(200).send(mostRecentAccountObj);
    } else {
      throw new UnauthorizedError();
    }
  }));

  // signup
  router.post('/signup', executeController(async (req, res) => {
    await AccountService.register(req.body, req);
    res.status(200).send({registered: true});
  }));


  return router;

};
