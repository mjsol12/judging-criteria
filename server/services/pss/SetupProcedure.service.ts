import * as DocumentService from '../DocumentService';
import {Procedure} from '../../../src/app/shared/model/pageant-procedure/procedure.model';

export module SetupProcedureService {

    export async function allProcedures() {
        // get all pageant candidates
        return await DocumentService.find(Procedure, {});
    }

    export async function saveProcedure(procedure: Procedure, userId) {
        const foundProcedure = await DocumentService.findOne(procedure, {});
        if (!foundProcedure || foundProcedure.length < 0) {
            return await DocumentService.insertDocuments(procedure, null, userId);
        }
        return await DocumentService.updateDocument(procedure, '12345-35234-234234');
    }

}