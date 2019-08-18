import * as DocumentService from '../DocumentService';

import {v4 as uuid} from 'uuid';
import Logger from '../../utilities/Logger';
import Account from '../../../src/app/shared/model/account.model';
import SystemConfig from '../../utilities/SystemConfig';

const fs = require('fs');

const {uploadDirectory} = SystemConfig;

export  async function getAccountById (documentId, options?) {
  return DocumentService.findOne(Account, {documentId}, options);
}

export  async function updateAccountInfo (userId, params) {

  const editableFields = [
    'thumbnailImage', // used at dashboard
    'profileImage', // used at profile main image
    'about',
    'firstname',
    'lastname',
    'middlename',
    'birthdate',
    'gender',
    'phoneNo',
    'birthPlace',
    'occupation',
    'livesIn',
    'website',
    // app specific
    'school',
    'activeSchoolYear'
  ];

  const updates = {
    documentId: userId, // required in document update
    systemHeader: {     // required in document update
      type: 'Account'
    }
  };

  for (const editable of editableFields) {

    let value = params[editable];
    if (value != null) {
      // process values
      if (editable === 'profileImage' || editable === 'thumbnailImage') {
        value = await uploadImageFile(value);
      }
      if (editable === 'birthdate') {
        value = Date.parse(value);
      }
      updates[editable] = value;
    }
  }

  return DocumentService.updateDocument(updates, userId);

}

export async  function uploadImageFile(image) {
  const generatedId = uuid();
  const fileImageId = `${generatedId}.jpg`;
  await new Promise((resolve, reject) => {
    // remove base64
    const base64Image = image.split(';base64,').pop();
    fs.writeFile(`${uploadDirectory}${fileImageId}`, base64Image, {encoding: 'base64'}, (error) => {
      if (error) {
        Logger.error('Error at saving image file: ');
        Logger.error('CurrentDIR: ' + process.cwd());
        Logger.error(error);
        reject(new Error('Error while saving file'));
        return;
      }
      resolve();
    });
  });
  return fileImageId;
}
