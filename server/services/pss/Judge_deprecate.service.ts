import * as DocumentService from '../DocumentService';
import {Candidate} from '../../../src/app/shared/model/pageant-procedure/candidate.model';
import {Procedure} from '../../../src/app/shared/model/pageant-procedure/procedure.model';

// https://www.w3resource.com/javascript-exercises/javascript-string-exercise-11.php
export function strCamelCase(str) {
    return str.replace(/\W+(.)/g, (match, chr) => {
        return  chr.toUpperCase();
    });
}

export function lowerCaseFirstLetter(str) {
    return str.charAt(0).toLowerCase() + str.slice(1);
}

export module JudgeService_deprecate {


    export async function findProcedure() {
        // get all pageant candidates
        const candidates = await DocumentService.find(Candidate, {});
        const procedures = await DocumentService.find(Procedure, {});

        let nestedHeaders = [];
        const nestRowHeader = [];
        const columnDataTypes = [];
        const datas = [];

        // base on hansontable nested Obejct parameter
        const label = 'label';
        const colspan = 'colspan';

        // data columns for candidate, candidateNumber, documentId and gender
        const canD = 'candidate';
        const canDNumber = 'candidateNumber';
        const genD = 'gender';
        const doCId = 'documentId';

        // base in hansontable columns parameter
        const columnData = 'data';
        const columnEditor = 'type';

        const defualtColumn = [
            {data: 'candidateNumber', readOnly: true}
        ];

        nestRowHeader.push('Candidate');

        defualtColumn.forEach( def => {
            columnDataTypes.push(def);
        });
        // default 2 empty string for the header of candidate and gender
        const columns = [];
        columns[0] =  '';

        for (const candidate of candidates) {
            const dataColumn = {};
            dataColumn[canD]  = candidate.fullname;
            dataColumn[canDNumber] = candidate.candidateNumber;
            dataColumn[genD] = candidate.gender;
            dataColumn[doCId] = candidate.documentId;


            for (const procedure of procedures) {
                if (procedure.criteria && procedure.criteria.length > 0 ) {

                    const column = {};
                    column[label] = procedure.weight ? `${procedure.name} - ${procedure.weight}` : procedure.name;
                    column[colspan] = procedure.criteria.length;

                    for (const criteria of procedure.criteria) {
                        // helper for strings to remove spance and to camelCase
                        const camelize = lowerCaseFirstLetter(strCamelCase(criteria.shortName));

                        // get shortname and make it as key with value = 0;
                        dataColumn[camelize] = criteria.score;

                        // get dataType schema
                        const columnType = {};
                        columnType[columnData] = camelize;
                        columnType[columnEditor] = 'numeric';
                        columnDataTypes.push(columnType);

                        // get criteria header
                        const criteriaHeaderName = `${criteria.shortName}<br>${criteria.description} - ${criteria.weight}`;
                        nestRowHeader.push(criteriaHeaderName);
                    }

                    columns.push(column);
                }

                nestedHeaders.push(columns);
                datas.push(dataColumn);
            }
        }
        if (nestRowHeader.length > 0) {
            nestedHeaders.push(nestRowHeader);

        }
        return { nestedHeaders, columnDataTypes, datas};
    }

}


export async function saveCandidateData(candidate: Candidate, userId): Promise<any> {
    // if found candidate do return invalid already have the candidate number
    return await DocumentService.insertDocuments(candidate, null, '1231230-123=1231230123Fcker');
}


