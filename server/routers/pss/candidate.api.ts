
import * as express from 'express';
import {executeController} from '../../utilities/Global';
import {ServerRoutes} from '../../../src/app/shared/api/server-routes';
import {RegisteredCandidateService} from '../../services/pss/Candidate.service';
import {insertDocuments} from '../../services/DocumentService';

const router = express.Router();

router.post(ServerRoutes.CANDIDATE, executeController(async (req, res) => {
    // save every candidate,
    await RegisteredCandidateService.savePreliminaryCandidate(req.body, '1231230-123=1231230123Fcker');
    res.status(200).send({msg: 'ok'});
}));
module.exports = router;
