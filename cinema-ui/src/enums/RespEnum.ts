export enum HttpStatus {
  /**
   * Successful operation
   */
  SUCCESS = 200,
  /**
   * Object created successfully
   */
  CREATED = 201,
  /**
   * request has been accepted
   */
  ACCEPTED = 202,
  /**
   * The operation was executed successfully, but no data was returned
   */
  NO_CONTENT = 204,
  /**
   * resource has been removed
   */
  MOVED_PERM = 301,
  /**
   * redirect
   */
  SEE_OTHER = 303,
  /**
   * resource has not been modified
   */
  NOT_MODIFIED = 304,
  /**
   * Argument list error (missing, format mismatch)
   */
  PARAM_ERROR = 400,
  /**
   * unauthorized
   */
  UNAUTHORIZED = 401,
  /**
   * Access restricted, authorization expired
   */
  FORBIDDEN = 403,
  /**
   * resource, service not found
   */
  NOT_FOUND = 404,
  /**
   * http method not allowed
   */
  BAD_METHOD = 405,
  /**
   * Resource conflict, or resource is locked
   */
  CONFLICT = 409,
  /**
   * Unsupported data, media type
   */
  UNSUPPORTED_TYPE = 415,
  /**
   * Internal System Error
   */
  SERVER_ERROR = 500,
  /**
   * interface not implemented
   */
  NOT_IMPLEMENTED = 501,
  /**
   * Service is unavailable, overloaded or under maintenance
   */
  BAD_GATEWAY = 502,
  /**
   * gateway timeout
   */
  GATEWAY_TIMEOUT = 504,
  /**
   * unknown mistake
   */
  UNKNOWN_ERROR = 520,
  /**
   * service unknown error
   */
  SERVICE_ERROR = 521,
  /**
   * database unknown error
   */
  DATABASE_ERROR = 522,
  /**
   * system warning message
   */
  WARN = 601
}
