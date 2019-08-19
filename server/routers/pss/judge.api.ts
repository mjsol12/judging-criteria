
import * as express from 'express';
import {executeController} from '../../utilities/Global';
import {ServerRoutes} from '../../../src/app/shared/api/server-routes';
import {JudgeService} from '../../services/pss/Judge.service';

const router = express.Router();

router.get(ServerRoutes.JUDGE, executeController(async (req, res) => {
    const results = await JudgeService.findJudge(req.body.userId);
    res.status(200).send(results);
}));

router.post(ServerRoutes.JUDGE, executeController(async (req, res) => {

    await JudgeService.saveCandidateData(req.body, 'a1sd252323s-32423s3f-23k543l2 ');
    res.status(200).send({msg: 'ok'});
}));

router.post(ServerRoutes.JUDGE, executeController(async (req, res) => {

    await JudgeService.saveCandidateData(req.body, 'a1sd252323s-32423s3f-23k543l2 ');
    res.status(200).send({msg: 'ok'});
}));

module.exports = router;
