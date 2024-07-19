module.exports = {
    SUCCESS: {
      OK: {
        code: 200,
        message: 'OK'
      },
      CREATED: {
        code: 201,
        message: 'Created'
      },
      ACCEPTED: {
        code: 202,
        message: 'Accepted'
      }
    },
    CLIENT_ERROR: {
      BAD_REQUEST: {
        code: 400,
        message: 'Bad Request'
      },
      UNAUTHORIZED: {
        code: 401,
        message: 'Unauthorized'
      },
      FORBIDDEN: {
        code: 403,
        message: 'Forbidden'
      },
      NOT_FOUND: {
        code: 404,
        message: 'Not Found'
      },
      CONFLICT: {
        code: 409,
        message: 'Conflict'
      }
    },
    SERVER_ERROR: {
      INTERNAL_SERVER_ERROR: {
        code: 500,
        message: 'Internal Server Error'
      },
      NOT_IMPLEMENTED: {
        code: 501,
        message: 'Not Implemented'
      },
      BAD_GATEWAY: {
        code: 502,
        message: 'Bad Gateway'
      },
      SERVICE_UNAVAILABLE: {
        code: 503,
        message: 'Service Unavailable'
      }
    }
  };
  