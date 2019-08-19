import {SystemDocument} from '../system-document.model';

export enum GENDER {
    Male = 'male',
    Female = 'female',
}
export class Contestant {
    // preliminary round
    public preliminaryRank?: number;
    public PRELIMINARY_SCORE?: number;

    // final round
    public finalRoundRank?: number;
    public FINALROUND_SCORE?: number;

    // best in school uniform
    public schoolUniformRank?: number;
    public SCHOOLUNIFORM_SCORE: number;
    // best in spots wear
    public sportsWearRank?: number;
    public SPORTSWARE_SCORE: number;
    // best in costume
    public creativeCostumeRank?: number;
    public CREATIVECOSTUME_SCORE?: number;

    // q & a finale
    public questAnsFinalRank?: number;
    public QAFINAL_SCORE?: number;

    public CONTESTANT?: string;
    constructor(
        public category?: GENDER,
        public candidateNumber?: number,
        public PRE_QA_CONTENT?: number,
        public PRE_QA_CONCEPT?: number,
        public PRE_QA_IMPACT?: number,
        public PRE_PO_POISE?: number,
        public PRE_PO_CARRIAGE?: number,
        public PRE_PO_BEAUTY?: number,
        public PRE_PO_IMPACT?: number,
        public PRE_ATTENDANCE?: number,
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
        public FINALQA_CONCEPT?: number,
        public FINALQA_CONTENT?: number,
        public FINALQA_IMPACT?: number,
        ) {
        this.CONTESTANT = `${candidateNumber} (${category})`;
    }
}

export class Score extends SystemDocument {

    public contestants: Contestant[] = [];

    constructor(public userId: string, public judgeNumber: number) {
        super('Score');
    }
}

