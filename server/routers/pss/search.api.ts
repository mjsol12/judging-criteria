
import * as express from 'express';
import {executeController} from '../../utilities/Global';
import {ServerRoutes} from '../../../src/app/shared/api/server-routes';
import {SearchService} from '../../services/pss/Search.service';

const router = express.Router();
// preliminary
router.get(`${ServerRoutes.PRELIMINARY}`, executeController(async (req, res) => {
    const userId = req.query.id;
    const results = await SearchService.findScoreModule(userId);
    res.status(200).send(results);
}));
// preliminary
router.post(`${ServerRoutes.PRELIMINARY}`, executeController(async (req, res) => {
    const userId = req.query.id;
    const results = await SearchService.saveScores(req.body, userId);
    res.status(200).send(results);
}));

module.exports = router;
