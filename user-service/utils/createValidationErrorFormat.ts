interface ConvertedErrors {
  message: string;
  errors: { [key: string]: string[] };
}

function createValidationErrorFormat(errors: { path: string; msg: string }[]) {
  const result: ConvertedErrors = {
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

export default createValidationErrorFormat;
