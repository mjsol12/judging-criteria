import {SystemDocument} from './system-document.model';

export default class Account extends SystemDocument {

  public username?: string;

  public gender?: string;

  public fullname: string;

  constructor(public email?: string, public lastname?: string, public firstname?: string) {
    super('Account');
  }

}
