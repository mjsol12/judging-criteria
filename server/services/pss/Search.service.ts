import * as DocumentService from '../DocumentService';
import {Score} from '../../../src/app/shared/model/pp/score.model';
import {InvalidRequestError, UnauthorizedError} from '../../utilities/Errors';

function calculateFinalRound(contestant) {

    // school uniform
    let sUniformScore;
    sUniformScore = contestant.FR_SU_PERSONALITY + contestant.FR_SU_POISE + contestant.FR_SU_CARRIAGE;
    contestant.SCHOOL_UNIFORM_SCORE = sUniformScore;
    // Sports Wear
    let sportWScore;
    sportWScore = contestant.FR_SW_POISE + contestant.FR_SW_CARRIAGE + contestant.FR_SW_FIGURE + contestant.FR_SW_SPORTS_IDENTITY;
    contestant.SPORTS_WEAR_SCORE = sportWScore;
    //  Creative Costume
    let cCostumeScore;
    cCostumeScore = contestant.FR_CC_CONCEPT + contestant.FR_CC_POISE + contestant.FR_CC_CARRIAGE + contestant.FR_CC_BEAUTY;
    contestant.CREATIVE_COSTUME_SCORE = cCostumeScore;

    // final round score
    const apFinalScore = sUniformScore + sportWScore + cCostumeScore;
    contestant.FINAL_ROUND_SCORE = apFinalScore / 3;

    // q and a final
    contestant.QA_SCORE = contestant.QA_INTELLIGENCE + contestant.QA_BEAUTY ;

    return contestant;
}

function groupBy(arr, property) {
    return arr.reduce((memo, x) => {
        if (!memo[x[property]]) { memo[x[property]] = []; }
        memo[x[property]].push(x);
        return memo;
    }, {});
}
function judgeScoringAverage(totalScores, propertyName) {
    let numberOfJudges = 5;

    let countNegativeJudges = 0;

    const judge1 = totalScores[`JUDGE1_${propertyName}`];
    if (judge1 <= 0 ) {
        countNegativeJudges++;
    }
    const judge2 = totalScores[`JUDGE2_${propertyName}`];
    if (judge2 <= 0 ) {
        countNegativeJudges++;
    }
    const judge3 = totalScores[`JUDGE3_${propertyName}`];
    if (judge3 <= 0 ) {
        countNegativeJudges++;
    }
    const judge4 = totalScores[`JUDGE4_${propertyName}`];
    if (judge4 <= 0 ) {
        countNegativeJudges++;
    }
    const judge5 = totalScores[`JUDGE5_${propertyName}`];
    if (judge5 <= 0 ) {
        countNegativeJudges++;
    }

    numberOfJudges = numberOfJudges - countNegativeJudges;

    const addedSUScores = judge1 + judge2 + judge3 + judge4 + judge5;

    return  addedSUScores / numberOfJudges;
}
// male or female
function judgesTotalScores(categories) {
    // find female ranks and scores.
    for (const category of categories) {
        // awards
        // school uniform score
        category.SCHOOL_UNIFORM_SCORE = judgeScoringAverage(category, 'SCHOOL_UNIFORM_SCORE');
        // school sports score
        category.SPORTS_WEAR_SCORE = judgeScoringAverage(category, 'SPORTS_WEAR_SCORE');
        // school costume score
        category.CREATIVE_COSTUME_SCORE = judgeScoringAverage(category, 'CREATIVE_COSTUME_SCORE');
        // final round score
        category.FINAL_ROUND_SCORE = judgeScoringAverage(category, 'FINAL_ROUND_SCORE');
        // question and answer score
        category.QA_SCORE = judgeScoringAverage(category, 'QA_SCORE');
    }

    return categories;
}

function rankScore(categories, rankPropertyName, scorePropertyName) {

    const propertyRank = rankPropertyName;
    const propertyScore = scorePropertyName;

    const ranking = categories.sort(( a, b ) => {
        if (a[propertyScore] < b[propertyScore]) {
            return 1;
        }
        if (a[propertyScore] > b[propertyScore]) {
            return -1;
        }
        return 0;
    });
    for (const category of categories) {
        category[propertyRank] = ranking.indexOf(category) + 1;
    }

    return categories;
}

function rankingCategory(categories) {

    const catogory = judgesTotalScores(categories);
    const doneSUtoSW = rankScore(catogory, 'SCHOOL_UNIFORM_RANK', 'SCHOOL_UNIFORM_SCORE');
    const dontSWtoCC = rankScore(doneSUtoSW, 'SPORTS_WEAR_RANK', 'SPORTS_WEAR_SCORE');
    const doneCCtoFR = rankScore(dontSWtoCC, 'CREATIVE_COSTUME_RANK', 'CREATIVE_COSTUME_SCORE');
    const finalRank = rankScore(doneCCtoFR, 'FINAL_ROUND_RANK', 'FINAL_ROUND_SCORE');

    let doneAll = rankScore(finalRank, 'QA_RANK', 'QA_SCORE');
    doneAll = doneAll.sort((a, b) => {
        return a.CANDIDATE_NUMBER - b.CANDIDATE_NUMBER;
    });

    return doneAll;
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
                finalScore.CATEGORY = candidate.CATEGORY;
                finalScore.CANDIDATE_NUMBER = candidate.CANDIDATE_NUMBER;
                finalScore.CONTESTANT = `${candidate.CANDIDATE_NUMBER}(${candidate.CATEGORY})`;

                const affix = `JUDGE${score.judgeNumber}`;

                finalScore[`${affix}_FINAL_ROUND_SCORE`] = candidate.FINAL_ROUND_SCORE ? candidate.FINAL_ROUND_SCORE : 0;
                finalScore[`${affix}_SCHOOL_UNIFORM_SCORE`] = candidate.SCHOOL_UNIFORM_SCORE ? candidate.SCHOOL_UNIFORM_SCORE : 0;
                finalScore[`${affix}_SPORTS_WEAR_SCORE`] = candidate.SPORTS_WEAR_SCORE ? candidate.SPORTS_WEAR_SCORE : 0;
                finalScore[`${affix}_CREATIVE_COSTUME_SCORE`] = candidate.CREATIVE_COSTUME_SCORE ? candidate.CREATIVE_COSTUME_SCORE : 0;
                finalScore[`${affix}_QA_SCORE`] = candidate.QA_SCORE ? candidate.QA_SCORE : 0;

                candidates.push(finalScore);
            }

            const partialSummary = [];

            if (summary.length > 0) {

                for (const sum of summary ) {

                    for (const cand of candidates) {

                        if (sum.CONTESTANT === cand.CONTESTANT) {
                            const preScore = {...sum, ...cand};
                            partialSummary.push(preScore);
                        }
                    }
                }
            }


            summary = summary.length > 0 ? partialSummary : summary.concat(candidates);
        }

        let obj;

        const categorical = groupBy(summary, 'CATEGORY');

        // find female ranks and scores.
        const finalMsRanks = rankingCategory(categorical.female);
        // find male ranks and scores.
        const finalMrRanks = rankingCategory(categorical.male);

        obj = {finalMsRanks, finalMrRanks};

        return obj;
    }

    export async function summarySave(clientSummaries, userId) {
        if ( userId !== 'admin') {
            throw new UnauthorizedError('Identification not allowed');
        }

        const judges = await DocumentService.find(Score, {});
        const summaries = clientSummaries.finalMsRanks.concat(clientSummaries.finalMrRanks);

        const promises = [];
        for (const judge of judges) {
            const contestants = [];
            for (const contestant of judge.contestants) {

                for (const dumSummary of summaries) {
                    if (dumSummary.CANDIDATE_NUMBER === contestant.CANDIDATE_NUMBER  && dumSummary.CATEGORY === contestant.CATEGORY) {
                        contestant.FINAL_ROUND_RANK = dumSummary.FINAL_ROUND_RANK;
                        break;
                    }
                }
                contestants.push(contestant);
            }

            const toUpdate = DocumentService.updateDocument(judge, null , userId);
            promises.push(toUpdate);

        }

        return Promise.all(promises);
    }


}

