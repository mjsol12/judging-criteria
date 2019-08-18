import Logger from '../utilities/Logger';

// Standard function for running controllers with trycatch.
export function executeController(controllerFunction) {
  return async (req, res) => {
    try {
      await controllerFunction(req, res);
    } catch (e) {
      // Server error 500. You should always use the appropriate Error class in exceptions
      // at Errors.js. Error classes at Errors.js are made globalAny above.
      const status = e.httpStatus ? e.httpStatus : 500;
      res.status(status).send(e.message);
      if (status === 500) {
        Logger.error(e);
      }
    }
  };
}

export function parseStringRequestVar(variable) {
  variable = variable && (variable === 'null' || variable === 'undefined') ? null : variable;
  return variable;
}


