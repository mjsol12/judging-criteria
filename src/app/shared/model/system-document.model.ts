import {v4 as uuid} from 'uuid';

export interface ArchiveInfo {
  archivedBy: string;
  archivedOn: number;
}

export interface DeleteInfo {
  deletedOn: number;
  deletedBy: string;
}

export interface NamedObject {
  name: string;
}

export class SystemHeader {
  createdOn?: number = Date.now();
  createdBy?: string;
  // update
  updatedOn?: number;
  updatedBy?: string;
  // versions
  previousVersion?: string;
  versionId? = uuid();
  currentVersion? = true;
  // archive
  archiveInfo?: ArchiveInfo;
  // delete
  deleted?: boolean;
  deleteInfo?: DeleteInfo;

  // for account verification
  accountVerified?: boolean;
  temporaryAccount?: boolean;

  type: string | NamedObject;

  constructor(type: any) { // can be name or class
    if (type.name) {
      this.type = type.name;
    } else {
      this.type = type;
    }
  }
}

export class SystemDocument {

  public _id?: string;
  public documentId: string = uuid();
  public systemHeader: SystemHeader;

  public static update(original, updates, updaterId) {
    const now = Date.now();
    // never allow these to be updated
    delete updates.documentId;
    delete updates.systemHeader;
    // create the expired version by setting currentVersion = false; this will be inserted as an older version
    const expired = Object.assign({}, original);
    // remove _id so it will not conflict with an existing record on insert
    if (expired._id) {
      delete expired.id;
    }
    // archive this version
    expired.systemHeader.currentVersion = false;
    expired.systemHeader.archiveInfo = {
      archivedBy: updaterId,
      archivedOn: now
    };
    if (!updates.$set) {
      updates.$set = {};
    }
    // new version updates
    updates.$set['systemHeader.previousVersion'] = expired.systemHeader.versionId;
    updates.$set['systemHeader.versionId'] = uuid();
    updates.$set['systemHeader.updatedOn'] = now;
    updates.$set['systemHeader.updatedBy'] = updaterId;
    return {expired, updateInfo: updates};
  }

  public static expireDocument(original, now, updaterId) {
    // create the expired version by setting currentVersion = false; this will be inserted as an older version
    const expired = Object.assign({}, original);
    // remove _id so it will not conflict with an existing record on insert
    if (expired._id) {
      delete expired._id;
    }
    // archive this version
    expired.systemHeader.currentVersion = false;
    expired.systemHeader.archiveInfo = {
      archivedBy: updaterId,
      archivedOn: now
    };
    return expired;
  }

  public static getDeleteUpdateInfo(deleterId) {
    const now = Date.now();
    const deleteUpdates = {};
    deleteUpdates['systemHeader.deleteInfo'] = {
      deletedBy : deleterId,
      deletedOn : now
    };
    deleteUpdates['systemHeader.deleted'] = true;
    return {$set : deleteUpdates};
  }

  public static getExpiredDocAndUpdateInfo(original, updatedDocument, updaterId) {
    // do not mutate original updatedDocument
    updatedDocument = Object.assign({}, updatedDocument);
    // never allow these to be updated
    delete updatedDocument.documentId;
    delete updatedDocument.systemHeader;
    const now = Date.now();
    const expired = this.expireDocument(original, now, updaterId);
    updatedDocument['systemHeader.previousVersion'] = expired.systemHeader.versionId;
    updatedDocument['systemHeader.versionId'] = uuid();
    updatedDocument['systemHeader.updatedOn'] = now;
    updatedDocument['systemHeader.updatedBy'] = updaterId;
    const updateInfo = {$set: updatedDocument};
    return {expired, updateInfo};
  }

  constructor(type: string) {
    this.systemHeader = new SystemHeader(type);
  }

}
