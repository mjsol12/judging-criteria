import * as DocumentService from '../DocumentService';
import {Score} from '../../../src/app/shared/model/pp/score.model';
import {InvalidRequestError} from '../../utilities/Errors';
import {Candidate} from '../../../src/app/shared/model/pageant-procedure/candidate.model';

export module SearchService {
    export async function findScoreModule(userId) {
        const filter = {
            'userId' : userId
        };
        // return the assigned judge data module
        return await DocumentService.findOne(Score, filter);
    }

    export async function saveScores(score: Score, userId): Promise<any> {
        if (score.userId !== userId) {
            throw new InvalidRequestError('userId does not much to document.userId');
        }
        // preliminary
        for (const contestant of score.contestants) {
            // preliminary
            const weightedQa = .50;
            const weightedPo = .30;
            let preliFinalScore = 0;
            let qAScore = contestant.PRE_QA_CONTENT + contestant.PRE_QA_CONCEPT + contestant.PRE_QA_IMPACT;
            qAScore = qAScore * weightedQa;

            let pOScore = contestant.PRE_PO_POISE + contestant.PRE_PO_CARRIAGE + contestant.PRE_PO_BEAUTY + contestant.PRE_PO_IMPACT;
            pOScore = pOScore * weightedPo;

            preliFinalScore = pOScore + qAScore + contestant.PRE_ATTENDANCE;

            contestant.PRELIMINARY_SCORE = preliFinalScore;

            // final round;
            // school uniform
            let sUniformScore = 0;
            sUniformScore = contestant.FR_SU_PERSONALITY + contestant.FR_SU_POISE + contestant.FR_SU_CARRIAGE;
            contestant.SCHOOLUNIFORM_SCORE = sUniformScore;
            // Sports Wear
            let sportWScore = 0;
            sportWScore = contestant.FR_SW_POISE + contestant.FR_SW_CARRIAGE + contestant.FR_SW_FIGURE + contestant.FR_SW_SPORTS_IDENTITY;
            contestant.SPORTSWARE_SCORE = sportWScore;
            //  Creative Costume
            let cCostumeScore = 0;
            cCostumeScore = contestant.FR_CC_CONCEPT + contestant.FR_CC_POISE + contestant.FR_CC_CARRIAGE + contestant.FR_CC_BEAUTY;
            contestant.CREATIVECOSTUME_SCORE = cCostumeScore;
            // final round score
            contestant.FINALROUND_SCORE = sUniformScore + sportWScore + cCostumeScore;

            // q and a final
            let finalQAscore = 0;
            finalQAscore = contestant.FINALQA_CONCEPT + contestant.FINALQA_CONTENT + contestant.FINALQA_IMPACT;
            contestant.QAFINAL_SCORE = finalQAscore;
        }

        // if found candidate do return invalid already have the candidate number
        return await DocumentService.updateDocument(score, null, userId);
    }

    export async function summaryScore(userId) {
        const scores = await DocumentService.find(Score, {});

        let summary = [];

        for (const score of scores) {

            const candidates = [];

            for (const candidate of score.contestants) {

                const finalScore = Object.create({});

                finalScore.CANDIDATE = candidate.CONTESTANT;

                if (score.userId === 'judge_1') {
                    finalScore.JUDGE1_PRELIMINARY_SCORE = candidate.PRELIMINARY_SCORE;
                    finalScore.JUDGE1_FINALROUND_SCORE = candidate.FINALROUND_SCORE;
                    finalScore.JUDGE1_QAFINAL_SCORE = candidate.QAFINAL_SCORE;
                }

                if (score.userId === 'judge_2') {
                    finalScore.JUDGE2_PRELIMINARY_SCORE = candidate.PRELIMINARY_SCORE;
                    finalScore.JUDGE2_FINALROUND_SCORE = candidate.FINALROUND_SCORE;
                    finalScore.JUDGE2_QAFINAL_SCORE = candidate.QAFINAL_SCORE;
                }

                if (score.userId === 'judge_3') {
                    finalScore.JUDGE3_PRELIMINARY_SCORE = candidate.PRELIMINARY_SCORE;
                    finalScore.JUDGE3_FINALROUND_SCORE = candidate.FINALROUND_SCORE;
                    finalScore.JUDGE3_QAFINAL_SCORE = candidate.QAFINAL_SCORE;
                }

                candidates.push(finalScore);
            }

            summary = summary.concat(candidates);
        }

        return [scores, summary];
    }
}

