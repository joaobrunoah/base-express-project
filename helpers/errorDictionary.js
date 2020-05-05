class ApiError extends Error {
  constructor(statusCode, message) {
    super();
    this.statusCode = statusCode;
    this.message = message;
  }
}

module.exports = {
  BODY_MISSING: new ApiError(400, 'Body is missing in the request'),
  CANT_CHANGE_PASS: new ApiError(400, 'Not possible to change user password. Use /users/:id_user/change-password'),
  DUP_KEY: new ApiError(409, 'Entity exists already'),
  EMPTY_ID: new ApiError(400, 'Id is required'),
  EXPIRED_TOKEN: new ApiError(401, 'Token has expired'),
  FORBIDDEN: new ApiError(403, 'Requesting a forbidden entity'),
  ID_NAN: new ApiError(400, 'Id must be a number'),
  INCOMPLETE_CREDENTIALS: new ApiError(400, 'Both user_email and user_password are required'),
  INCORRECT_CREDENTIALS: new ApiError(401, 'Credentials are incorrect'),
  INCORRECT_PARAMETERS: new ApiError(400, 'Incorrect value for parameters'),
  INVALID_EMAIL: new ApiError(400, 'E-mail is not valid'),
  INVALID_PASSWORD: new ApiError(400, 'Password is not valid'),
  INVALID_TOKEN: new ApiError(401, 'Token is not valid'),
  LOST_DB: new ApiError(503, 'Lost connection to database'),
  NEGATIVE_ASKING_PRICE: new ApiError(400, 'transfer_asking_price can\'t be negative'),
  NO_AUTH_TOKEN: new ApiError(401, 'Authorization Token is required'),
  NO_CASH: new ApiError(400, 'Not enough cash to complete transaction'),
  NOT_FOUND: new ApiError(404, 'Entity not found'),
  ONLY_ADMIN_CHANGE: new ApiError(403, 'Only admin can change these parameters'),
  PLAYER_NOT_LISTED: new ApiError(403, 'Player is not listed in the market'),
  REQUIRED_MISSING: new ApiError(400, 'Required parameters are missing'),
  UNIMPLEMENTED: new ApiError(501, 'This API is under construction'),
  UNKNOWN: new ApiError(500, 'Unknown error'),
  USER_DOES_NOT_EXIST: new ApiError(400, 'User does not exist'),
};