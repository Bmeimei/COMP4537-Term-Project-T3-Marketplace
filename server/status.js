// HTTP Status

// Fine
export const OK = 200;

// Miss Params
export const BAD_REQUEST = 400;

// Wrong Credential/Password
export const INVALID_CREDENTIAL = 401;

// Access resources with required auth without token
export const FORBIDDEN = 403;

// Item/User not in records
export const NOT_FOUND = 404;

// User/Admin already exist
export const ALREADY_EXIST = 403;

// Method Not Allowed (Not GET or POST method)
export const METHOD_NOT_ALLOWED = 405;

// Server has the problems
export const INTERNAL_SERVER_ERROR = 500;
