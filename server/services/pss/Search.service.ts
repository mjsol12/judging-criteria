import * as DocumentService from '../DocumentService';
import {Score} from '../../../src/app/shared/model/pp/score.model';
import {InvalidRequestError, UnauthorizedError} from '../../utilities/Errors';
import {Gender} from '../../../src/app/shared/model/pageant-procedure/candidate.model';

function calculatePreliminaryRound(contestant) {
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

    return contestant;
}

function calculateFinalRound(contestant) {

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
    const apFinalScore = sUniformScore + sportWScore + cCostumeScore;
    contestant.FINALROUND_SCORE = apFinalScore / 3;

    // q and a final
    let finalQAscore = 0;
    finalQAscore = contestant.FINALQA_CONCEPT + contestant.FINALQA_CONTENT + contestant.FINALQA_IMPACT;
    contestant.QAFINAL_SCORE = finalQAscore;

    return contestant;
}

function groupBy(arr, property) {
    return arr.reduce((memo, x) => {
        if (!memo[x[property]]) { memo[x[property]] = []; }
        memo[x[property]].push(x);
        return memo;
    }, {});
}

function rankingCategory(summary) {
    const categorical = groupBy(summary, 'category');
    const boys = categorical.male;
    // // rank to preliminary\z
    boys.sort((a , b) => {
        return a.PRELIMINARY_SCORE - b.PRELIMINARY_SCORE;
    }).forEach((val, index) => {
        val.preliminaryRank = index + 1;
    });


    const girls = categorical.female;
    girls.sort((a , b) => {
        return a.PRELIMINARY_SCORE - b.PRELIMINARY_SCORE;
    }).forEach((val, index) => {
        val.preliminaryRank = index + 1;
    });

    summary = [girls].concat(boys);
    summary.sort((a, b) => {
        return a.CONTESTANT - b.CONTESTANT;
    });
}
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
        for (let contestant of score.contestants) {
            // preliminary
            contestant = calculatePreliminaryRound(contestant);
            // final round;
            contestant = calculateFinalRound(contestant);
        }
        // if found candidate do return invalid already have the candidate number
        return await DocumentService.updateDocument(score, null, userId);
    }

    export async function summaryScore(userId) {
        if ( userId !== 'admin') {
            throw new UnauthorizedError('Identification not allowed');
        }
        const scores = await DocumentService.find(Score, {});

        let summary = [];

        for (const score of scores) {

            const candidates = [];

            for (const candidate of score.contestants) {
                if (candidate == null) {
                    return;
                }
                const finalScore = Object.create({});

                finalScore.CONTESTANT = candidate.CONTESTANT;
                finalScore.PRE_ATTENDANCE = candidate.PRE_ATTENDANCE;

                finalScore.category = candidate.category;

                let affix = '';

                switch (score.userId) {
                    case 'judge_1' :
                        affix = 'JUDGE1';
                        break;
                    case 'judge_2' :
                        affix = 'JUDGE2';
                        break;
                    case 'judge_3' :
                        affix = 'JUDGE3';
                        break;
                }

                finalScore[`${affix}_PRELIMINARY_SCORE`] = candidate.PRELIMINARY_SCORE;
                finalScore[`${affix}_FINALROUND_SCORE`] = candidate.FINALROUND_SCORE;
                finalScore[`${affix}_QAFINAL_SCORE`] = candidate.QAFINAL_SCORE;

                candidates.push(finalScore);
            }

            const partialSummary = [];

            if (summary.length > 0) {

                for (const sum of summary ) {

                    for (const cand of candidates) {

                        if (sum.CONTESTANT === cand.CONTESTANT) {
                            delete cand.CONTESTANT;
                            const preScore = {...sum, ...cand};
                            partialSummary.push(preScore);
                        }
                    }
                }
            }


            summary = summary.length > 0 ? partialSummary : summary.concat(candidates);
        }

        rankingCategory(summary);
        return summary;
    }

    export async function summarySaveChanges(summary, userId) {

        if ( userId !== 'admin') {
            throw new UnauthorizedError('Identification not allowed');
        }
        const judges = await DocumentService.find(Score, {});

        const promises = [];
        for (const judge of judges) {

            for (let contestant of judge.contestants) {

                for (const summ of summary) {

                    if (summ.CONTESTANT === contestant.CONTESTANT  && summ.category === contestant.category) {
                        contestant.PRE_ATTENDANCE = summ.PRE_ATTENDANCE;
                        contestant = calculatePreliminaryRound(contestant);
                    }
                }
            }
            const updated = DocumentService.updateDocument(judge, null , userId);

            promises.push(updated);
        }

        return Promise.all(promises);
    }


}

