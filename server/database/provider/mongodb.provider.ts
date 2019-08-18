import SystemConfig from '../../utilities/SystemConfig';

const { MongoClient } = require('mongodb');

export default class DataService {

  public static fullURL = SystemConfig.DB_URL + '/' + SystemConfig.DB_NAME;
  private static client;

  public static getClient = async () => {

    if (DataService.client == null) {
      DataService.client = await MongoClient.connect(SystemConfig.DB_URL, {
        useNewUrlParser: true
        // replicaSet: 'rs1'
      });
    }

    return DataService.client;

  };

  public static getDatabase = async (name?) => {
    // default db
    name = (name == null) ? SystemConfig.DB_NAME : name;
    return (await DataService.getClient()).db(name);
  };

  public static getCollection = async function (name) {
    return (await DataService.getDatabase()).collection(name);
  };

  public static executeInTransaction = async function (operationFn) {
    let result = null;
    const client = await DataService.getClient();
    await client.withSession(async (session) => {

      const MAX_RETRY = 32;
      for (let i = 0; i < MAX_RETRY; ++i) {
        try {
          session.startTransaction({
            readConcern: {level: 'snapshot'},
            writeConcern: {w: 'majority'},
            readPreference: 'primary'
          });
          result = await operationFn(session);
          await session.commitTransaction();
          break;
        } catch (err) {
          await session.abortTransaction();
          if (err.errorLabels != null && err.errorLabels.includes('TransientTransactionError') && i < MAX_RETRY) {
            console.log('Retry...');
            await new Promise(resolve => setTimeout(resolve, 100));
            continue;
          }
          throw err;
        }
      }

    });
    return result;
  };

};








