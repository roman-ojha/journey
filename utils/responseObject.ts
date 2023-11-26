interface ValidationError {
  // 422
  message: string;
  errors: { [key: string]: string[] };
}

interface FailResponse {
  // 401, 404, 500
  message: string;
}
interface SuccessResponse {
  // 200, 201
  message: string;
  data: {};
}

function createValidationErrorFromExpressValidator(
  errors: { path: string; msg: string }[]
) {
  const result: ValidationError = {
    message: "The given data was invalid",
    errors: {},
  };
  errors.forEach((error) => {
    const { path, msg } = error;

    if (!result.errors[path]) {
      result.errors[path] = [];
    }

    result.errors[path].push(msg);
  });
  return result;
}

function validationErrorResponse(
  errors: { [key: string]: string[] },
  message = "The given data was invalid"
) {
  return {
    message,
    errors,
  };
}

function successResponse(message: string, data: {}) {
  return <SuccessResponse>{
    message,
    data,
  };
}

function failResponse(
  message: string = "Internal server error, please try again later"
) {
  return <FailResponse>{
    message,
  };
}

export {
  createValidationErrorFromExpressValidator,
  ValidationError,
  validationErrorResponse,
  failResponse,
  successResponse,
};
