import {v4 as uuid} from 'uuid';
import {NamedObject, SystemDocument} from '../../src/app/shared/model/system-document.model';
import DataService from '../database/provider/mongodb.provider';
import {InvalidRequestError, NotFoundError} from '../utilities/Errors';
import _ from 'lodash';

// inserts or updates the document - note that documentId and systemHeader.type must be present for this to work
export async function deleteDocument(systemType, documentId: string, deleterId: string) {
  // clone document so the argument is not modified
  if (typeof systemType !== 'string') {
    systemType = systemType.name;
  }
  if (documentId == null || systemType == null) {
    throw new Error('Invalid document to update.');
  }
  // make sure the user do not update systemHeader
  const findCurrentQuery = _standardizeQuery({ documentId });
  const currentDocument = await findOne(systemType, findCurrentQuery);
  if (!currentDocument || currentDocument.length === 0) {
    throw new NotFoundError('Document not found.')
  }
  // if update, then do not include documentId
  const updateInfo = SystemDocument.getDeleteUpdateInfo(deleterId);
  const col = await DataService.getCollection(systemType);
  await col.updateOne(findCurrentQuery, updateInfo);
}

function _standardizeQuery(query) {
  query['systemHeader.deleted'] = {$ne: true};
  query['systemHeader.currentVersion'] = true;
  return query;
}

export interface UpdateOptions {
  verifyAccountStatusAtSystemHeader?: boolean;
  session?: any;
}

export interface UpdatableDocumentSystemHeader {
  type: string | NamedObject;
}

export interface UpdatableDocument {
  documentId: string;
  systemHeader: UpdatableDocumentSystemHeader
}

// inserts or updates the document - note that documentId and systemHeader.type must be present for this to work
export async function updateDocument(updated: UpdatableDocument, updaterId, updateOptions?: UpdateOptions) {
  // clone document so the argument is not modified
  const updatedDoc = _.cloneDeep(updated);
  const queryOptions = updateOptions && updateOptions.session ? {session: updateOptions.session} : {};
  // both of these values must not be updated
  const documentId = updatedDoc.documentId;
  let systemType = updatedDoc.systemHeader.type;
  if (typeof systemType !== 'string') {
    systemType = systemType.name;
  }
  if (documentId == null || systemType == null) {
    throw new Error('Invalid document to update.');
  }
  // make sure the user do not update systemHeader
  delete updatedDoc.systemHeader;
  const fetchCurrentDocumentQuery = _standardizeQuery({documentId});
  const currentDocument = await findOne(systemType, fetchCurrentDocumentQuery, queryOptions);
  if (!currentDocument || currentDocument.length === 0) {
    // this one is an insert
    const col = await DataService.getCollection(systemType);
    const toInsert = Object.assign(new SystemDocument(systemType), updatedDoc);
    toInsert.systemHeader.createdOn = Date.now();
    toInsert.systemHeader.createdBy = updaterId;
    toInsert.systemHeader.versionId = uuid();
    toInsert.systemHeader.currentVersion = true;
    await col.insertOne(toInsert, queryOptions);
    return;
  }
  // if update, then do not include documentId
  delete updatedDoc.documentId;
  const {expired, updateInfo} = SystemDocument.getExpiredDocAndUpdateInfo(currentDocument, updatedDoc, updaterId);
  if (updateOptions && updateOptions.verifyAccountStatusAtSystemHeader) {
    updateInfo.$set['systemHeader.accountVerified'] = true;
  }
  persistUpdates(documentId, systemType, updateInfo, expired, queryOptions);
}

async function persistUpdates(documentId, systemType, updateInfo, expiredDocument, options?) {
  const archiveCol = await DataService.getCollection(`${systemType}.archive`);
  await archiveCol.insertOne(expiredDocument, options);
  const col = await DataService.getCollection(systemType);
  await col.updateOne(_standardizeQuery({documentId}), updateInfo, options);
}

export async function insertDocuments(systemDocuments, session, userId) {

  if (!Array.isArray(systemDocuments)) { // maybe inserting only one doc
    return insertDoc(systemDocuments);
  }

  const promises = [];
  // we're assuming these are called through their respective constructors
  for (const doc of systemDocuments) {
    promises.push(insertDoc(doc));
  }

  return Promise.all(promises);

  async function insertDoc(doc) {
    // checks
    if (!doc.systemHeader || !doc.systemHeader.type) {
      throw new Error('No document type specified on insert.');
    }

    // DO NOT STANDARDIZE QUERY so it encapsulates every possible document including deleted ones.
    const lookupCurrentDocument = {documentId: doc.documentId};
    // verify if the updating document exists
    const current = await findOne(doc.systemHeader.type, lookupCurrentDocument, {session});
    if (current) {
      throw new InvalidRequestError('There is already an existing document with documentId.');
    }

    // set creator reference
    doc.systemHeader.createdBy = userId;

    const collection = await DataService.getCollection(doc.systemHeader.type);
    await collection.insertOne(doc, {session});
  }

}

// For query operations:
export async function find(systemType, filter, options?) {

  if (systemType.name) {
    systemType = systemType.name;
  }

  filter = _standardizeQuery(filter);

  // do not show mongodb _id
  if (!options) {
    options = {};
  }

  if (!options.projection) {
    options.projection = {};
  }
  options.projection['_id'] = 0;

  // we have different collections for each systemType
  const collection = await DataService.getCollection(systemType);
  const cursor = collection.find(filter, options);
  return cursor.toArray();
}

export async function findOne(systemType, filter, options?) {

  if (systemType.name) { // you can supply systemType with the class
    systemType = systemType.name;
  }

  filter = _standardizeQuery(filter);

  if (!options) {
    options = {};
  }

  if (!options.projection) {
    options.projection = {};
  }
  options.projection['_id'] = 0; // don't show _id

  const collection = await DataService.getCollection(systemType);

  return collection.findOne(filter, options);

}

export async function count(systemType, filter) {

  if (systemType.name) {
    systemType = systemType.name;
  }

  filter = _standardizeQuery(filter);
  const collection = await DataService.getCollection(systemType);
  return collection.find(filter).count();
}

