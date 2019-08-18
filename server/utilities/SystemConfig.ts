
const DEFAULT_PORT = 7200;
const port = process.env.PORT ? process.env.PORT : DEFAULT_PORT;
const SystemConfig = {
  APP_PORT: port,
  DB_URL: 'mongodb://127.0.0.1:27017',
  DB_NAME: 'pscoreboard',
  PASS_SALT: 'Y`+{MBo4ijz&#iDWy+$ATRl|9d16Kow|*;MoH``[`5Lv+-bn~E6-+<!M{DS9KjHh',
  SECURE_SESSION_KEY: 'ppM}4=z-Md<gm?SR/8|5Ast2)Sq9XnG1,!..WV}E1k{T;.0E{RXQ$+be+v76|6W`',
  'defaultUnitsPerClaim': 100,
  'defaultClaimInterval': 86400000,
  'enableCrossOrigin': true,
  'defaultProtectedUnits': 0,
  'defaultMaxUnits': -1,
  uploadDirectory : 'uploads/'
};
export default SystemConfig;
