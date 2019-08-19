import {SystemDocument} from '../system-document.model';
import {Candidate} from './candidate.model';

enum Gender {
    Male = 'male',
    Female = 'female',
}

class Criteria {
    public score?: number;
    candidate: Candidate[] = [];
    constructor(public idName?: string, public title?: string, public description?: string, public weight?: number) {
    }
}

class Procedure {
    public totalScore: number;
    criteria: Criteria[] = [];
    candidates: Candidate[] = [];
    constructor(public title?: string, public weight?: number, criteria?: [] ) {
    }
}

class ProcedureMethodTemplate {
    public preliminary: Procedure[] = [];
    public finalRound: Procedure[] = [];
    public questionAndAnswer: Procedure[] = [];

    constructor() {
        this.preliminary = ProcedureMethodTemplate.getPreliminaryProcedure();
        this.finalRound = ProcedureMethodTemplate.getFinalRound();
        this.questionAndAnswer = ProcedureMethodTemplate.getFinalQuestionAndAnswer();
    }

    // defualt procedures
    public static getPreliminaryProcedure() {
        const procedure: Procedure[] = [];

        const qa = new Procedure('Question and Answer', 50);
        qa.criteria.push(new Criteria('content', 'Content', 'Relevance', 50));
        qa.criteria.push(new Criteria('conceptualization', 'Conceptualization of Thoughts', 'Relevance', 50));
        qa.criteria.push(new Criteria('impact', 'Impact', 'Relevance', 50));
        procedure.push(qa);

        const po = new Procedure('Production Outfit', 40);
        po.criteria.push(new Criteria('poiseBearing', 'Poise and Bearing', '', 40 ));
        po.criteria.push(new Criteria('carriage', 'Carriage', '', 30 ));
        po.criteria.push(new Criteria('beauty', 'Beauty', '', 30 ));
        po.criteria.push(new Criteria('impact', 'Impact', '', 10 ));
        procedure.push(po);

        const aa = new Procedure('Attendance Activity', 10);
        procedure.push(aa);
        return procedure;
    }


    public static getFinalRound() {
        const procedure: Procedure[] = [];
        const su = new Procedure('School Uniform');
        su.criteria.push(new Criteria('personality', 'Personality', '', 50));
        su.criteria.push(new Criteria('poiseBearing', 'Poise and Bearing', '', 30));
        su.criteria.push(new Criteria('carraige', 'Carriage', '', 20));
        procedure.push(su);

        const sw = new Procedure('Sport Wear');
        su.criteria.push(new Criteria('poiseBearing', 'Poise and Bearing', '', 40));
        su.criteria.push(new Criteria('carraige', 'Carriage', '', 30));
        su.criteria.push(new Criteria('figure', 'Figure', '', 30));
        su.criteria.push(new Criteria('sportsIdentity', 'Identity', '', 10));
        procedure.push(su);

        const cc = new Procedure('Creative Costume');
        cc.criteria.push(new Criteria('concept', 'Concept', '', 40));
        cc.criteria.push(new Criteria('poiseBearing', 'Poise and Bearing', '', 25));
        cc.criteria.push(new Criteria('figure', 'Figure', '', 20));
        cc.criteria.push(new Criteria('Beauty', 'Beauty', '', 15));
        procedure.push(cc);
        return procedure;
    }

    public static getFinalQuestionAndAnswer() {
        const procedure: Procedure[] = [];
        procedure.push(new Procedure('Conceptualization of Thoughts', 50));
        procedure.push(new Procedure('Content', 30));
        procedure.push(new Procedure('Impact', 20));
        return procedure;
    }
}

export class Judge extends SystemDocument {

    public methodology: ProcedureMethodTemplate = new ProcedureMethodTemplate();
    constructor(public name?: string, public judgeNumber?: number) {
        super('Judge');
    }
}

