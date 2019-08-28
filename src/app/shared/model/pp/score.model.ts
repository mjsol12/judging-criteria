import {SystemDocument} from '../system-document.model';

export enum GENDER {
    Male = 'male',
    Female = 'female',
}
export class Contestant {

    // final round
    public FINAL_ROUND_RANK?: number;
    public FINAL_ROUND_SCORE?: number;

    // best in school uniform
    public SCHOOL_UNIFORM_RANK?: number;
    public SCHOOL_UNIFORM_SCORE: number;
    // best in spots wear
    public SPORTS_WEAR_RANK: number;
    public SPORTS_WEAR_SCORE: number;
    // best in costume
    public CREATIVE_COSTUME_RANK?: number;
    public CREATIVE_COSTUME_SCORE?: number;

    // q & a finale
    public QA_RANK?: number;
    public QA_SCORE?: number;

    constructor(
        public CATEGORY?: GENDER,
        public CANDIDATE_NUMBER?: number,
        public FR_SU_PERSONALITY?: number,
        public FR_SU_POISE?: number,
        public FR_SU_CARRIAGE?: number,
        public FR_SW_POISE?: number,
        public FR_SW_CARRIAGE?: number,
        public FR_SW_FIGURE?: number,
        public FR_SW_SPORTS_IDENTITY?: number,
        public FR_CC_CONCEPT?: number,
        public FR_CC_POISE?: number,
        public FR_CC_CARRIAGE?: number,
        public FR_CC_BEAUTY?: number,
        public QA_CONCEPT?: number,
        public QA_CONTENT?: number,
        public QA_IMPACT?: number,
        public QA_INTELLIGENCE?: number,
        public QA_BEAUTY?: number,
        ) {
    }
}

export class Score extends SystemDocument {

    public contestants: Contestant[] = [];

    constructor(public userId: string, public judgeNumber: number) {
        super('Score');
    }
}

