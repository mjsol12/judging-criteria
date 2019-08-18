import Logger from './utilities/Logger';
import packageJson from '../package.json';

Logger.info(`Starting ${packageJson.name} (v${packageJson.version})`);

require('./server');
