import {SystemDocument} from './system-document.model';
import {v4 as uuid} from 'uuid';

export default class AccountSecurity extends SystemDocument {
  public accountVerified?= true;
  public temporaryPassword?: string;
  constructor(public accountId?: string, public authKey?: string) {
    super('AccountSecurity');
    this.documentId = accountId;
  }
}
