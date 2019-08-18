
// Http ready exceptions or errors. As much as possible avoid creating generic errors. Add more if necessary.
export class ServerError extends Error {
  public httpStatus = 500;
  public name = 'ServerError';

  constructor(msg?) {
    super(msg ? msg : 'An error occurred at server.');
  }
}

export class NotFoundError extends Error {
  public httpStatus = 404;
  public name = 'NotFoundError';

  constructor(msg?) {
    super(msg ? msg : 'Not found.');
  }
}

export class InvalidRequestError extends Error {
  public httpStatus = 400;
  public name = 'InvalidRequestError';

  constructor(msg?) {
    super(msg ? msg : 'Invalid request.');
  }
}

export class ForbiddenError extends Error {
  public httpStatus = 403;
  public name = 'ForbiddenError';

  constructor(msg?) {
    super(msg ? msg : 'Forbidden.');
  }
}

export class UnauthorizedError extends Error {
  public httpStatus = 401;
  public name = 'UnauthorizedError';

  constructor(msg?) {
    super(msg ? msg : 'Unauthorized.');
  }
}

export class NotImplementedError extends Error {
  public httpStatus = 501;
  public name = 'NotImplementedError';

  constructor(msg?) {
    super(msg ? msg : 'Not implemented.');
  }
}

export class TooManyRequestsError extends Error {
  public httpStatus = 429;
  public name = 'TooManyRequestsError';

  constructor(msg?) {
    super(msg ? msg : 'Too Many Requests.');
  }
}
