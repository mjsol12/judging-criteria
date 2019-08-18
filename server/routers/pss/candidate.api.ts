
import * as express from 'express';
import {executeController} from '../../utilities/Global';
import {ServerRoutes} from '../../../src/app/shared/api/server-routes';
import {RegisteredCandidateService} from '../../services/pss/RegisterCandidate.service';
import {insertDocuments} from '../../services/DocumentService';

const router = express.Router();

router.get(ServerRoutes.CANDIDATE, executeController(async (req, res) => {
    res.status(200).send({msg: 'ok'});
}));

router.post(ServerRoutes.CANDIDATE, executeController(async (req, res) => {
    // save every candidate,
    await RegisteredCandidateService.saveCandidateData(req.body, '1231230-123=1231230123Fcker');
    res.status(200).send({msg: 'ok'});
}));

module.exports = router;
