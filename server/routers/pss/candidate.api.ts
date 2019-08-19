
import * as express from 'express';
import {executeController} from '../../utilities/Global';
import {ServerRoutes} from '../../../src/app/shared/api/server-routes';
import {RegisteredCandidateService} from '../../services/pss/Candidate.service';
import {insertDocuments} from '../../services/DocumentService';

const router = express.Router();

router.get(ServerRoutes.CANDIDATE, executeController(async (req, res) => {
    // save every candidate,
    const candidates = await RegisteredCandidateService.findCandidates();
    res.status(200).send(candidates);
}));
router.post(ServerRoutes.CANDIDATE, executeController(async (req, res) => {
    // save every candidate,
    await RegisteredCandidateService.saveCandidate(req.body, req.body.documentId);
    res.status(200).send({msg: 'ok'});
}));
module.exports = router;
