import {SystemDocument} from './system-document.model';

export default class Account extends SystemDocument {
  public fullname: string;
  constructor(public username?: string, public lastname?: string, public firstname?: string) {
    super('Account');
  }

}
