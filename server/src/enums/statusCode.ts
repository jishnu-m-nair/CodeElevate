const StatusCode = {
  OK: 200,
  Created: 201,
  Accepted: 202,
  NoChange: 301,
  TaskFailed: 304,
  BadRequest: 400,
  Unauthorized: 401,
  Forbidden: 403,
  NotFound: 404,
  Conflict: 409,
  Expired: 410,
  InternalServerError: 500,
  ServiceUnavailable: 503,
} as const;

export default StatusCode;
